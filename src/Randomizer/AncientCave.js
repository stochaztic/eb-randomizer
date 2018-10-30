/* eslint import/no-webpack-loader-syntax: off */
import problematicScriptsText from '!array-loader!./tables/problematic_scripts.txt';
import { ReadWriteObject, utils } from 'randomtools-js';
import ebutils from './ebutils.js';
import Script from './Script.js';
import Cluster from './Cluster.js';
import MapSpriteObject from './MapSpriteObject.js';
import MapEventObject from './MapEventObject.js';
import TPTObject from './TPTObject.js';

class AncientCave extends ReadWriteObject {
    static shouldRandomize() {
        return this.context.specs.flags.a;
    }

    static initialize(context) {
        super.initialize(context);
        Script.setContext(this.context);
    }

    static fullRandomize() {
        this.classReseed("ancient");;
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
            const teleportX = 904;
            const teleportY = 757;

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

        // Remove the middle door from the Electro Specter cluster.
        // This turns this cluster into a two-exit cluster, where the left exit 
        // arrives from the middle hole and departs from the left hole.
        // This prevents non-Euclidian layouts and can guarantee the boss cannot be 
        // skipped if incoming-outgoing preferences are set on the remaining doors.
        // This must be done after the above section to find the boss cluster.
        let electroSpecter = Cluster.every.filter(c => c.index === 0xf2696);
        console.assert(electroSpecter.length === 1);
        electroSpecter = electroSpecter[0];
        const badExits = electroSpecter.exits.filter(e => e.enemyCell.index === 0x0138);
        console.assert(badExits.length === 1);
        electroSpecter.exits.splice(electroSpecter.exits.indexOf(badExits[0]), 1);
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
        const safe = c => !c.hasBattleTrigger;

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
        console.assert(toAssign.length < totalUnassignedExits.length);
        const remainingSingletons = singletons.filter(s => s.optional);
        while(toAssign.length < totalUnassignedExits.length) {
            const x = this.context.random.choice(remainingSingletons);
            remainingSingletons.splice(remainingSingletons.indexOf(x), 1);
            toAssign.push(x);
        }
        console.assert(toAssign.length === totalUnassignedExits.length);

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

        // Assign remainder of singletons
        toAssign.forEach(s => {
            if(toEvenlyAssign.includes(s)) return;
            console.assert(s.unassignedExits.length === 1);
            let x = s.unassignedExits[0];
            let chosen = this.context.random.choice(totalUnassignedExits);
            Cluster.assignExitPair(x, chosen);
            totalUnassignedExits.splice(totalUnassignedExits.indexOf(chosen), 1);
            x.caveLevel = chosen.caveLevel;
            s.caveLevel = chosen.caveLevel;
        })

        console.assert(totalUnassignedExits.length === 0);
        Cluster.rankClusters(this.context);

        // do AFTER ranking clusters
        this.classReseed("bosses");
        const bossList = this.replaceSanctuaryBosses();

        this.context.hooks.message(`${Math.floor(Cluster.goal.rank)} doors to the finish`);
        Cluster.rankedClusters.forEach(clu => {
            clu.exits.forEach(a => {
                const b = Cluster.assignDict[a.index];
                console.assert(b.force || b.hasMutualFriend);
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

            //[0x04, 0x74, 0x01],     // become robots
            [0x05, 0x0B, 0x00],     // "enemies won't appear" flag (off)
            [0x1F, 0x11, 0x02],     // recruit paula
            [0x1F, 0x11, 0x03],     // recruit jeff
            [0x1F, 0x11, 0x04],     // recruit poo
            [0x1F, 0x68],           // store exit mouse coordinates
            [0x04, 0x00, 0x02],     // set exit mouse currently in possession
            [0x1F, 0xB0],           // save the game
            [0x02,]
        ];
        intro.writeScript();

        ebutils.SANCTUARY_ACTIVATION_POINTERS.forEach(sap => {
            const script = Script.getByPointer(sap);
            script.makeSanctuaryDoorAlwaysActivate();
        });

        const exitMouse = Script.getByPointer(0x2f9ef4);
        exitMouse.lines = [
            ebutils.encodeText("@(The mouse found the way back and waved for you to follow.)"),
            [0x03],
            [0x1f, 0x69],               // perform teleport
            [0x05, 0x0B, 0x00],         // encounters on
            [0x1d, 0x01, 0xff, 0xc5],   // one use only
            [0x05, 0x00, 0x02],         // set exit mouse currently not in possession
            [0x02]
        ];
        exitMouse.writeScript();

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

        this.context.hooks.message("Sanitizing cave events...");
        // Special Events
        // Giygas - flags necessary to be set upon entering for battle to function
        let script = Script.getByPointer(0x9af3a);
        script.lines[0] = [0x04, 0x74, 0x01];
        script.writeScript();

        // Mom in Ness's house - manual changes to get to heal state
        script = Script.getByPointer(0x750e3);
        script.lines[0] = [0x0a, 0x24, 0x51, 0xc7, 0x00];
        script.writeScript();

        // Chaos Theater - remove show, due to panning bug when PC sprites randomized
        if(this.context.specs.flags.p) {
            script = Script.getByPointer(0x99fe0);
            script.lines[0] = [0x0a, 0x2f, 0x99, 0xc9, 0x00];
            script.writeScript();
        }

        // Strong - prevent softlock
        let tpt = TPTObject.get(71);
        tpt.data.address = 0xc76b0b;

        // Moonside right side #3 teleporter - return to central Moonside
        tpt = TPTObject.get(1383);
        tpt.data.address = 0xc96e22;

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

        // Shark guarding Frank - always fight
        tpt = TPTObject.get(0x1);
        tpt.data.address = tpt.data.address + 14;

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
        tpt = TPTObject.get(148);
        tpt.data.flag = 0x5e;
        tpt.data.flag_appear = 1;

        // Pyramid doors - never appear
        tpt = TPTObject.get(1143);
        tpt.data.flag = 0x5e;
        tpt.data.flag_appear = 1;
        tpt = TPTObject.get(1154);
        tpt.data.flag = 0x5e;
        tpt.data.flag_appear = 1;

        // Bus stops - always disabled
        const buses = TPTObject.every.filter(o => o.oldData.sprite === 202);
        buses.forEach(bus => { 
            bus.data.address = 0xc5feac;
        });

        // War against Giygas is over - go to credits
        script = Script.getByPointer(0x9c293);
        console.assert(script.lines.length === 273);
        script.lines = script.lines.slice(0, 69);
        script.lines.push([0x1f, 0x00, 0x00, this.context.random.randint(1, 191)]); // Music
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
            script.fixHotels();
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

        const BANNED = [0x1ce, 0x1c8]; // Clumsy Robot, Master Belch
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
            sBoss.script.replaceSanctuaryBoss(c);
            console.assert(!doneScripts.has(sBoss.script));
            doneScripts.add(sBoss.script);
        })
        console.assert(doneScripts.size === 8);
        return chosens;
    }
}

AncientCave._displayName = "ancient cave";
export default AncientCave;