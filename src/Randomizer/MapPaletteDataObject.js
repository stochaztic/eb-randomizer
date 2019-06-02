import { TableObject } from 'randomtools-js';
import ebutils from './ebutils.js';

class MapPaletteDataObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.p >= 3; // Palettes
    }

    static hueAdjustmentForIndex(i) {
        if(this._hueAdjustmentCache === undefined) this._hueAdjustmentCache = {};
        const cacheIndex = Math.floor(i / 6);
        if(this._hueAdjustmentCache[cacheIndex] !== undefined) return this._hueAdjustmentCache[cacheIndex];
        this._hueAdjustmentCache[cacheIndex] = this.context.random.randint(0, 359);
        return this.hueAdjustmentForIndex(i);
    }

    mutate() {
        super.mutate();
        const hueAdjustment = this.constructor.hueAdjustmentForIndex(this.index);
        this.data.color = ebutils.rotateEbPalette(this.oldData.color, hueAdjustment);
    }
}

MapPaletteDataObject.tableSpecs = {
    text: ["color,16x2,list"],
    count: 1008,
    pointer: 0x1a7ca7,
};

MapPaletteDataObject._displayName = "map palette data";
export default MapPaletteDataObject;