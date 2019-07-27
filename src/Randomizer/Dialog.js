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
        const tptCandidates = TPTObject.every.filter(tpt => tpt.script && tpt.script.isSwapSafe && tpt.oldData.argument === 0);
        //const scriptCandidates = tptCandidates.flatMap(tpt =>tpt.script.swapSafeScripts); //flatMap replacement:
        const scriptCandidates = tptCandidates.reduce((acc, x) => acc.concat(x.script.swapSafeScripts), []);
        const shuffled = this.context.random.shuffleNormal(scriptCandidates, 1);

        tptCandidates.forEach((tpt, i) => {
            tpt.data.address = shuffled[i].snesAddress;
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
        const gameScripts = TPTObject.every.map(tpt => tpt.script).filter(script => script && script.isSwapSafe);
        let candidates = Script.newlines;
        candidates = candidates.concat(this.context.random.sample(gameScripts, candidates.length));
        let chosen = this.context.random.sample(candidates, pokeyScripts.length);

        chosen.forEach((newScript, i) => {
            const [pokeyScript, preLines, postLines] = pokeyScripts[i];
            if(this.context.specs.flags.devmode >= 2) {
                newScript = Script.newlines[Script.newlines.length - 1];
            }
            if(newScript.constructor !== Script) {
                newScript = Script.writeNewScript(newScript);
            }
            const callLine = ebutils.ccodeCallAddress(newScript.pointer);
            pokeyScript.lines.splice(preLines, pokeyScript.lines.length - (preLines + postLines), callLine);
            pokeyScript.writeScript();
        })
    }

    static fullCleanup() {
        super.fullCleanup();
        // Prayer scenes
        if(!this.context.specs.flags.u.shortPrayers) return;
        const gameScripts = TPTObject.every.map(tpt => tpt.script).filter(script => script && script.isSwapSafe);
        const prayerScripts = ebutils.GIYGAS_PRAYER_SCRIPTS.map(p => Script.getByPointer(p));

        let chosen = undefined;
        if(this.shouldRandomize()) {
            chosen = this.context.random.sample(gameScripts, prayerScripts.length);
        }
        else {
            chosen = prayerScripts.map((_prayerScript, i) => {
                return Script.writeNewScript([
                    ebutils.encodeText(`@Prayer ${ i + 1 }.`),
                    [0x13, 0x02],
                ]);
            })
        }
        prayerScripts.forEach((prayerScript, i) => {
            prayerScript.lines = [
                [0x18, 0x01, 0x01],         // open window 1
                ebutils.ccodeCallAddress(chosen[i].pointer),
                [0x10, 0x0f],               // pause 1/4th second
                [0x18, 0x04],               // close all windows
                [0x02],
            ];
            prayerScript.writeScript();
        });

    }
}

Dialog._displayName = "dialogue";
export default Dialog;