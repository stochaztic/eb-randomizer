/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/psi_teleport_table.txt';
import ebutils from './ebutils.js';
import MapEventObject from './MapEventObject.js';
import MapSpriteObject from './MapSpriteObject.js';
import TPTObject from './TPTObject.js';
import Script from './Script.js';
import ItemObject from './ItemObject.js';

class PsiTeleportObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.k; // Keysanity
    }

    static serialize() {
        return this._results.map(resultPair => {
            return {
                item: ItemObject.get(resultPair[1]).name,
                destination: ItemObject.get(resultPair[0]).name,
            }
        })
    }

    get name() {
        return ebutils.listToText(this.data.name_text);
    }

    set name(str) {
        this.data.name_text = ebutils.textToList(str, this.data.name_text.length);
    }

    mutate() {
        if(this.name.length > 0) {
            this.data.flag = 0xd9; // Pyramid entrance ready
        }
        if(this.index === 13) {
            this.name = "South Winters";
            this.data.x = 26;
            this.data.y = 595;
            this.data.flag = 0xd9;
        }
        if(this.index === 15) {
            this.name = "North Onett";
            this.data.x = 322;
            this.data.y = 54;
            this.data.flag = 0xd9;
        }
    }

    static checkLegalKeysanity() {
        if(!this._results) return false;
        const invalidPairs = [
            [0xb4, 0x01], // Franklin badge at Wad of bills
            [0x01, 0xb8], // Pencil eraser at Franklin badge
            [0xb4, 0xb8], // Pencil eraser at Wad of bills
            [0xfd, 0xb7], // Signed banana at Carrot key
            [0xfd, 0xb6], // Diamond at Carrot key
            [0xa6, 0xb6], // Diamond at King banana
            [0xb7, 0xb6], // Diamond at Signed banana
            [0xd3, 0xa4], // Shyness book at Tendakraut
        ];
        return this._results.every(resultPair => !invalidPairs.some(invalidPair => 
            invalidPair[0] === resultPair[0] && invalidPair[1] === resultPair[1] ));
    }

    static intershuffle() {
        this.classReseed("inter");
        const keyItemsIndex = [
            0x01,   // Franklin badge
            //0x69, // Jar of Fly Honey - Chest handled differently, at 0x7dacb.
            0xa4,   // Shyness book
            0xa6,   // King banana
            0xaa,   // Key to the shack
            0xaf,   // Hawk eye
            0xb0,   // Bicycle
            0xb4,   // Wad of bills
            0xb6,   // Diamond
            0xb7,   // Signed banana
            0xb8,   // Pencil eraser
            0xc0,   // Key to the tower
            0xca,   // Town map
            0xcc,   // Suporma
            0xd3,   // Tendakraut
            0xfd,   // Carrot key
        ];

        const sourceItems = keyItemsIndex.slice();
        const newItems = keyItemsIndex.slice();
        newItems[newItems.indexOf(0xd3)] = 0x69; // Tendakraut => Jar of Fly Honey
        newItems[newItems.indexOf(0xcc)] = 0xc1; // Suporma => Meteorite piece

        // Ensure pointers are all in Script.every cache.
        // TODO: Cache this when final key items list decided.
        MapEventObject.every.forEach(o => o.script);
        MapSpriteObject.every.forEach(o => o.script);
        Script.getByPointer(0x9d95e); // Tendakraut

        while(!this.checkLegalKeysanity()) {
            this.context.random.shuffle(newItems);
            PsiTeleportObject._results = sourceItems.map((si, i) => [si, newItems[i]]);
        }

        // Cache allSources
        PsiTeleportObject._results.forEach(result => {
            const [sourceItem, _] = result.map(index => ItemObject.get(index)); // eslint-disable-line
            sourceItem.allSources; // eslint-disable-line
        });

        PsiTeleportObject._results.forEach(result => {
            const [sourceItem, newItem] = result.map(index => ItemObject.get(index));
            sourceItem.allSources.forEach(source => {
                source.replaceItem(sourceItem, newItem);
                source.mutated = true;
            });
        });
    }

    static fullCleanup() {
        if(!this.shouldRandomize()) {
            super.fullCleanup();
            return;
        }
        // Patch Bubble Monkey rope interaction
        const bubbleMonkeyRope = Script.getByPointer(0x97f72);
        bubbleMonkeyRope.lines.splice(1, bubbleMonkeyRope.lines.length - 3);
        bubbleMonkeyRope.writeScript();

        // Patch intro script to set all teleports available immediately
        const intro = Script.getByPointer(0x5e70b);
        let patchLines = intro.lines.slice(0,2);
        patchLines.push(
            [0x04, 0xd9, 0x00], // Enable Pyramid entrance and all teleports
            [0x04, 0x8c, 0x00], // Enable Venus giving item
            [0x02, ]);
        let patch = Script.writeNewScript(patchLines);
        console.assert(patch.length === 13);
        intro.lines = intro.lines.slice(2);
        intro.lines.unshift([0x00]);
        intro.lines.unshift(ebutils.ccodeCallAddress(patch.pointer));
        intro.writeScript();

        // Patch Montague to always show up
        const montague = TPTObject.get(0x2f8);
        console.assert(montague.data.address === 0xc60349);
        montague.data.flag = 0;
        montague.data.flag_appear = 0;

        // Patch Mr Spoon to request autograph even after he's received it
        const spoon = TPTObject.get(0x38d);
        //assert spoon.data.address == 0xc826bc - could be changed in Dialog shuffle
        spoon.data.address = 0xc82468;

        // Patch Bubble Monkey to appear at north shore as soon as he runs off with his gal
        const monkey = Script.getByPointer(0x882bd);
        patchLines = monkey.lines.slice(0,2);
        patchLines.push(
            [0x04, 0x76, 0x02], // Enable Monkey at north shore
            [0x02, ]);
        patch = Script.writeNewScript(patchLines);
        console.assert(patch.length === 9);
        monkey.lines = monkey.lines.slice(2)
        monkey.lines.unshift([ebutils.ccodeCallAddress(patch.pointer)]);
        monkey.writeScript();

        // Patch Dr Andonuts to recognize Ness isn't Jeff
        const andonuts = Script.getByPointer(0x6b18d);
        patchLines = andonuts.lines.slice(0,2);
        patchLines.push( // check the normal flags first
            [0x19, 0x10, 0x01], // check character in slot 1
            [0x0b, 0x03], // is it Jeff?
            [0x1b, 0x03, ...ebutils.ccodeAddress(0x6b18d)], // go to normal andonuts text
            ebutils.ccodeGotoAddress(0x6b56e), // go to generic text for Ness
            [0x02, ]);
        patch = Script.writeNewScript(patchLines);
        const andonutsTpt = TPTObject.get(0x267);
        console.assert(andonutsTpt.data.address === 0xc6b18d);
        andonutsTpt.data.address = ebutils.fileToEbPointer(patch.pointer);

        super.fullCleanup();
    }
}

PsiTeleportObject.tableSpecs = {
    text: tableText,
    count: 16,
    pointer: 0x157880,
};

PsiTeleportObject._displayName = "psi teleport";
export default PsiTeleportObject;