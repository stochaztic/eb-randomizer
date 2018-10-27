import { ReadWriteObject } from 'randomtools-js';
import TPTObject from './TPTObject.js';
import Script from './Script.js';
import ebutils from './ebutils.js';

class Dialog extends ReadWriteObject {
    static shouldRandomize() {
        return this.context.specs.flags.d; // dialogs
    }

    static intershuffle() {
        this.classReseed("inter");
        const candidates = TPTObject.every.filter(tpt => tpt.script && tpt.script.isSwapSafe);
        const shuffled = this.context.random.shuffleNormal(candidates, 1);

        candidates.forEach((tpt, i) => {
            tpt.data.address = shuffled[i].oldData.address;
        })
    }

    static mutateAll() {
        // Pokey lines
        if(this.context.specs.flags.d < 2) return;
        this.classReseed("mut");
        const pokeyScripts = [
            [Script.getByPointer(0x57e1c), 0, 1],
            [Script.getByPointer(0x8fb1b), 5, 4],
            [Script.getByPointer(0x8fc2e), 4, 4],
            [Script.getByPointer(0x8fd11), 5, 4],
            [Script.getByPointer(0x8ff31), 4, 4],
        ];
        const gameScripts =  TPTObject.every.map(tpt => tpt.script).filter(script => script && script.isSwapSafe);
        let candidates = Script.newlines;
        candidates = candidates.concat(this.context.random.sample(gameScripts, candidates.length * 3));
        let chosen = this.context.random.sample(candidates, pokeyScripts.length);

        chosen.forEach((newScript, i) => {
            const [pokeyScript, preLines, postLines] = pokeyScripts[i];
            if(newScript.constructor !== Script) {
                newScript = Script.writeNewScript(newScript);
            }
            const callLine = ebutils.ccodeCallAddress(newScript.pointer);
            pokeyScript.lines.splice(preLines, pokeyScript.lines.length - (preLines + postLines), callLine);
            pokeyScript.writeScript();
        })

        // Prayer scenes
        if(this.context.specs.flags.d < 3) return;
        const prayerScripts = ebutils.GIYGAS_PRAYER_SCRIPTS.map(p => Script.getByPointer(p));
        chosen = this.context.random.sample(gameScripts, prayerScripts.length);
        prayerScripts.forEach((prayerScript, i) => {
            prayerScript.lines = [
                /*[0x04, 0x0b, 0x00],
                [0x1F, 0xEB, 0xFF, 0x06],   // characters invisible
                [0x05, 0x0a, 0x02],

                [0x1F, 0x21, 0x51],         // teleport
                [0x1f, 0xe5, 0xff],         // lock player movement


                */
                [0x18, 0x01, 0x01],         // open window 1
                ebutils.ccodeCallAddress(chosen[i].pointer),
                [0x18, 0x04],               // close all windows
                /*[0x04, 0x0a, 0x02],
                [0x1F, 0xEC, 0xFF, 0x01],   // characters visible
                [0x05, 0x0b, 0x00],*/
                [0x02],
            ];
            prayerScript.writeScript();
        });

    }
}

Dialog._displayName = "dialogue";
export default Dialog;