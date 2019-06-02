import { TableObject } from 'randomtools-js';
import ebutils from './ebutils.js';
import Script from './Script.js';
import { battleSpriteNames, enemyAdjectives } from './RandomNames.js';

class FlavorObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.p >= 2; // Palettes
    }
    mutate() {
        super.mutate();
        const hueAdjustment = this.context.random.randint(0, 359);
        this.data.color = ebutils.rotateEbPalette(this.oldData.color, hueAdjustment);
    }
    
    static mutateAll() {
        super.mutateAll();

        // Change flavor names
        const flavorNamePointerOffsets = [0x1F70F, 0x1F72A, 0x1F745, 0x1F760, 0x1F77B];
        const battleSpriteNamesReduced = battleSpriteNames.map(commaList => {
            const list = commaList.split(",");
            return this.context.random.choice(list);
        });
        const textPool = [...enemyAdjectives, ...battleSpriteNamesReduced];
        flavorNamePointerOffsets.forEach(offset => {
            const text = this.context.random.choice(textPool);

            const nullTerminatedEncodedText = ebutils.encodeText(text, false);
            nullTerminatedEncodedText.push(0x0);
            const newScript = Script.writeNewScript([nullTerminatedEncodedText]);

            const asm = ebutils.asmLoadAddress(newScript.snesAddress);
            this.context.rom.set(asm, offset);
        });
    }
}

FlavorObject.tableSpecs = {
    text: ["color,32x2,list"],
    count: 7,
    pointer: 0x201fc8,
};

FlavorObject._displayName = "flavors";
export default FlavorObject;