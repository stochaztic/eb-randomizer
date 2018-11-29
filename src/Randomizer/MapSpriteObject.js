/* eslint import/no-webpack-loader-syntax: off */
import tableText from '!array-loader!./tables/map_sprite_table.txt';
import pointerText from '!array-loader!./tables/map_sprite_pointers.txt';
import Cluster from './Cluster.js';
import ebutils from './ebutils.js';
import TPTObject from './TPTObject.js';
import ItemObject from './ItemObject.js';
import MapEventObject from './MapEventObject.js';
import { TableObject } from 'randomtools-js';

import ZonePositionMixin from './ZonePositionMixin.js';

class MapSpriteObject extends ZonePositionMixin(TableObject) {
    toString() {
        return [this.data.x, this.data.y, this.pointer, this.data.tpt_number].map(i => i.toString(16)).join(" ");
    }

    static shouldRandomize() {
        return this.context.specs.flags.g; // Gift box contents
    }

    serialize() {
        const result = {
            index: this.index,
            caveRank: this.caveRank,
            x: this.globalX,
            y: this.globalY,
        }
        if(this.isMoney) {
            result.money = this.moneyValue;
        }
        if(this.isChest && !this.isMoney) {
            let i = this.chestContents;
            result.name = i.name;
            result.isEquipment = i.isEquipment;
            result.itemType = i.data.item_type;
        }
        if(this.isSanctuaryBoss) {
            const other = MapSpriteObject.every.filter(m => m.oldData.tpt_number === this.data.tpt_number);
            console.assert(other.length === 1);
            result.bossIndex = ebutils.SANCTUARY_BOSS_INDEXES.indexOf(other[0].index);
            result.enemyEncounters = this.script.enemyEncounters.map(ee => ee.serialize());
        }
        return result;
    }

    static get unassignedChests() {
        return this.every.filter(o => o.isChest && o.caveRank !== null && !o.mutated);
    }

    get tpt() {
        return TPTObject.get(this.data.tpt_number);
    }

    get script() {
        return this.tpt.script;
    }

    setScript(other) {
        console.assert(other.constructor === MapSpriteObject);
        this.data.tpt_number = other.oldData.tpt_number;
    }

    get hasBattleTrigger() {
        return this.script && this.script.hasBattleTrigger;
    }

    get isChest() {
        return this.tpt.isChest;
    }

    get isMoney() {
        return this.isChest && ((this.tpt.data.argument & 0xFF00) >= 0x100);
    }

    get moneyValue() {
        return this.isChest ? this.tpt.data.argument - 0x100 : null;
    }

    get chestContents() {
        if(!this.isChest) return null;
        if(this.isMoney) return `MONEY: ${this.moneyValue}`;
        return ItemObject.get(this.tpt.data.argument);
    }

    get isShop() {
        return this.tpt.isShop;
    }

    get shopFlag() {
        if(!this.isShop) return null;
        const shopFlags = this.script.shopFlags;
        if(!shopFlags || shopFlags.length !== 1) return null;
        return shopFlags[0];
    }

    get globalX() {
        const b = this.zone.xBounds;
        const x = b.x1 + this.data.x;
        console.assert(b.x1 <= x <= b.x2);
        return x;
    }
    
    get globalY() {
        const b = this.zone.yBounds;
        const y = b.y1 + this.data.y;
        console.assert(b.y1 <= y <= b.y2);
        return y;
    }

    get caveRank() {
        return this.enemyCell.caveRank;
    }

    get isSanctuaryBoss() {
        return ebutils.SANCTUARY_BOSS_INDEXES.includes(this.index);
    }

    get nearestExit() {
        if(this._nearestExit !== undefined) return this._nearestExit;
        const dist = x => {
            return (((x.globalX - this.globalX)**2) +
            ((x.globalY - this.globalY)**2));
        };
        const candidates = MapEventObject.allExits.filter(meo => meo.enemyCell.area === this.enemyCell.area);
        const sortedExits = candidates.sort((a, b) => dist(a) - dist(b));
        this._nearestExit = sortedExits[0].canonicalNeighbor;
        return this.nearestExit;
    }

    get nearestCluster() {
        if(this._nearestCluster !== undefined) return this._nearestCluster;
        this._nearestCluster = Cluster.every.find(c => c.exits.includes(this.nearestExit));
        return this.nearestCluster;
    }

    replaceItem(oldItem, newItem) {
        console.assert(this.chestContents === oldItem);
        this.tpt.data.argument = newItem.index;
    }

    static mutateAll() {
        if(!this.context.specs.flags.a) {
            super.mutateAll();
            return;
        }
        this.classReseed("mut");
        
        // 0) Set non-in-cave chests to empty, for spoiler clarity
        // Also set chests that are unreachable to be empty
        let inaccessibleChests = this.every.filter(o => o.isChest && o.caveRank === null && !o.mutated);
        inaccessibleChests.push(this.get(182), this.get(135)); // Dungeon man
        inaccessibleChests.forEach(chest => {
            chest.tpt.data.argument = 0x100;
            chest.mutated = true;
        })

        // 1) Place skip-granting items early in the cave
        const earlyItemsIndex = [
            0x7d,   // Backstage pass
            0xa6,   // King banana
            0xb8,   // Pencil eraser
            0xd2,   // Eraser eraser
            0xfd,   // Carrot key
        ];

        let earlyChests = this.unassignedChests.sort((a, b) => a.caveRank - b.caveRank);
        earlyChests = earlyChests.slice(0, Math.floor(earlyChests.length / 3 * 2));
        let chosen = this.context.random.sample(earlyChests, earlyItemsIndex.length);
        chosen.forEach((chest, i) => {
            chest.tpt.data.argument = earlyItemsIndex[i];
            chest.mutated = true;
        });

        // 2) Fill up to 60% of remaining chests with equipment
        const equipmentOnce = ItemObject.ranked.filter(i => i.rank >= 0 && i.isEquipment);
        let equipment = [];
        equipmentOnce.forEach(item => {
            equipment.push(item);
            if(!item.limitOne && !item.isWeapon) {
                equipment.push(item);
                equipment.push(item);
            }
        })
        const franklinBadge = ItemObject.get(0x01);
        equipment.splice(Math.round(equipment.length * 0.3), 0, franklinBadge);
        equipment.splice(Math.round(equipment.length * 0.7), 0, franklinBadge);
        const autoStarMaster = ItemObject.get(0xb3);
        equipment.splice(Math.round(equipment.length * 0.4), 0, autoStarMaster);
        equipment.splice(Math.round(equipment.length * 0.8), 0, autoStarMaster);

        const crackedBatIndex = equipment.indexOf(ItemObject.get(17));
        equipment.splice(crackedBatIndex, 1);

        let chests = this.unassignedChests;
        const reducedEquipmentCount = Math.round(chests.length * 0.6);
        if(reducedEquipmentCount < equipment.length) {
            const reducedEquipmentIndexes = this.context.random.sample([...Array(equipment.length).keys()], reducedEquipmentCount);
            equipment = equipment.filter((e, i) => reducedEquipmentIndexes.includes(i));
        }

        chosen = this.context.random.sample(chests, equipment.length).sort((a, b) => a.caveRank - b.caveRank);
        equipment = this.context.random.shuffleNormal(equipment, this.randomDegree || this.context.specs.randomDegree);
        chosen.forEach((chest, i) => {
            const newItem = equipment[i];
            chest.tpt.data.argument = newItem.index;
            chest.mutated = true;
        })
        
        // 3) Fill remaining chests - candidates are non-equipment, non-key-item, non-condiment, non-broken
        let candidates = ItemObject.ranked.filter(i => 
            i.rank >= 0
            && !i.isEquipment 
            && !i.isKeyItem 
            && !i.isCondiment
            && !i.isBroken
            && i.name !== "Ruler"       // Remove non-consumable items by default carried by Jeff
            && i.name !== "Protractor"
            && i.name !== "Show ticket" // Can be bought in the same room it is used
        );
        candidates = this.context.random.shuffleNormal(candidates, this.randomDegree || this.context.specs.randomDegree);
        chests = this.unassignedChests.sort((a, b) => a.caveRank - b.caveRank);
        chests.forEach((chest, i) => {
            const index = Math.round(i / chests.length * (candidates.length-1));
            const newItem = candidates[index];
            chest.tpt.data.argument = newItem.index;
            chest.mutated = true;
        });
        super.mutateAll();
    }

    mutate() {
        if(!this.isChest) return;
        if(this.context.specs.flags.a) return;
        let i = this.chestContents;
        if(i.isKeyItem) return; // Carrot key
        if(this.isMoney) {
            i = ItemObject.get(0x5a); // Hamburger
        }
        if(this.context.specs.flags.g >= 2 || this.context.random.random() < 0.2) {
            i = this.context.random.choice(ItemObject.every.filter(o => !o.isKeyItem));
        }
        else {
            i = i.getSimilar();
        }
        console.assert(this.tpt.data.argument === this.tpt.oldData.argument);
        this.tpt.data.argument = i.index;
    }
}

MapSpriteObject.tableSpecs = {
    text: tableText,
    pointers: pointerText,
};

MapSpriteObject._displayName = "map sprite";
export default MapSpriteObject;