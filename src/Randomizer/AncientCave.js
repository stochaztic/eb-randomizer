/* eslint import/no-webpack-loader-syntax: off */
import problematicScriptsText from '!array-loader!./tables/problematic_scripts.txt';
import { ReadWriteObject, utils } from 'randomtools-js';
import ebutils from './ebutils.js';
import Script from './Script.js';
import Cluster from './Cluster.js';
import MapSpriteObject from './MapSpriteObject.js';
import MapEventObject from './MapEventObject.js';
import TPTObject from './TPTObject.js';
import MapMusicObject from './MapMusicObject.js';
import MusicObject from './MusicObject.js';

class AncientCave extends ReadWriteObject {
    static shouldRandomize() {
        return this.context.specs.flags.a;
    }

    static initialize(context) {
        super.initialize(context);
        Script.setContext(this.context);
    }

    static fullRandomize() {
        this.classReseed("ancient");
        this.generateCave();
        super.fullRandomize();
    }

    static fullCleanup() {
        // Always give ATM Card help text, regardless of flags
        const lines = [
            [0x01, ],
            ebutils.encodeText(`@EarthBound Ancient Cave randomizer version ${this.context.specs.version}.`),
            [0x03, 0x00],
            ebutils.encodeText(`@Seed: ${this.context.specs.seed}`),
            [0x03, 0x00],
            ebutils.encodeText(`@Flags: ${ebutils.flagString(this.context.specs.flags)}`),
            [0x13, 0x02]
        ];
        if(this.context.specs.flags.devmode) {
            const banana = Script.getByPointer(0x58ed1); // Banana option in X menu
            banana.lines = [[0x1f, 0x41, 0x0c], [0x13, 0x02]]; // Start credits
            banana.writeScript();

            // Change teleport destination in X menu
            const teleportX = 606;
            const teleportY = 666;

            const [fullX, fullY] = [teleportX * 8, teleportY * 8];
            this.context.rom.set([fullX % 256, Math.floor(fullX / 256)], 0x13049);
            this.context.rom.set([fullY % 256, Math.floor(fullY / 256)], 0x1304e);
        }
        const newAtmHelp = Script.writeNewScript(lines);
        const oldAtmHelp = Script.getByPointer(0x5566b);
        oldAtmHelp.lines = [ebutils.ccodeGotoAddress(newAtmHelp.pointer)];
        oldAtmHelp.writeScript();

        const sign = Script.getByPointer(0x86900);
        sign.lines = [
            ebutils.encodeText("@(Visit fruitfacts.tumblr.com for important fruit facts.)"),
            [0x13,0x02],
        ];
        sign.writeScript();

        if(this.context.specs.flags.u.goodsMenuEquip) {
            const failLines = [
                ebutils.encodeText("@"),
                [0x1C, 0x0D],
                ebutils.encodeText(" can't equip the "),
                [0x19, 0x1F],
                [0x1B, 0x04],
                [0x1C, 0x05, 0x00],
                ebutils.encodeText("."),
                [0x13, 0x02]
            ];
            const fail = Script.writeNewScript(failLines);
            
            const oldUse = Script.getByPointer(0x7c742);
            oldUse.lines = [
                [0x1B, 0x00],
                [0x1D, 0x11, 0x00, 0x00],
                [0x1B, 0x02, ...ebutils.ccodeAddress(fail.pointer)],
                [0x19, 0x1F],
                [0x1B, 0x04],
                ebutils.ccodeCallAddress(0x5e25b),
                [0x1B, 0x01],
                [0x04, 0xF0, 0x03],
                ebutils.ccodeGotoAddress(0x5e136)
            ];
            oldUse.writeScript();

            const loadZero = Script.writeNewScript([
                [0x05, 0xF0, 0x03],
                [0x07, 0xF0, 0x03],
                [0x02]
            ]);

            const hijackedCheck = Script.getByPointer(0x5e36e);
            const newCheckLines = [
                [0x1B, 0x04],
                [0x1B, 0x00],
                [0x07, 0xF0, 0x03],
                [0x1b, 0x03, ...ebutils.ccodeAddress(loadZero.pointer)],
                [0x1B, 0x01],
                ...hijackedCheck.lines.slice(2)
            ];
            const newCheck = Script.writeNewScript(newCheckLines);
            hijackedCheck.lines = [ebutils.ccodeGotoAddress(newCheck.pointer)];
            hijackedCheck.writeScript();
        }

        if(this.context.specs.flags.z.noHealSanctuaries) {
            Script.replace(0x7c57d, [[0x02]]);
        }

        if(this.context.specs.flags.z.ghostsAndShrooms) {
            // Hijacks dad phone routines and changes timer
            const end = Script.writeNewScript([[0x02]]);
            const possess = Script.writeNewScript([
                [0x19, 0x10, 0x01],             // get lead character number
                [0x19, 0x05, 0x00, 0x02, 0x03], // inflict possession on character
                [0x02]
            ]);
            Script.replace(0x7d33e, [
                [0x19, 0x10, 0x01],             // get lead character number
                [0x19, 0x16, 0x00, 0x02],       // get mush/possess status
                [0x0B, 0x01],                   // true if they have no status
                [0x1B, 0x02, ...ebutils.ccodeAddress(end.pointer)], // if false, end
                [0x1D, 0x21, 0x01],             // random 0 or 1
                [0x1B, 0x02, ...ebutils.ccodeAddress(possess.pointer)], // 50% goto,
                [0x19, 0x10, 0x01],             // get lead character number
                [0x19, 0x05, 0x00, 0x02, 0x02], // inflict mushroomization on character
                [0x02]
            ]);
            //C0/766C: A9 97 06     LDA #$0697 - value after call - 10 minutes
            this.context.rom[0x766D] = 0x8C;
            this.context.rom[0x766E] = 0x00;
            //C0/B6C2: A9 97 06     LDA #$0697 - value after spawn - 5 minutes
            this.context.rom[0xB6C3] = 0x46;
            this.context.rom[0xB6C4] = 0x00;
        }

        super.fullCleanup();
    }

    static generateCave() {
        this.context.hooks.message("GENERATING CAVE");
        let allClusters = new Set(Cluster.every);

        const COMPLETION = 1.0;
        const completionSample = stuff => {
            return this.context.random.sample(stuff, Math.round(stuff.length * COMPLETION));
        }

        const sBosses = ebutils.SANCTUARY_BOSS_INDEXES.map(i => MapSpriteObject.get(i));
        const checkpoints = sBosses.map(mso => mso.nearestCluster);
        this.context.random.shuffle(checkpoints);

        checkpoints.unshift(Cluster.home);
        checkpoints.push(Cluster.goal);

        checkpoints.forEach(c => allClusters.delete(c));
        allClusters = [...allClusters];

        this.context.hooks.message("Categorizing clusters...");
        let singletons = allClusters.filter(c => c.unassignedExits.length <=  1);
        let pairs      = allClusters.filter(c => c.unassignedExits.length === 2);
        let multiples  = allClusters.filter(c => c.unassignedExits.length >=  3);

        if(COMPLETION < 1.0) {
            singletons = completionSample(singletons);
            pairs = completionSample(pairs);
            multiples = completionSample(multiples);
        }

        this.classReseed("selection");

        const checkpointDict = {};
        const numSegments = checkpoints.length - 1;
        const tempCheckpoints = checkpoints.slice(1, -1);
        this.context.random.shuffle(tempCheckpoints);
        tempCheckpoints.unshift(Cluster.home);

        let candidates = pairs.concat(multiples);
        const minNumPerSegment = Math.floor(candidates.length / numSegments);
        const numPerSegment = Array(numSegments).fill(minNumPerSegment);
        while(numPerSegment.reduce((a,b)=>a+b,0) < candidates.length) {
            const index = this.context.random.randint(0, numSegments -1);
            numPerSegment[index] += 1;
        }
        console.assert(numPerSegment.reduce((a,b)=>a+b,0) === candidates.length);
        console.assert(numPerSegment.every(nps => nps > 2));

        const healthFn = c => c.unassignedExits.length - 2;
        const sum = (a,b) => a+b;
        let safe = c => !c.hasBattleTrigger;
        if(this.context.specs.flags.rlb) {
            safe = c => !c.hasBattleTrigger && !c.isRootStem && !c.isRootLeaf;
        }

        tempCheckpoints.forEach((tc, i) => {
            const num = numPerSegment[i];
            let chosens;
            for(let j = 0;;j++) {
                if(i === 0) {
                    chosens = this.context.random.sample(candidates.filter(safe), num);
                }
                else {
                    chosens = this.context.random.sample(candidates, num);
                }
                const chosenHealth = chosens.map(healthFn).reduce(sum,0);
                if(chosenHealth >= 3) {
                    // eslint-disable-next-line
                    const temp = candidates.filter(c => !chosens.includes(c));
                    const tempHealth = temp.map(healthFn).reduce(sum,0);
                    const threshold = ((numSegments-1)-i) * 3;
                    if(tempHealth >= threshold) {
                        candidates = temp;
                        break;
                    }
                }
                if(j > 1000) throw new Error("Unable to select appropriate exits.");
            }
            console.assert(!checkpointDict[tc.index]);
            checkpointDict[tc.index] = new Set(chosens);
        });

        this.classReseed("connections");

        this.context.hooks.message("Connecting clusters...");
        const NONLINEARITY = this.randomDegree || this.context.specs.randomDegree;

        checkpoints.forEach((cp1, i) => {
            const cp2 = checkpoints[i+1];
            if(!cp2) return;


            const chosens = [...checkpointDict[cp1.index]].sort((a,b) => a.index - b.index);
            let aa = cp1;
            console.assert(aa.unassignedExits.length > 0);
            if(i > 0) {
                console.assert(aa.exits.length - aa.unassignedExits.length === 1);
            }

            console.assert(chosens.some(c => c.exits.length > 2));
            let candidates;
            if(cp1 === Cluster.home || this.context.random.random() > 0.5) {
                candidates = chosens.filter(c => c.unassignedExits.length > 2);
            }
            else {
                candidates = chosens.filter(c => c.unassignedExits.length > 1);
            }
            this.context.random.shuffle(candidates).sort((a,b) => a.exits - b.exits);
            let maxIndex = candidates.length - 1;
            let index = this.context.random.randint(this.context.random.randint(0, maxIndex), maxIndex);
            let bb = candidates[index];
            console.assert(bb.unassignedExits.length > 0);
            let a = this.context.random.choice(aa.unassignedOutgoingExits);
            let b = this.context.random.choice(bb.unassignedIncomingExits);
            Cluster.assignExitPair(a, b);
            console.assert(bb.unassignedExits.length > 0);
            const done = new Set([aa, bb]);
            const toBeDone = new Set(chosens);
            toBeDone.delete(bb);
            let cp2ToBeDone = true;

            while(toBeDone.size > 0 || cp2ToBeDone) {
                if(toBeDone.size === 0) {
                    bb = cp2;
                    cp2ToBeDone = false;
                }
                else {
                    bb = this.context.random.choice([...toBeDone]);
                }
                console.assert(bb.unassignedExits.length > 0);
                candidates = [...done].filter(d => d.unassignedExits.length > 0);
                maxIndex = candidates.length - 1;
                index = this.context.random.mutateNormal(maxIndex, 0, maxIndex, NONLINEARITY, false, true);
                aa = candidates[index];

                if(candidates.length === 1 && aa.unassignedExits.length === 1 && bb.unassignedExits.length === 1) {
                    throw new Error("Ancient Cave routing error.");
                }
                a = this.context.random.choice(aa.unassignedOutgoingExits);
                b = this.context.random.choice(bb.unassignedIncomingExits);
                Cluster.assignExitPair(a, b);

                toBeDone.delete(bb);
                done.add(bb);
            }

            done.forEach(c => {
                if(c.caveLevel !== undefined) return;
                c.caveLevel = i + 1;
                c.exits.forEach(e => {
                    e.caveLevel = c.caveLevel;
                });
            });
        });

        this.classReseed("filling");

        let totalUnassignedExits = [];
        checkpoints.concat(pairs).concat(multiples).forEach(c => {
            totalUnassignedExits = totalUnassignedExits.concat(c.unassignedExits);
        });

        this.context.hooks.message("Assigning remaining exits...");
        const toAssign = singletons.filter(s => !s.optional);

        // Ensure even distribution of sanctuaries and sanctuary-alikes
        const toEvenlyAssign = this.context.random.shuffle(toAssign.filter(s => 
            ebutils.EVEN_DISTRIBUTE_DOORS.includes(s.exits[0].index)));
        console.assert(toEvenlyAssign.length === checkpoints.length - 1);
        toEvenlyAssign.forEach((s, i) => {
            console.assert(s.unassignedExits.length === 1);
            let x = s.unassignedExits[0];
            let subset = totalUnassignedExits.filter(e => e.caveLevel === i + 1);
            let chosen = this.context.random.choice(subset);
            Cluster.assignExitPair(x, chosen);
            totalUnassignedExits.splice(totalUnassignedExits.indexOf(chosen), 1);
            x.caveLevel = chosen.caveLevel;
            s.caveLevel = chosen.caveLevel;
        });

        const assign = (s, chosen) => {
            if(s.caveLevel !== undefined) return;
            console.assert(s.unassignedExits.length === 1);
            if(totalUnassignedExits.length == 0) {
                throw new Error("Seed could not complete cave. Please try a different seed.");
            }
            let x = s.unassignedExits[0];
            if(!chosen) {
                chosen = this.context.random.choice(totalUnassignedExits);
            }
            if(Array.isArray(chosen)) {
                chosen = this.context.random.choice(chosen.filter(c => totalUnassignedExits.includes(c)));
            }
            Cluster.assignExitPair(x, chosen);
            totalUnassignedExits.splice(totalUnassignedExits.indexOf(chosen), 1);
            x.caveLevel = chosen.caveLevel;
            s.caveLevel = chosen.caveLevel;
        }
        const normalAssign = s => { assign(s, null) };

        // Assign any unassigned rootStems
        let rootStemAssignPool = null;
        if(this.context.specs.flags.rlb) {
            rootStemAssignPool = totalUnassignedExits.filter(c => c.caveLevel !== 1);
        }
        toAssign.filter(c => c.isRootStem).forEach(c => assign(c, rootStemAssignPool));

        // Assign rootLeaves to be somewhat, but not very, far away from their stems
        toAssign.filter(c => c.isRootLeaf).forEach(s => {
            console.assert(s.caveLevel === undefined);
            const stemLevel = s.rootStem.caveLevel;
            const d5 = totalUnassignedExits.filter(x => x.caveLevel === (stemLevel + 5) || x.caveLevel === (stemLevel - 5));
            const d4 = totalUnassignedExits.filter(x => x.caveLevel === (stemLevel + 4) || x.caveLevel === (stemLevel - 4));
            const d3 = totalUnassignedExits.filter(x => x.caveLevel === (stemLevel + 3) || x.caveLevel === (stemLevel - 3));
            const d2 = totalUnassignedExits.filter(x => x.caveLevel === (stemLevel + 2) || x.caveLevel === (stemLevel - 2));
            let exitPool = [...d3, ...d3, ...d3, ...d2, ...d2, ...d4, ...d4, ...d5];
            
            if(this.context.specs.flags.z.shortSkips) {
                exitPool = d2;
            }
            
            if(this.context.specs.flags.rlb) {
                exitPool = exitPool.filter(x => x.caveLevel !== 1);
            }
            const chosen = this.context.random.choice(exitPool);
            assign(s, chosen);
        });

        // Create loops within caveLevels
        const caveLevelGroups = {};
        totalUnassignedExits.forEach(exit => {
            const bucket = exit.caveLevel;
            caveLevelGroups[bucket] = caveLevelGroups[bucket] || [];
            caveLevelGroups[bucket].push(exit);
        });

        Object.keys(caveLevelGroups).forEach(caveLevel => {
            const exitArray = caveLevelGroups[caveLevel];
            while(exitArray.length > 5 && this.context.random.random() < 0.6) {
                // Add a loop to this level
                const chosenLoop = this.context.random.sample(exitArray, 2);
                exitArray.splice(exitArray.indexOf(chosenLoop[0]), 1);
                exitArray.splice(exitArray.indexOf(chosenLoop[1]), 1);
                Cluster.assignExitPair(chosenLoop[0], chosenLoop[1]);
                totalUnassignedExits.splice(totalUnassignedExits.indexOf(chosenLoop[0]), 1);
                totalUnassignedExits.splice(totalUnassignedExits.indexOf(chosenLoop[1]), 1);
            }
        });

        // Assign remainder of required singletons
        toAssign.forEach(normalAssign);
        
        // Assign optional singletons until no unassigned exits remain
        const remainingSingletons = singletons.filter(s => s.optional);
        const optionalAssign = this.context.random.sample(remainingSingletons, totalUnassignedExits.length);
        Array.prototype.push.apply(toAssign, optionalAssign);
        optionalAssign.forEach(normalAssign);

        console.assert(totalUnassignedExits.length === 0);
        Cluster.rankClusters(this.context);

        // do AFTER ranking clusters
        this.classReseed("bosses");
        const bossList = this.replaceSanctuaryBosses();

        Cluster.rankedClusters.forEach(clu => {
            clu.exits.forEach(a => {
                const b = Cluster.assignDict[a.index];
                a.connectExit(b);
            });
        });

        singletons.forEach(s => {
            if(!toAssign.includes(s)) {
                s.exits.forEach(x => {
                    console.assert(!x.connected);
                });
            }
        });

        // Sanitize cave events before custom events for doors are created
        this.sanitizeCaveEvents();
        this.context.hooks.message("Finalizing cave...");

        // If rlb flag set, confirm no rootStems or rootLeaves on floor 1
        if(this.context.specs.flags.rlb) {
            Cluster.rankedClusters.filter(clu => clu.caveLevel === 1).forEach(clu => {
                if(clu.isRootLeaf || clu.isRootStem) {
                    throw new Error(`Cluster ${clu.index} firstCell 0x${clu.firstCell.toString(0x10)} on floor 1 is elevator`);
                }
            });
        }

        // Set custom events for every exit, setting floor flags and then calling original event
        const badDoorScripts = [0xc9ae01];
        MapEventObject.every.forEach(me => {
            if(me.isExit && me.connected) {
                if(me.newEvent.isScriptModified) {
                    return;
                }

                const flagChanges = [...Array(9).keys()].map(caveLevelZeroIndex => {
                    if(caveLevelZeroIndex + 1 === me.connected.caveLevel) { // Change to floor on cluster of destination, not self
                        return [0x04, MapMusicObject.flagBase + caveLevelZeroIndex, 0x03];
                    }
                    return [0x05, MapMusicObject.flagBase + caveLevelZeroIndex, 0x03];
                });

                var newLines = undefined;
                if(badDoorScripts.includes(me.newEvent.data.event_call)) {
                    me.newEvent.data.event_call = 0;
                }
                const script = me.newEvent.script;
                if(script) {
                    script.removeVolumeChanges();
                    newLines = [
                        ...flagChanges,
                        ...script.lines,
                    ];
                }
                else {
                    newLines = [
                        ...flagChanges,
                        [0x02],
                    ];
                }
                const newScript = Script.writeNewScript(newLines);
                me.newEvent.data.event_call = newScript.snesAddress;
                me.newEvent.isScriptModified = true;
                if(script) {
                    me.newEvent.modifiedScript = newScript;
                    script.modifiedScript = newScript;
                    script.subpointers.add(newScript.snesAddress);
                }
            }
        });

        // Connect every unconnected door to itself and disable
        MapEventObject.every.forEach(me => {
            if(me.isExit && !me.connected) {
                me.connectExit(me);
            }
        });

        if(this.context.specs.flags.giygastest) {
            const homex = Cluster.home.exits[0];
            const goalx = Cluster.goal.exits[0];
            homex.connectExit(goalx, true);
            goalx.connectExit(homex, true);
        }

        const startX = 0x1fe9e;
        const startY = 0x1fe9b;
        utils.writeMulti(this.context.rom, startX, 0x1f80, 2);
        utils.writeMulti(this.context.rom, startY, 0x0450, 2);

        const recruitLines = [];
        if(!this.context.specs.flags.z.noPoo) recruitLines.push([0x1F, 0x11, 0x04]);
        if(!this.context.specs.flags.z.noJeff) recruitLines.push([0x1F, 0x11, 0x03]);
        if(!this.context.specs.flags.z.noPaula) recruitLines.push([0x1F, 0x11, 0x02]);
        if(this.context.specs.flags.z.noNess) recruitLines.push([0x1F, 0x12, 0x01]);
        if(this.context.specs.flags.z.yesBubble) recruitLines.push([0x1F, 0x11, 0x09]);

        const intro = Script.getByPointer(0x5e70b);
        intro.lines = [
            [0x04, 0x58, 0x00],     // enable Winters phones
            [0x04, 0x62, 0x00],     // enable home phone
            [0x04, 0x68, 0x00],     // normal music in onett
            [0x04, 0xC7, 0x00],     // know dad's phone number
            [0x04, 0xC8, 0x00],     // know mom's phone number
            [0x04, 0xC9, 0x00],     // know escargo express phone number
            [0x04, 0xA6, 0x01],     // daytime in onett
            [0x04, 0x05, 0x02],     // turn on lights at home
            [0x04, 0x5E, 0x00],     // Mom heal part 2
            [0x04, 0xAE, 0x00],     // hole dug in dusty dunes
            [0x04, 0x64, 0x02],     // everdred not on roof
            [0x05, 0x0B, 0x00],     // "enemies won't appear" flag (off)
            ...recruitLines,
            [0x1F, 0x68],           // store exit mouse coordinates
            [0x04, 0x00, 0x02],     // set exit mouse currently in possession
            [0x1F, 0x83, 0x01, 0x02], // auto-equip cracked bat     
            [0x1F, 0xB0],           // save the game
            [0x02,]
        ];
        intro.writeScript();

        const exitMouseReturnLines = [
            ebutils.encodeText("@(The mouse found the way back and waved for you to follow.)"),
            [0x03],
            ...MapMusicObject.clearFloorFlags,
            [0x05, 0x00, 0x02],         // set exit mouse currently not in possession
            [0x04, 0x0B, 0x00],         // encounters off
            [0x1f, 0x69],               // perform teleport
            [0x05, 0x0B, 0x00],         // encounters on
            [0x1d, 0x01, 0xff, 0xc5],   // one use only
            [0x02]
        ];
        const exitMouseReturn = Script.writeNewScript(exitMouseReturnLines);

        const exitMouseSetLines = [
            ebutils.encodeText("@(The mouse remembered this spot.)"),
            [0x1f, 0x68],               // set exit mouse coordinates
            [0x13, 0x02]
        ];
        const exitMouseSet = Script.writeNewScript(exitMouseSetLines);

        const exitMouseMain = Script.getByPointer(0x2f9ef4);
        exitMouseMain.lines = [
            ebutils.encodeText("@Should the mouse mark this spot or go to the last spot?"),
            [0x00],
            [0x19, 0x02],
            ebutils.encodeText("Mark", false),
            [0x02],
            [0x19, 0x02],
            ebutils.encodeText("Go", false),
            [0x02],
            [0x1C, 0x07, 0x02],
            [0x11],
            [0x12],
            [0x09, 0x02, ...ebutils.ccodeAddress(exitMouseSet.pointer), ...ebutils.ccodeAddress(exitMouseReturn.pointer)],
            [0x02]
        ];
        exitMouseMain.writeScript();

        // Hint guys
        const hintGuys = TPTObject.every.filter(o => o.oldData['sprite'] === 136 || o.oldData['sprite'] === 446);
        let hintMainScript = Script.getByPointer(0x70329);
        hintMainScript.lines = [
            ebutils.encodeText(` floor of the ancient cave.`),
            ...bossList.map((b, i) => [0x03,0x00, ...ebutils.encodeText(`@Spot ${i+1}: ${b.firstEnemy.oldName}`)]),
            [0x13, 0x02]
        ];
        hintMainScript.writeScript();
        const ordinal = i => {
            if ((i % 10) === 1) return 'st';
            if ((i % 10) === 2) return 'nd';
            if ((i % 10) === 3) return 'rd';
            return 'th';
        };

        hintGuys.forEach(o => {
            const msos = MapSpriteObject.every.filter(mso => mso.data.tpt_number === o.index);
            console.assert(msos.length === 1);
            const caveLevel = msos[0].enemyCell.caveLevel;
            if(!caveLevel) return;
            const newlines = [
                ebutils.encodeText(`@This is the ${caveLevel}${ordinal(caveLevel)}`),
                ebutils.ccodeGotoAddress(hintMainScript.pointer)
            ];
            const newScript = Script.writeNewScript(newlines);
            o.data['address'] = ebutils.fileToEbPointer(newScript.pointer);
        });

        // Fourside museum left door - only work when new flag 0x3f3 is set;
        // set flag upon entering from left or completing normal Fourside task.
        // 1) New event for leading into left door
        const eventOutOfLeftMuseum = MapEventObject.every.find(me => 
            me.isExit && me.globalX === 0x1128 && me.globalY === 0x14c8);
        const eventIntoLeftMuseum = eventOutOfLeftMuseum.connected;
        const eventIntoLeftNewScript = Script.writeNewScript([
            [0x04, 0xf3, 0x03],
            ebutils.ccodeGotoAddress(eventIntoLeftMuseum.newEvent.data.event_call),
        ]);
        eventIntoLeftMuseum.newEvent.data.event_call = eventIntoLeftNewScript.snesAddress;
        // 2) Add to event for correct signed banana use
        const bananaUseScript = Script.getByPointer(0x8259f);
        bananaUseScript.lines = [
            [0x04, 0xf3, 0x03],
            ...bananaUseScript.lines,
        ]
        bananaUseScript.writeScript(true);
        // 3) Set door to only work if flag is set
        eventOutOfLeftMuseum.newEvent.data.event_flag = 0x83f3;

        const deathScript = Script.getByPointer(0x7de7d);
        const newDeathScript = Script.writeNewScript([
            ...MapMusicObject.clearFloorFlags,
            deathScript.lines[0],
            [0x02]
        ]);
        deathScript.lines[0] = ebutils.ccodeCallAddress(newDeathScript.snesAddress);
        deathScript.writeScript();
        console.assert(deathScript.length === deathScript.oldLength);

        Script._allScripts.forEach(s => s.fulfillScheduledWrite());
    };

    static sanitizeCaveEvents() {
        this.context.hooks.message("Sanitizing cave events...");

        ebutils.SANCTUARY_ACTIVATION_POINTERS.forEach(sap => {
            const script = Script.getByPointer(sap);
            script.makeSanctuaryDoorAlwaysActivate();
        });

        const removeTPT = index => {
            const tpt = TPTObject.get(index);
            tpt.data.flag = 0x5e;
            tpt.data.flag_appear = 1;
        };

        // Giygas - flags necessary to be set upon entering for battle to function
        let script = Script.getByPointer(0x9af3a);
        script.lines = [
            [0x04, 0x74, 0x01],
            ebutils.ccodeCallAddress(0xc9b12e), // Tony character naming
            script.lines[1],
            script.lines[2],
        ];
        script.writeScript(true);

        // Belch - confirm fight if no Fly Honey
        let tpt = TPTObject.get(697);
        const newBelchLines = [
            [0x1D, 0x05, 0xFF, 0x69],
            [0x1B, 0x03, ...ebutils.ccodeAddress(tpt.data.address)],
            ebutils.encodeText("@(You don't have Fly Honey."),
            [0x03, 0x00],
            ebutils.encodeText("@Do you really want to talk to Belch?)"),
            [0x00],
            [0x19, 0x02],
            ebutils.encodeText("No", false),
            [0x02],
            [0x19, 0x02],
            ebutils.encodeText("Yes", false),
            [0x02],
            [0x1C, 0x07, 0x02],
            [0x11],
            [0x12],
            [0x09, 0x02, ...ebutils.ccodeAddress(0x99ff9), ...ebutils.ccodeAddress(tpt.data.address)],
            [0x02]
        ];
        let newBelch = Script.writeNewScript(newBelchLines);
        tpt.data.address = ebutils.fileToEbPointer(newBelch.pointer);

        // Mom in Ness's house - manual changes to get to heal state
        script = Script.getByPointer(0x750e3);
        script.lines[0] = [0x0a, 0x24, 0x51, 0xc7, 0x00];
        script.writeScript();

        // Strong - prevent softlock
        tpt = TPTObject.get(71);
        tpt.data.address = 0xc76b0b;

        // Magic Cake Lady - prevent softlock
        tpt = TPTObject.get(1069);
        tpt.data.address = 0xc8b22f;

        // Moonside right side #3 teleporter - return to central Moonside
        tpt = TPTObject.get(1383);
        tpt.data.address = 0xc96e22;

        // Brick Road's head - don't set flags or give long speech
        script = Script.getByPointer(0x57955);
        script.lines =  [...script.lines.slice(0,7), ebutils.ccodeGotoAddress(0x57ad9)];
        script.writeScript();

        // Bubble Monkey - prevent joining
        script = Script.getByPointer(0x6af6c);
        script.lines =  script.lines.slice(2);
        script.writeScript();

        // Andonuts - prevent activating Sky Runner
        tpt = TPTObject.get(0x267);
        tpt.data.address = 0xc6b5b4;

        // Big Foot - always appear
        tpt = TPTObject.get(0x26b);
        tpt.data.flag = 0;
        tpt.data.flag_appear = 0;

        // Shark guarding Frank - never appear
        removeTPT(0x1);

        // Dalaam Throne room - always heal
        tpt = TPTObject.get(1089);
        tpt.data.address=0xc9cb79;

        // Mom heal part 1
        tpt = TPTObject.get(14);
        tpt.data.flag = 0x5e;
        tpt = TPTObject.get(15);
        tpt.data.flag = 0x5e;

        // Topolla Theater backstage attendant - always out of the way
        tpt = TPTObject.get(840);
        tpt.data.flag = 0x5e;
        tpt = TPTObject.get(841);
        tpt.data.flag = 0x5e;

        // Chaos Theater - remove show
        script = Script.getByPointer(0x99fe0);
        script.lines[0] = [0x0a, 0x2f, 0x99, 0xc9, 0x00];
        script.writeScript();

        // Mr Saturn - never give waterfall password
        tpt = TPTObject.get(739);
        tpt.data.address=0xc7edd9;

        // Cop room - disable fights
        tpt = TPTObject.get(73);
        tpt.data.address=0xc74c85;
        tpt = TPTObject.get(74);
        tpt.data.address=0xc74c85;
        tpt = TPTObject.get(75);
        tpt.data.address=0xc74c85;
        tpt = TPTObject.get(76);
        tpt.data.address=0xc74c85;
        tpt = TPTObject.get(77);
        tpt.data.address=0xc74c85;

        // Mom outside house - never appear
        removeTPT(148);

        // Pyramid doors - never appear
        removeTPT(1143);
        removeTPT(1154);

        // Twoson theatre girl - never appear
        removeTPT(231);

        // Hieroglpyh room man - never appear
        removeTPT(1038);

        // Hieroglpyhs - don't trigger room events
        const heiroScript = Script.getByPointer(0x86e3d);
        heiroScript.lines = [
            ebutils.ccodeGotoAddress(0x870a4),
        ];
        heiroScript.writeScript();

        // Pokey in office - never appear
        removeTPT(865);

        // Pokey and pals in PRV - never appear
        removeTPT(439);
        removeTPT(440);
        removeTPT(441);
        removeTPT(442);

        // Non-critical NPCs in Lost Underworld Tenda Village - never appear
        // Critical: 1297 phone, 1291 atm, 1282 shop, 1298 inn
        removeTPT(1283);
        removeTPT(1284);
        removeTPT(1285);
        removeTPT(1286);
        removeTPT(1288);
        removeTPT(1289);
        removeTPT(1290);
        removeTPT(1292);
        removeTPT(1299);
        removeTPT(1300);

        // NPCs in Dungeon Man Zoo - never appear
        removeTPT(1211);
        removeTPT(1212);
        removeTPT(1213);
        removeTPT(1214);
        removeTPT(1215);
        removeTPT(1216);
        removeTPT(1217);
        removeTPT(1218);

        // Bus stops - always disabled
        const buses = TPTObject.every.filter(o => o.oldData.sprite === 202);
        buses.forEach(bus => { 
            bus.data.address = 0xc5feac;
        });

        // Cultists - never appear
        const cultists = TPTObject.every.filter(o => o.oldData.sprite === 101);
        cultists.forEach(cultist => { 
            cultist.data.flag = 0x5e;
            cultist.data.flag_appear = 1;
        });

        // Sign in Brick Road room - always appear, move over hole
        tpt = TPTObject.get(1220);
        const mso = MapSpriteObject.every.find(mso => mso.data.tpt_number === tpt.index);
        mso.data.x = 80;
        tpt.data.flag = 0;
        tpt.data.flag_appear = 0;
        tpt.data.address = tpt.oldData.address;
        tpt.script.lines = [
            ebutils.encodeText("@BAD HOLE"),
            [0x13, 0x02]
        ];
        tpt.script.writeScript();

        // War against Giygas is over - go to credits
        script = Script.getByPointer(0x9c293);
        console.assert(script.lines.length === 273);
        script.lines = script.lines.slice(0, 69);
        if(this.context.random.random() < 0.1) {
            script.lines[61]= [21, 20, 167, 145, 162, 21, 91, 163, 164, 80, 119, 153, 151, 151, 145, 151, 145, 163];
        }
        const creditsMusic = Array.from(MusicObject.battleMusics).concat(Array.from(MusicObject.overworldMusics)).concat(Array.from(MusicObject.ancientCaveMusics));
        script.lines.push([0x1f, 0x00, 0x00, this.context.random.choice(creditsMusic)]); // Music
        script.lines.push([0x1f, 0x41, 0x0c]); // Credits
        script.lines.push(ebutils.ccodeGotoAddress(0x9c96e)); // The End
        script.writeScript();

        // MapEnemyObject.every.forEach(meo => meo.caveSanitizeEvents())
        problematicScriptsText.forEach(line => {
            if(line.trim().length === 0) return;
            script = Script.getByPointer(parseInt(line.trim(), 0x10));
            script.removeExitMouseStore();
            script.removeEncountersOff();
            script.removeStatusEffectsOff();
            script.removeTeleports();
            script.removePartyChanges();
            script.removeVolumeChanges();
            script.fixHotels();
        });

        // Sleeps (Hotels) - remove Paula prayer scenes, add "You Won" music and return normal sound
        script = Script.getByPointer(0x90f7d);

        console.assert(script.lines.length === 11);
        script.lines = [
            script.lines[0], // Close all windows
            script.lines[1], // Delay parsing
            script.lines[2], // Fade out music
            script.lines[3], // Generate active sprite
            script.lines[4], // Movement code trigger
            script.lines[9], // Perform Jeff repair check
            ebutils.ccodeCallAddress(0xc915d6), // You Won music break
            [0x02]
        ];
        script.writeScript();

        // Remove now-redundant "You Won" music break from places it follows sleep logic
        const removeYouWonPointers = [
            0x91693, // Benches, stew guy, etc
            0x6002c, // Desert shack
            0x57b5c, 0x57b7c, 0x57b9c, 0x57bbc, // Benches
        ];
        removeYouWonPointers.forEach(pointer => {
            script = Script.getByPointer(pointer);
            script.removeInstructions([ebutils.ccodeCallAddress(0xc915d6)], [], false);
            script.writeScript();
        });

        Script._allScripts.forEach(s => s.fulfillScheduledWrite());
    }

    static replaceSanctuaryBosses() {
        const sBosses = ebutils.SANCTUARY_BOSS_INDEXES.map(sbi => MapSpriteObject.get(sbi));
        const sClusters = sBosses.map(mso => mso.nearestCluster).sort((a,b) => a.rank - b.rank);

        this.context.hooks.message("Finding bosses...");
        let bosses = new Set([]);
        MapSpriteObject.every.forEach(mso => {
            if(!mso.script) return;
            mso.script.enemyEncounters.forEach(e => bosses.add(e));
        });

        bosses = [...bosses].sort((a,b) => a.rank - b.rank);

        bosses.forEach(b => {b.inBosses = true;});

        const BANNED = [0x1c8]; // Master Belch
        bosses = bosses.filter(b => !BANNED.includes(b.index));

        const chosens = [];
        while(chosens.length < sClusters.length) {
            const candidates = bosses.filter(b => !chosens.includes(b));
            const maxIndex = candidates.length - 1;
            const index = this.context.random.randint(
                Math.round(this.context.random.randint(0, maxIndex) / 2),
                maxIndex
            );
            chosens.push(candidates[index]);
        }

        const NONLINEARITY = this.randomDegree || this.context.specs.randomDegree;
        bosses = this.context.random.shuffleNormal(bosses, NONLINEARITY);
        chosens.sort((a,b) => bosses.indexOf(a) - bosses.indexOf(b));

        const doneScripts = new Set();
        sClusters.forEach((sc, i) => {
            const c = chosens[i];
            const numberedBoss = sBosses[i];
            const sBoss = sBosses.filter(s => s.nearestCluster === sc)[0];
            sBoss.setScript(numberedBoss);

            let linesToRemove = 3;
            if(sBoss.script.lines[1][0] === 0x19 && sBoss.script.lines[1][1] === 0x10) {
                linesToRemove = 6;
            }

            sBoss.script.lines.splice(1, linesToRemove,
                [0x19, 0x10, 0x01],             // get lead character number
                [0x0B, this.firstCharacter()],  // true if they are our first character
                [0x1B, 0x02, ...ebutils.ccodeAddress(0xc690a6)], // if false, go to "only x can absorb"
            );

            sBoss.script.replaceSanctuaryBoss(c);
            sBoss.script.writeScript();
            console.assert(!doneScripts.has(sBoss.script));
            doneScripts.add(sBoss.script);
        })
        console.assert(doneScripts.size === 8);
        this.context.rom[0x690AD] = this.firstCharacter(); // Only X can absorb...
        return chosens;
    }

    static firstCharacter() {
        if(!this.context.specs.flags.z.noNess) return 1;
        if(!this.context.specs.flags.z.noPaula) return 2;
        if(!this.context.specs.flags.z.noJeff) return 3;
        if(!this.context.specs.flags.z.noPoo) return 4;
        throw new Error("You must have at least one player character.");
    }
}

AncientCave._displayName = "ancient cave";
export default AncientCave;