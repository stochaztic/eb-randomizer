/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/enemy_table.txt';
import ebutils from './ebutils.js';
import ItemObject from './ItemObject.js';

class EnemyObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.m; // Enemy stats
    }

    get name() {
        return ebutils.listToText(this.data.name_text);
    }

    set name(str) {
        this.data.name_text = ebutils.textToList(str, this.data.name_text.length);
    }

    get isBoss() {
        return this.data.boss_flag || this.data.death_sound;
    }

    get isNpc() {
        return !this.isBoss && this.data.out_of_battle_sprite === 0;
    }

    get intershuffleValid() {
        return !this.isBoss && !this.isNpc
    }

    get rank() {
        if(this._rank !== undefined) return this._rank;
        const byHp = EnemyObject.every.sort((a, b) => a.oldData.hp - b.oldData.hp);
        const byXp = EnemyObject.every.sort((a, b) => a.oldData.xp - b.oldData.xp);
        EnemyObject.every.forEach(e => {
            e._rank = Math.max(byHp.indexOf(e), byXp.indexOf(e));
        })
        return this.rank;
    }

    cleanup() {
        if(this.isBoss) {
            ["hp", "pp", "level", "offense", "defense", "speed", "guts",
            "iq", "weakness_fire", "weakness_freeze", "weakness_flash",
            "weakness_paralysis", "weakness_hypnosis"].forEach(attr => {
                this.data[attr] = Math.max(this.data[attr], this.oldData[attr]);
            });
        }

        if(this.context.specs.flags.a) {
            this.data.xp = Math.max(this.data.xp, 4);
        }

        if(this.context.specs.flags.easymodo) {
            this.data.hp = 1;
            this.data.pp = 1;
            this.data.offense = 1;
            this.data.speed = 1;
            this.data.iq = 1;
        }
    }
}

EnemyObject.mutateAttributes = {
    "hp": null,
    "pp": null,
    "xp": null,
    "money": null,
    "level": null,
    "offense": null,
    "defense": null,
    "speed": null,
    "guts": null,
    "iq": null,
    "miss_rate": null,
    "drop_frequency": null,
    "drop_item_index": ItemObject,
    "mirror_success_rate": null,
    //"max_call": null,
    "weakness_fire": null,
    "weakness_freeze": null,
    "weakness_flash": null,
    "weakness_paralysis": null,
    "weakness_hypnosis": null,
    "battle_palette": null,
};

EnemyObject.intershuffleAttributes = [
    "hp", "xp", "money", "level",
    "offense", "defense", "speed", "guts", "iq", "miss_rate",
    ["drop_item_index", "drop_frequency"], "status",
    "mirror_success_rate",
    "battle_palette",
];

EnemyObject.tableSpecs = {
    text: tableText,
    count: 231,
    pointer: 0x159589,
};

EnemyObject._displayName = "enemy";
export default EnemyObject;