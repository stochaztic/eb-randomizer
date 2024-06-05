import { TableObject } from 'randomtools-js';
import tableText from './tables/initial_stats_table.txt';
import ItemObject from './ItemObject.js';
import AncientCave from './AncientCave.js';

class InitialStatsObject extends TableObject {
    toString() {
        this.items.map(i => `${this.index.toString(16)} ${this.data.level} ${this.data.xp} ${this.data.money} ${this.data.unknown.toString(16)} `).join("\n");
    }

    get items() {
        return this.data.item_indexes.filter(i => i !== 0).map(i => ItemObject.get(i));
    }

    clearInventory() {
        this.data.item_indexes = Array(this.data.item_indexes.length).fill(0);
    }

    removeItem(item) {
        if(item instanceof ItemObject) {
            item = item.index;
        }
        let firstFound = this.data.item_indexes.findIndex(i => i === item);
        if(firstFound === -1) {
            throw new Error("Unable to removte item, not found.");
        }
        this.data.item_indexes.splice(firstFound, 1);
        this.data.item_indexes.push(0);
    }

    addItem(item) {
        if(item instanceof ItemObject) {
            item = item.index;
        }
        let firstEmpty = this.data.item_indexes.findIndex(i => i === 0);
        if(firstEmpty === -1) {
            throw new Error("Unable to add item, initial inventory full.");
        }
        this.data.item_indexes[firstEmpty] = item; 
    }

    cleanup() {
        if(this.context.specs.flags.a) {
            this.data.level = 1;
            this.data.xp = 0;
            if(this.index === 0) {
                this.data.money = 100;
                this.removeItem(0xB1); // atm card
                this.addItem(0xC4); // sound stone
                this.addItem(0x11); // cracked bat
            }
            if((this.index + 1) === AncientCave.firstCharacter()) {
                this.addItem(0xB1); // atm card
                this.addItem(0xC5); // exit mouse
            }
        }
        if(this.context.specs.flags.easymodo) {
            this.data.level = 99;
            this.addItem(0x01); // franklin badge
            this.addItem(0x3E); // star pendant
            if(this.index === 0) {
                this.data.money = 65000;
            }
        }
    }

    static shouldRandomize() {
        return this.context.specs.flags.c; // Character stats
    }
}

InitialStatsObject.tableSpecs = {
    text: tableText,
    count: 4,
    pointer: 0x15f5f5,
};

InitialStatsObject._displayName = "initial stats";
export default InitialStatsObject;