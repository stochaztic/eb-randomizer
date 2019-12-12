/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/bg_data_table.txt';

class BgDataObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.b; // Backgrounds
    }

    mutate() {
        const matchingDepths = BgDataObject.every.filter(b => b.color_depth === this.color_depth);
        let source = this.context.random.choice(matchingDepths);
        ["palette", "palette_cycle", "palette_cycle_1_begin", "palette_cycle_1_end",
        "palette_cycle_2_begin", "palette_cycle_2_end", "palette_changing_speed"].forEach(attribute => {
            this.data[attribute] = source.oldData[attribute];
        });

        if(this.data.palette_changing_speed > 0) { // Slow down very fast palette changes
            this.data.palette_changing_speed = Math.max(7, this.data.palette_changing_speed);
        }

        source = this.context.random.choice(BgDataObject.every);
        ["scrolling_movement_1", "scrolling_movement_2", 
        "scrolling_movement_3", "scrolling_movement_4"].forEach(attribute => {
            this.data[attribute] = source.oldData[attribute];
        });

        source = this.context.random.choice(BgDataObject.every);
        ["distortion_1", "distortion_2", "distortion_3", "distortion_4"].forEach(attribute => {
            this.data[attribute] = source.oldData[attribute];
        });
    }
}

BgDataObject.tableSpecs = {
    text: tableText,
    count: 327,
    pointer: 0xadca1,
};

BgDataObject._displayName = "bg data";
export default BgDataObject;