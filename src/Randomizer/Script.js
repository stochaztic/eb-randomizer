/* eslint import/no-webpack-loader-syntax: off */
import instructionsText from '!array-loader!./tables/instructions.txt';
import newlinesText from '!array-loader!./tables/newlines.txt';
import BattleEntryObject from './BattleEntryObject.js';
import ItemObject from './ItemObject.js';
import ebutils from './ebutils.js';
import { utils } from 'randomtools-js';

const arrEq = (a1, a2) => a1.length===a2.length && a1.every((v,i)=> v === a2[i]);

class Script {
    constructor(pointer, endpointer = null) {
        this.context = this.constructor.context;
        this.pointer = pointer;
        this.endpointer = endpointer;
        this.subpointers = new Set();
        if(pointer) {
            if(Script.every.some(s => s.pointer === pointer)) {
                throw new Error("Duplicate script initiated.");
            }
            this.readScript();
        }
        this.constructor._allScripts.push(this);
    }

    static setContext(context) {
        this.context = context;
    }

    static get every() {
        return this._allScripts.slice();
    }

    replaceSanctuaryBoss(boss) {
        this.subscriptClosure.forEach(s => {
            if(!s.isBattleSource) return;
            const newlines = [];
            s.lines.forEach(line => {
                if(arrEq(line.slice(0, 2), [0x1f, 0x23])) {
                    newlines.push([0x1f, 0x23, boss.index & 0xFF, boss.index >>> 8]);
                }
                else {
                    newlines.push(line);
                }
            });
            s.lines = newlines;
            s.writeScript();
            delete s._enemyEncounters;
        });
        delete this._enemyEncounters;
    }

    replaceItem(oldItem, newItem) {
        this.subscriptClosure.forEach(s => {
            let needsWrite = false;
            const newlines = [];
            s.lines.forEach(line => {
                if((arrEq(line.slice(0, 2), [0x1d, 0x00]) || arrEq(line.slice(0, 2), [0x1d, 0x0e])) && line[3] === oldItem.index) {
                    needsWrite = true;
                    newlines.push([line[0], line[1], line[2], newItem.index]);
                }
                else {
                    newlines.push(line);
                }
            });
            if(needsWrite) {
                s.lines = newlines;
                s.writeScript();
            }
        });
    }

    get isBattleSource() {
        // eslint-disable-next-line
        const _ = this.hasBattleTrigger;
        return this._isBattleSource ? true : false;
    }

    get hasBattleTrigger() {
        if(this._hasBattleTrigger !== undefined) return this._hasBattleTrigger;
        this._hasBattleTrigger = false;
        if(this.lines.some(line => arrEq(line.slice(0, 2), [0x1f, 0x23]))) {
            this._hasBattleTrigger = true;
            this._isBattleSource = true;
        }
        else {
            if(this.subscriptClosure.some(s => s !== this && s.hasBattleTrigger)) {
                this._hasBattleTrigger = true;
            }
        }
        return this.hasBattleTrigger;
    }

    get isSanctuaryDoor() {
        return this.lines.some(line => arrEq(line.slice(0, 3), [0x1f, 0x66, 0x01]) &&
            line[3] >= 0x18 && line[3] <= 0x20);
    }

    get isSwapSafe() {
        // Currently, only allow scripts with a depth of 1 to be swapped.
        return this._swapSafe && this.subscripts.every(ss => ss.subscripts.length === 0 && ss._swapSafe);
    }

    get swapSafeScripts() {
        // Itself if it is swapsafe, plus its subscript if it's the End of Game Flag
        const scripts = [];
        if(!this.isSwapSafe) return scripts;
        scripts.push(this);
        if(this.lines.length > 0 && this.lines[0].length > 3 && 
           this.lines[0][0] === 0x06 && this.lines[0][1] === 0x49 && this.lines[0][2] === 0x00) {
            scripts.push(this.subscripts[0]);
        }
        return scripts;
    }

    get plainText() {
        return this.getPrettyScript().map(x => x[1]).filter(x => x[0] === '"').join("\n");
    }

    get snesAddress() {
        return ebutils.fileToEbPointer(this.pointer);
    }

    makeSanctuaryDoorAlwaysActivate() {
        console.assert(this.isSanctuaryDoor);
        console.assert(this.lines[0][0] === 0x07);
        console.assert(this.lines[1][0] === 0x1b);
        this.lines = this.lines.slice(2);
        this.lines.unshift([0x05, 0x0B, 0x00]);   // encounters on
        console.assert(this.lines[this.lines.length-1][0] === 0x02);
        const keys = [[0x1F, 0x41, 0x05],];       // remove OSS-on
        this.removeInstructions(keys, []);
        this.scheduleForWriting();
    }

    removeEncountersOff() {
        if(this._removedEncounters) return;
        const keys = [[0x04, 0x0b, 0x00],];
        this.removeInstructions(keys, []);
        this._removedEncounters = true;
    }

    removeStatusEffectsOff() {
        if(this._removedStatusEffects) return;
        const keys = [[0x1f, 0x41, 0x05],];
        this.removeInstructions(keys, []);
        this._removedStatusEffects = true;
    }

    removeExitMouseStore() {
        if(this.isSanctuaryDoor) return;
        if(this._removedExitMouse) return;
        // NOTE: This only targets 0x9B112
        const keys = [[0x1f, 0x68],];
        this.removeInstructions(keys, []);
        this._removedExitMouse = true;
    }

    removeTeleports() {
        if(this._removedTeleports) return;
        const keys = [
            [0x1f, 0x20],
            [0x1f, 0x21],
            [0x1f, 0x69],
        ];
        const exceptions = [
            // All post hotel/sleep/bench teleports. Either they normally
            // teleport you to the same map, or they have been manually
            // changed to do so in the TeleportObject cleanup.
            [0x1f, 0x21, 0x02],
            [0x1f, 0x21, 0x0b],
            [0x1f, 0x21, 0x0d],
            [0x1f, 0x21, 0x0e],
            [0x1f, 0x21, 0x11],
            [0x1f, 0x21, 0x13],
            [0x1f, 0x21, 0x27],
            [0x1f, 0x21, 0x2b],
            [0x1f, 0x21, 0x2c],
            [0x1f, 0x21, 0x2e],
            [0x1f, 0x21, 0x2f],
            [0x1f, 0x21, 0x30],
            [0x1f, 0x21, 0x31],
            [0x1f, 0x21, 0x32],
            [0x1f, 0x21, 0x33],
            [0x1f, 0x21, 0x34],
            [0x1f, 0x21, 0x35],
            [0x1f, 0x21, 0x36],
            [0x1f, 0x21, 0x37],
            [0x1f, 0x21, 0x38],
            [0x1f, 0x21, 0x39],
            [0x1f, 0x21, 0x3A],
            [0x1f, 0x21, 0x66],
            [0x1f, 0x21, 0xA2],
            [0x1f, 0x21, 0xC4],
            //# Below are Moonside same-screen teleports
            [0x1f, 0x21, 0x6A],
            [0x1f, 0x21, 0x6B],
            [0x1f, 0x21, 0x6C],
            [0x1f, 0x21, 0x6F],
            [0x1f, 0x21, 0x70],
            [0x1f, 0x21, 0x71],
            [0x1f, 0x21, 0x72],
            [0x1f, 0x21, 0xE8],
            [0x1f, 0x21, 0xE9], // Unused value - for testing
            [0x1f, 0x21, 0x9F], // Entering Dungeon Man
            [0x1f, 0x21, 0xD7], // The war against Giygas is over
        ];
        this.removeInstructions(keys, exceptions);
        this._removedTeleports = true;
    }

    removePartyChanges() {
        if(this._removedParty) return;
        const keys = [
            [0x1f, 0x11],
            [0x1f, 0x12],
        ];
        this.removeInstructions(keys, []);
        this._removedParty = true;
    }
    
    fixHotels() {
        if(this._fixedHotels) return;
        const keys = [
            [0x04, 0x7f, 0x01], // Flag that indicates you just slept.
            // Disabling the above flag stops the bug that prevents you from
            // resleeping at a hotel until you luck into flipping it back off
            [0x04, 0x02, 0x02], // Flag that indicates you just slept at home.
        ];
        this.removeInstructions(keys, []);
        this._fixedHotels = true;
    }

    removeInstructions(keys, exceptions = []) {
        this.subscriptClosure.forEach(s => {
            const newlines = [];
            s.lines.forEach(line => {
                if(keys.some(key => arrEq(key, line.slice(0,key.length))) &&
                !exceptions.some(key => arrEq(key, line.slice(0,key.length)))) {
                    return;
                }
                newlines.push(line);
            });
            if(newlines.length < s.lines.length) {
                s.lines = newlines;
                s.scheduleForWriting();
            }
        });
    }

    scheduleForWriting() {
        this.pleaseWrite = true;
    }

    fulfillScheduledWrite() {
        if(this.pleaseWrite) this.writeScript();
    }

    get subscriptClosure() {
        if(this._subscriptClosure !== undefined) return this._subscriptClosure;
        const ss = new Set([this]);
        while(true) {
            const oldLength = ss.size;
            ss.forEach(s => {
                s.subscripts.forEach(ss.add, ss);
            })
            if(ss.size === oldLength) break;
        }
        this._subscriptClosure = [...ss];
        return this.subscriptClosure;
    }

    get enemyEncounters() {
        if(this._enemyEncounters !== undefined) return this._enemyEncounters;
        const es = [];
        this.subscriptClosure.forEach(s => {
            s.lines.forEach(line => {
                if(arrEq(line.slice(0,2), [0x1f, 0x23])) {
                    const index = (line[3] << 8) | line[2];
                    es.push(BattleEntryObject.get(index));
                }
            });
        });
        this._enemyEncounters = es.sort((a,b) => a.index - b.index);
        return this.enemyEncounters;
    }

    get itemsGiven() {
        if(this._itemsGiven !== undefined) return this._itemsGiven;
        const items = [];
        this.subscriptClosure.forEach(s => {
            s.lines.forEach(line => {
                const part = line.slice(0,2);
                if(arrEq(part, [0x1d, 0x00]) || arrEq(part, [0x1d, 0x0e])) {
                    items.push(ItemObject.get(line[3]));
                }
            });
        });
        this._itemsGiven = items.sort((a,b) => a.index - b.index);
        return this.itemsGiven;
    }

    static getByPointer(pointer) {
        if(this._cachedByPointer[pointer]) {
            return this._cachedByPointer[pointer];
        }
        const found = this._allScripts.find(s => s.pointer === pointer);
        if(found) {
            this._cachedByPointer[pointer] = found;
        }
        else {
            const s = new this(pointer);
            this._cachedByPointer[pointer] = s;
        }
        return this._cachedByPointer[pointer];
    }

    get subscripts() {
        const subscripts = [];
        this.subpointers.forEach(p => {
            if((p & 0xFFC00000) !== 0xC00000) return;
            const s = Script.getByPointer(ebutils.ebToFilePointer(p));
            subscripts.push(s);
        })
        return subscripts;
    }

    get hasShopCall() {
        return this.lines.some(line => arrEq(line, [0x08, 0xb1, 0xdf, 0xc5, 0x00])) 
            || this.lines.some(line => arrEq(line, [0x08, 0x2f, 0xe0, 0xc5, 0x00]));
    }

    get shopFlags() {
        throw new Error("Unimplemented"); 
    }

    static get scriptdict() {
        if(this._scriptdict) return this._scriptdict;
        const scriptdict = {};
        instructionsText.forEach(line => {
            if(line.trim().length === 0) return;
            let [instruction, description] = line.split(":").map(s => s.trim());
            const safe = (instruction[0] === '!');
            instruction = instruction.substr(1);
            const instructionSplit = instruction.split(" ");
            let key = parseInt(instructionSplit[0], 0x10);
            if(!isNaN(parseInt(instructionSplit[1], 0x10))) {
                key = (key << 8) | parseInt(instructionSplit[1], 0x10);
            }
            console.assert(scriptdict[key] === undefined);
            if(key === 0x09 || key === ((0x1f << 8 ) | 0xc0)) {
                scriptdict[key] = {
                    instruction: instruction,
                    description: description,
                    length: null,
                    safe: safe
                }
            }
            else {
                scriptdict[key] = {
                    instruction: instruction,
                    description: description,
                    length: instructionSplit.length,
                    safe: safe
                }
            }
        });
        this._scriptdict = scriptdict;
        return this.scriptdict;
    }

    static get newlines() {
        if(this._newlines) return this._newlines;
        const newlines = [];
        let newitem = [];
        newlinesText.forEach(line => {
            line = line.trim();
            if(line.length === 0){
                if(newitem.length > 0) {
                    newlines.push(newitem);
                    newitem = [];
                }
            }
            else if(line.startsWith('"')) {
                line = line.substring(1, line.length - 1);
                newitem.push(ebutils.encodeText(line));
            }
            else {
                newitem.push(line.split(" ").map(c => parseInt(c, 0x10)));
            }
        });
        if(newitem.length > 0) newlines.push(newitem);
        this._newlines = newlines;
        return this.newlines;
    }

    readScript() {
        let pointer = this.pointer;
        this._swapSafe = true;
        this.lines = [];
        let nesting = 0;
        let currentTextLine = [];
        const scriptdict = this.constructor.scriptdict;

        while(true) {
            const startingPointer = pointer;
            let key = this.context.rom[pointer];
            pointer += 1;

            if(key > 0x20) { // Plain text
                currentTextLine.push(key);
                continue;
            }
            if(!scriptdict[key]) { // Two-character ccode
                key = (key << 8) | this.context.rom[pointer];
                pointer += 1;
            }
            if(!scriptdict[key]) { 
                throw new Error("Unknown script key.");
            }

            const info = scriptdict[key];
            if(info.description.includes("Display Compressed")) {
                currentTextLine.push(key);
                currentTextLine.push(this.context.rom[pointer]);
                pointer += 1;
                continue;
            }
            if(currentTextLine.length > 0) {
                this.lines.push(currentTextLine);
                currentTextLine = [];
            }
            if(!info.safe) {
                this._swapSafe = false;
            }
            let newlength = info.length;
            let numargs = 1;
            if(!newlength) {
                numargs = this.context.rom[pointer];
                pointer += 1;
                newlength = pointer - startingPointer + (numargs*4);
            }

            // Get full line
            const line = this.context.rom.slice(startingPointer, startingPointer + newlength);
            this.lines.push(Array.from(line)); // convert from Uint8Array to normal Array
            pointer = startingPointer + newlength;

            // Process codes with subpointers
            if(info.description.startsWith("SUBPTR")) {
                // eslint-disable-next-line
                [...Array(numargs).keys()].forEach(i => {
                    const subpointer = utils.readMulti(this.context.rom, pointer - (4 * (i + 1)), 4);
                    this.subpointers.add(subpointer);
                });
            }
            if(key === ((0x19 << 8) | 0x02)) {
                nesting += 1;
            }
            if(key === 0x02 && (!this.endpointer || pointer > this.endpointer)) {
                if(nesting === 0) {
                    break;
                }
                nesting -= 1;
            }
        }
        this.oldLength = this.length;
        // veryify
        const flat = this.lines.reduce((acc, val) => acc.concat(val), []);
        console.assert(flat.length === this.length);
        flat.forEach((byte, i) => {
            console.assert(byte === this.context.rom[this.pointer + i]);
        });
    }

    writeScript(allowNew = false) {
        if(this.length > this.oldLength) {
            if(!allowNew || this.oldLength < 5) {
                throw new Error("Attempt to write script too large for location.");
            }
            const newScript = this.constructor.writeNewScript(this.lines);
            this.lines = [ebutils.ccodeGotoAddress(newScript.snesAddress)];
            this.subpointers.add(newScript.snesAddress);
        }
        const flat = this.lines.reduce((acc, val) => acc.concat(val), []);
        this.context.rom.set(flat, this.pointer);
        this.pleaseWrite = false;
    }

    static writeNewScript(lines) {
        const newScript = new this(null);
        newScript.lines = lines;
        const newFreespace = this.requestFreeSpace(newScript.length);
        newScript.pointer = newFreespace;
        newScript.oldLength = newScript.length;
        newScript.writeScript();
        return newScript;
    }

    static requestFreeSpace(amount) {
        if(this._freespace.start + amount > this._freespace.end) {
            throw new Error("No free space for new script.");
        }
        const newSpaceIndex = this._freespace.start;
        this._freespace.start = this._freespace.start + amount;
        return newSpaceIndex;
    }

    static replace(pointer, lines) {
        const script = this.getByPointer(pointer);
        script.lines = lines;
        script.writeScript(true);
    }

    static getPrettyLineDescription(line) {
        if(line.length === 0) return;

        const prettyLine = line.map(i => ("00" + i.toString(16)).slice(-2)).join(" ");
        let description = "UNKNOWN SCRIPT KEY";
        let key = line[0];

        if(key > 0x20 || key === 0x15 || key === 0x16 || key === 0x17) { // Plain or compressed text
            description = '"' + ebutils.listToText(line) + '"';
        }
        else {
            if(!this.scriptdict[key]) { // Two-character ccode
                key = (key << 8) | line[1];
            }
            if(this.scriptdict[key]) { 
                description = this.scriptdict[key].description;
            }
        }
        return [prettyLine, description];
    }

    get prettyScript() {
        return this.getPrettyScriptFull();
    }

    get properties() {
        if(this._properties === undefined) {
            this._properties = this.prettyScript;
        }
        return this._properties;
    }

    getPrettyScript() {
        return this.lines.map(line => this.constructor.getPrettyLineDescription(line));
    }

    getPrettyScriptFull(excludePointers) {
        throw new Error("Unimplemented.");
    }

    get length() {
        return this.lines.reduce((acc, val) => acc + val.length, 0);
    }
}

Script._allScripts = [];
Script._cachedByPointer = {};
Script._freespace = {start: 0x300000, end: 0x30ffff};

Script._displayName = "script";
export default Script;