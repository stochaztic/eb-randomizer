import { TableObject } from 'randomtools-js';
import ebutils from './ebutils.js';

class BgPaletteObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.b >= 1; // Backgrounds
    }
    mutate() {
        super.mutate();

        if(this.constructor.badPalettes.includes(this.index)) { // Replace badly-flashing palette
            var newSource = this.index;
            while(this.constructor.badPalettes.includes(newSource)) {
                newSource = this.context.random.randint(0, this.constructor.tableSpecs.count - 1);
            }
            this.data.color = this.constructor.get(newSource).oldData.color;
        }

        if(this.context.specs.flags.b >= 2) { // Color-shift all palettes
            const hueAdjustment = this.context.random.randint(0, 359);
            this.data.color = ebutils.rotateEbPalette(this.data.color, hueAdjustment);
        }
    }
}

BgPaletteObject.tableSpecs = {
    text: ["color,16x2,list"],
    count: 113,
    pointed: true,
    pointer: 0xadad9,
};

BgPaletteObject.badPalettes = [83, 96];

BgPaletteObject._displayName = "bg palette";
export default BgPaletteObject;