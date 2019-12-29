import { TableObject } from 'randomtools-js';
import ebutils from './ebutils.js';
import BgDataObject from './BgDataObject.js';

class BgPaletteObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.b >= 1; // Backgrounds
    }

    mutate() {
        super.mutate();

        if(this.constructor.badPalettes.includes(this.index)) { // Replace badly-flashing palette
            let candidates = this.constructor.every.filter(x => x.colorDepth === this.colorDepth && !this.constructor.badPalettes.includes(x.index));
            let chosen = this.context.random.choice(candidates);
            this.data.color = chosen.oldData.color;
        }

        if(this.context.specs.flags.b >= 2 && this.index !== 0) { // Color-shift all palettes
            const hueAdjustment = this.context.random.randint(0, 359);
            this.data.color = ebutils.rotateEbPalette(this.data.color, hueAdjustment);
            this.data.color[0] = this.oldData.color[0];
        }
    }
    
    getVariableSpecsattrs() {
        let firstUsedBg = BgDataObject.every.find(x => x.oldData.palette === this.index);
        if(!firstUsedBg) {
            throw new Error(`No BG found for palette ${this.index}`);
        }
        this.colorDepth = firstUsedBg.oldData.color_depth;
        if(this.colorDepth === 4) {
            return [{name:"color", size:"16x2", other:"list"}];
        }
        return [{name:"color", size:"4x2", other:"list"}];
    }
}

BgPaletteObject.tableSpecs = {
    count: 113,
    pointed: true,
    pointer: 0xadad9,
    variableSize: true,
};

BgPaletteObject.badPalettes = [83, 96];

BgPaletteObject._displayName = "bg palette";
export default BgPaletteObject;