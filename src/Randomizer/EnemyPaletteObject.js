/* eslint import/no-webpack-loader-syntax: off */
import { TableObject, utils } from 'randomtools-js';
import Color from 'color';
import ebutils from './ebutils.js';

class EnemyPaletteObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.m; // Enemy stats
    }
    mutate() {
        super.mutate();
        const hueAdjustment = this.context.random.randint(0, 359);
        this.oldData.color.forEach((color, i) => {
            const oldRgb = utils.snesColorToRgb(color);
            const oldColor = Color(oldRgb);
            const newRbg = oldColor.rotate(hueAdjustment).rgb().object();
            this.data.color[i] = utils.rgbToSnesColor(newRbg);
        });
    }
}

EnemyPaletteObject.tableSpecs = {
    text: ["color,16x2,list"],
    count: 32,
    pointer: 0xe6514,
};

EnemyPaletteObject._displayName = "enemy palette";
export default EnemyPaletteObject;