import { TableObject } from 'randomtools-js';
import tableText from './tables/stat_growth_table.txt';

class StatGrowthObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.c; // Character stats
    }
}

StatGrowthObject.randomizeAttributes = [
    "offense", "defense", "speed", "guts", "vitality", "iq", "luck"];
    
StatGrowthObject.mutateAttributes = {
    "offense": [8, 25],
    "defense": [2, 22],
    "speed": [3, 9],
    "guts": [2, 9],
    "vitality": [2, 6],
    "iq": [3, 12],
    "luck": [2, 9],
    };

StatGrowthObject.randomDegree = 1;

StatGrowthObject.tableSpecs = {
    text: tableText,
    count: 4,
    pointer: 0x15ea5b,
};

StatGrowthObject._displayName = "stat growth";
export default StatGrowthObject;