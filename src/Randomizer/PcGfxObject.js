/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/pc_gfx_table.txt';

class PcGfxObject extends TableObject {
    // It is preferred to not change this table as it can cause bugs
    // during gameplay (Chaos Theater pan, etc). Only leaving it as
    // an option for the old EarthBound reshuffler PC characters under
    // a special flag.
    static shouldRandomize() {
        return false; // Disabling these old sprite randomizations entirely as they are glitchy.
    }

    static mutateAll() {
        this.classReseed("mut");
        const potentialPCs = [
            [1, 8, 17, 21, 5, 27, 34, 16, 1, 453],
            [27, 34, 27, 27, 27, 1, 8, 16, 1, 453],
            [2, 9, 18, 22, 25, 28, 34, 393, 2, 454],
            [3, 10, 19, 23, 25, 29, 34, 394, 3, 3],
            [4, 11, 20, 24, 25, 30, 34, 295, 4, 362],
            [5, 457, 5, 5, 5, 27, 34, 457, 5, 453],
            [6, 8, 6, 6, 5, 27, 34, 16, 6, 453],
            [25, 26, 25, 25, 25, 29, 34, 26, 25, 25],
            [39, 8, 39, 39, 25, 35, 34, 39, 39, 39],
            [40, 8, 42, 43, 25, 399, 34, 359, 359],
            [44, 10, 44, 44, 458, 29, 34, 394, 48, 44],
            [45, 10, 45, 45, 25, 29, 34, 394, 45, 382],
            [46, 8, 47, 47, 25, 35, 34, 46, 46, 46],
            [51, 8, 51, 51, 51, 35, 34, 51, 51, 51],
            [149, 8, 149, 149, 25, 31, 34, 149, 149, 149],
            [150, 8, 150, 150, 25, 32, 34, 150, 150, 150],
            [182, 10, 182, 182, 25, 29, 34, 357, 182, 182],
            [435, 8, 435, 435, 25, 27, 34, 435, 435, 435]
        ];
        const newPCs = this.context.random.sample(potentialPCs, 4);
        
        [...Array(4).keys()].forEach(index => { // Only 4 main PCs
            const o = this.get(index);
            const newPC = newPCs[index];
            o.data.default   = newPC[0];
            o.data.dead      = newPC[1];
            o.data.ladder    = newPC[2];
            o.data.rope      = newPC[3];
            o.data.tiny      = newPC[5];
            o.data.tiny_dead = newPC[6];
            o.data.robot     = newPC[4];
        });
    }
}

PcGfxObject.tableSpecs = {
    text: tableText,
    count: 17,
    pointer: 0x3f2b5,
};

PcGfxObject._displayName = "pc gfx";
export default PcGfxObject;