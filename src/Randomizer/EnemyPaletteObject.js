import { TableObject } from 'randomtools-js';
import ebutils from './ebutils.js';

class EnemyPaletteObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.p >= 1; // Palettes
    }
    mutate() {
        super.mutate();
        const hueAdjustment = this.context.random.randint(0, 359);
        this.data.color = ebutils.rotateEbPalette(this.oldData.color, hueAdjustment);
    }
}

EnemyPaletteObject.tableSpecs = {
    text: ["color,16x2,list"],
    count: 32,
    pointer: 0xe6514,
};

EnemyPaletteObject._displayName = "enemy palette";
export default EnemyPaletteObject;