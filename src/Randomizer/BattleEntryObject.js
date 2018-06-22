/* eslint import/no-webpack-loader-syntax: off */
import { TableObject, utils } from 'randomtools-js';
import tableText from '!array-loader!./tables/battle_entry_table.txt';
import ebutils from './ebutils.js';

import EnemyObject from './EnemyObject.js';

class BattleEntryObject extends TableObject {
    toString() {
        let str = `BATTLE ENTRY ${this.index.toString(16)}`;
        this.data.enemyActivities.forEach((enemyActivity, i) => {
            str += `\n\t${this.enemyActivity.activity} ${this.enemyAcitivity.enemy}`;
        });
        return str;
    }

    serialize() {
        return this.data.enemyActivities.map(ea => {
            return {activity: ea.activity, enemy: ea.enemy.oldName};
        });
    }

    get rank() {
        if(this._rank !== undefined) return this._rank;
        this._rank = Math.max(...this.data.enemyActivities.map(ea => ea.enemy.rank));
        return this.rank;
    }

    readData() {
        super.readData();
        let pointer = ebutils.ebToFilePointer(this.data.enemies_pointer);
        this.data.enemyActivities = [];
        while(true) {
            const activity = this.context.rom[pointer];
            if(activity === 0xFF) break;
            const enemyId = utils.readMulti(this.context.rom, pointer + 1, 2);
            this.data.enemyActivities.push({activity: activity, enemy: EnemyObject.get(enemyId)});
            pointer += 3;
        }

    }
}


BattleEntryObject.tableSpecs = {
    text: tableText,
    count: 484,
    pointer: 0x10c60d,
};

BattleEntryObject._displayName = "battle entry";
export default BattleEntryObject;