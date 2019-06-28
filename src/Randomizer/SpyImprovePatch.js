/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/spy_improve_patch.txt';
import { utils } from 'randomtools-js';
import ebutils from './ebutils.js';
import Script from './Script.js';

const SpyImprovePatch = {
    name: "Spy improve",
    entries: utils.standardPatchLoader(patchText),
    cleanup: (context) => {
        const scriptEntries = [
            { address: 0x2f6a0d, name: "PSI Fire" },
            { address: 0x2f6a24, name: "PSI Freeze" },
            { address: 0x2f6a3c, name: "PSI Flash" },
            { address: 0x2f6a54, name: "Paralysis" },
            { address: 0x2f6a6c, name: "Hypnosis" },
            { address: 0x2f6a7f, name: "Brainshock" },
        ];

        scriptEntries.forEach(scriptEntry => {
            Script.replace(scriptEntry.address, [
                [0x00],
                ebutils.encodeText("@"),
                [0x1C, 0x0F],
                ebutils.encodeText(`% vulnerability to ${scriptEntry.name}.`),
                [0x14, 0x02],
            ]);
        });
        
        console.assert(context.rom[0x2885F] === 0xEA);
        console.assert(context.rom[0x28860] === 0xAE);
    },
};

export default SpyImprovePatch;