/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/stat_growth_table.txt';

class StatGrowthObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.c; // Character stats
    }
}

StatGrowthObject.randomizeAttributes = [
    "offense", "defense", "speed", "guts", "vitality", "iq", "luck"];
    
StatGrowthObject.mutateAttributes = {
    "offense": null,
    "defense": null,
    "speed": null,
    "guts": null,
    "vitality": null,
    "iq": null,
    "luck": null,
    };

StatGrowthObject.tableSpecs = {
    text: tableText,
    count: 4,
    pointer: 0x15ea5b,
};

StatGrowthObject._displayName = "stat growth";
export default StatGrowthObject;