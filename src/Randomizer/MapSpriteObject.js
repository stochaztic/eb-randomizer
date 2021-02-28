/* eslint import/no-webpack-loader-syntax: off */
import tableText from '!array-loader!./tables/map_sprite_table.txt';
import pointerText from '!array-loader!./tables/map_sprite_pointers.txt';
import Cluster from './Cluster.js';
import ebutils from './ebutils.js';
import TPTObject from './TPTObject.js';
import ItemObject from './ItemObject.js';
import MapEventObject from './MapEventObject.js';
import MapEnemyObject from './MapEnemyObject.js';
import ZoneSpriteObject from './ZoneSpriteObject.js';
import { TableObject } from 'randomtools-js';

class MapSpriteObject extends TableObject {
    toString() {
        return [this.data.x, this.data.y, this.pointer, this.data.tpt_number].map(i => i.toString(16)).join(" ");
    }

    static shouldRandomize() {
        return this.context.specs.flags.g; // Gift box contents
    }

    serialize() {
        const result = {
            index: this.index,
            x: this.globalX,
            y: this.globalY,
        }
        if(this.context.specs.flags.a) {
            result.caveRank = this.caveRank;
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
    
    get zone() {
        if(this._zone !== undefined) return this._zone;
        const candidates = ZoneSpriteObject.every.filter(z => z.objPointers(this.constructor).includes(this.pointer));
        console.assert(candidates.length === 1);
        this._zone = candidates[0];
        return this.zone;
    }

    get xBounds() {
        return {x1: this.globalX, x2: this.globalX};
    }

    get yBounds() {
        return {y1: this.globalY, y2: this.globalY};
    }

    get bounds() {
        return Object.assign({}, this.xBounds, this.yBounds);
    }
    
    get enemyCell() {
        if(this._enemyCell !== undefined) return this._enemyCell;
        this._enemyCell = MapEnemyObject.getByPixel(this.globalX, this.globalY);
        console.assert(this.zone.contains(this._enemyCell));
        return this.enemyCell;
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
        return this.tpt && this.tpt.isChest;
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

    fillWithItem(newItem, cannotBeReplaced = false) {
        if(cannotBeReplaced || !this.context.specs.flags.z.cashChests) {
            this.tpt.data.argument = newItem.index ? newItem.index : newItem;
            return;
        }
        if(this.caveRank) {
            this.setMoneyValue(this.caveRank * this.context.random.randint(100, 3000));
            return;
        }
        this.setMoneyValue(this.context.random.randint(3, 2000));
    }
    
    setMoneyValue(amount) {
        this.tpt.data.argument = Math.floor(amount) + 0x100;
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
            chest.setMoneyValue(0);
            chest.mutated = true;
        })

        // 1) Place skip-granting items early in the cave
        const earlyItemsIndex = ItemObject.skipItemsIndex;

        let earlyChests = this.unassignedChests.sort((a, b) => a.caveRank - b.caveRank);
        earlyChests = earlyChests.slice(0, Math.floor(earlyChests.length / 3 * 2));
        let chosen = this.context.random.sample(earlyChests, earlyItemsIndex.length);
        chosen.forEach((chest, i) => {
            chest.fillWithItem(earlyItemsIndex[i], true);
            chest.mutated = true;
        });

        // 2) Fill up to 60% of remaining chests with equipment
        const equipmentOnce = ItemObject.ranked.filter(i => i.rank >= 0 && i.isEquipment);
        const uniqueEquipmentOnce = [];
        equipmentOnce.forEach(i => {
            if(Math.min(...equipmentOnce.filter(j => j.name === i.name).map(j => j.oldData.price)) === i.oldData.price) {
                uniqueEquipmentOnce.push(i);
            }
        });
        
        let equipment = [];
        uniqueEquipmentOnce.forEach(item => {
            equipment.push(item);
            if(!item.limitOne && !item.isWeapon) {
                equipment.push(item);
                equipment.push(item);
            }
        });
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
            const cannotBeReplaced = (newItem === franklinBadge || newItem === autoStarMaster);
            chest.fillWithItem(newItem.index, cannotBeReplaced);
            chest.mutated = true;
        })
        
        // 3) Fill remaining chests - candidates are non-equipment, non-key-item, non-condiment, non-broken
        let candidates = ItemObject.ranked.filter(i => 
            i.rank >= 0
            && !i.isEquipment 
            && !i.isKeyItem 
            && !i.isCondiment
            && !i.isBroken
            && !i.isUnpooledItem
        );
        candidates = this.context.random.shuffleNormal(candidates, this.randomDegree || this.context.specs.randomDegree);
        chests = this.unassignedChests.sort((a, b) => a.caveRank - b.caveRank);
        chests.forEach((chest, i) => {
            const index = Math.round(i / chests.length * (candidates.length-1));
            const newItem = candidates[index];
            chest.fillWithItem(newItem.index);
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
        this.fillWithItem(i.index);
    }
    
    cleanup() {
        if(this.context.specs.flags.z.randomDrops) {
            if(this.isChest) {
                // Only leave key items in non-AC mode
                if(this.context.specs.flags.a || !this.chestContents) {
                    this.setMoneyValue(0);
                }
            }
        }
    }
}

MapSpriteObject.tableSpecs = {
    text: tableText,
    pointers: pointerText,
};

MapSpriteObject._displayName = "map sprite";
export default MapSpriteObject;