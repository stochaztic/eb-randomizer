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
        if(!this.context.specs.flags.d >= 2) return;
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
        const chosen = this.context.random.sample(candidates, pokeyScripts.length);

        chosen.forEach((newScript, i) => {
            const [pokeyScript, preLines, postLines] = pokeyScripts[i];
            if(newScript.constructor !== Script) {
                newScript = Script.writeNewScript(newScript);
            }
            const callLine = ebutils.ccodeCallAddress(newScript.pointer);
            pokeyScript.lines.splice(preLines, pokeyScript.lines.length - (preLines + postLines), callLine);
            pokeyScript.writeScript();
        })
    }
}

Dialog._displayName = "dialog";
export default Dialog;