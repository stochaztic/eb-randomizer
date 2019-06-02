import { utils } from 'randomtools-js';
import ebutils from './ebutils.js';
import Script from './Script.js';

const LudicrousSpeedPatch = {
    name: "Ludicrous Text Speed",
    entries: utils.standardPatchLoader(["44058: EA", "444E6: EA", "10D4E: EA"]),
    cleanup: (context) => {
        const newLength = 10;
        const text = [ebutils.textToList("Ludicrous", newLength), ebutils.textToList("Eh", newLength), ebutils.textToList("Meh", newLength)];
        const newScript = Script.writeNewScript(text);

        context.rom.set(ebutils.asmLoadAddress(newScript.snesAddress, 0x06), 0x1F3E4);
        context.rom.set(ebutils.asmLoadAddress(newScript.snesAddress, 0x06), 0x1EF7E);

        context.rom[0x1EFA3] = newLength;
        context.rom[0x1F422] = newLength;
        context.rom[0x1F451] = newLength * 2;

        context.rom.set(ebutils.textToList("Text Spd:  ", 11), 0x4c074);
    },
};

export default LudicrousSpeedPatch;