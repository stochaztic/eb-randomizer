import { TableObject } from 'randomtools-js';
import tableText from './tables/shop_table.txt';

import ItemObject from './ItemObject.js';

class ShopObject extends TableObject {
    toString() {
        let str = `SHOP ${this.index.toString(16)}`;
        str += this.items.map(i => `\n\t${i.data.price} - ${i.name}`).join("");
        return str;
    }
    static shouldRandomize() {
        return this.context.specs.flags.s;
    }

    get items() {
        return this.data.item_ids.filter(i => i !== 0).map(i => ItemObject.get(i));
    }

    get sisterShops() {
        let sisters = [];
        this.data.item_ids.filter(i => i !== 0).forEach(i => {
            sisters.push(...ShopObject.every.filter(s => s.data.item_ids.includes(i)));
        });
        sisters = [...new Set(sisters)];
        return sisters.sort((a, b) => a.rank-b.rank);
    }

    get sisterWares() {
        let wares = [];
        this.sisterShops.forEach(s => {
            wares.push(...s.data.item_ids.filter(i => i !== 0))
        })
        wares = [...new Set(wares)];
        return wares.sort((a, b) => a.rank-b.rank);
    }

    get rank() {
        if(this._rank !== undefined) return this._rank;
        this._rank = Math.max(...this.items.map(i => i.oldData.price));
        return this.rank;
    }

    mutate() {
        const wares = this.sisterWares;
        if(wares.length <= 7) {
            while(wares.length < 7) {
                wares.push(0);
            }
            this.data.item_ids = wares;
            return;
        }
        const chosen = this.context.random.sample(wares, 7).sort();
        this.data.item_ids = chosen;
        console.assert(!this.data.item_ids.includes(0))
    }

    cleanup() {
        if(this.context.specs.flags.z.randomDrops) {
            this.data.item_ids =[206,0,0,0,0,0,0];
        }
    }
}

ShopObject.tableSpecs = {
    text: tableText,
    count: 65,
    pointer: 0x1576b9,
};

ShopObject._displayName = "shop";
export default ShopObject;