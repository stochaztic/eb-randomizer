/* eslint import/no-webpack-loader-syntax: off */
import { TableObject, utils } from 'randomtools-js';
import tableText from '!array-loader!./tables/enemy_place_table.txt';
import ebutils from './ebutils.js';

import BattleEntryObject from './BattleEntryObject.js';

class EnemyPlaceObject extends TableObject {
    toString() {
        let str = "";
        this.data.subgroups.forEach(subgroup => {
            str += `ENEMY PLACEMENT ${this.index.toString(16)}-${"ab"[subgroup.subgroup]} ${subgroup.rate}/100`;
            subgroup.entries.forEach(entry => {
                str += `\n\t${entry.probability} ${entry.enemyEncounter.toString()}`;
            });
        });
        return str;
    }

    serialize() {
        if(this.index === 0) return null;
        return {
            "index": this.index,
            "flag": this.data.event_flag,
            "subgroups": this.data.subgroups.map(subgroup => {
                return {
                    "subgroup": subgroup.subgroup,
                    "rate": subgroup.rate,
                    "entries": !subgroup.entries ? null : subgroup.entries.map(entry => {
                        return {
                            "probability": entry.probability,
                            "enemyEncounter": entry.enemyEncounter.serialize()
                        }
                    })
                }
            })
        };
    }

    get rank() {
        if(this._rank !== undefined) return this._rank;
        if(this.index === 0) {
            this._rank = -1;
        }
        else if(this.data.subgroups[0].rate === 0 || this.data.subgroups[1].rate !== 0) {
            this._rank = -1;
        }
        else {
            this._rank = Math.max(...this.data.subgroups[0].entries.map(e => e.enemyEncounter.rank));
        }
        
        return this.rank;
    }

    static get validRankedPlacements() {
        if(this._validRankedPlacements !== undefined) return this._validRankedPlacements;
        this._validRankedPlacements = this.ranked.filter(epo => epo.rank > 0);
        return this.validRankedPlacements;
    }

    readData() {
        super.readData();
        let pointer = ebutils.ebToFilePointer(this.data.placement_group_pointer);
        this.data.event_flag = utils.readMulti(this.context.rom, pointer, 2);
        pointer += 2;
        const subgroups = [];
        subgroups.push({subgroup: 0, rate: this.context.rom[pointer]});
        pointer += 1;
        subgroups.push({subgroup: 1, rate: this.context.rom[pointer]});
        pointer += 1;
        subgroups.forEach(subgroup => {
            if(subgroup.rate === 0) return;
            subgroup.entries = [];
            while(subgroup.entries.map(e => e.probability).reduce((a,b)=>a+b, 0) < 8) {
                const entry = { probability: this.context.rom[pointer] };
                pointer += 1;
                const battleEntryIndex = utils.readMulti(this.context.rom, pointer, 2);
                pointer += 2;
                entry.enemyEncounter = BattleEntryObject.get(battleEntryIndex);
                subgroup.entries.push(entry);
            }
        });
        this.data.subgroups = subgroups;
    }

    writeData() {
        if(!this.constructor.recreated) {
            return;
        }
        if(this.constructor._writePointer === undefined) {
            this.constructor._writePointer = ebutils.ebToFilePointer(this.data.placement_group_pointer);
        }
        else {
            this.data.placement_group_pointer = ebutils.fileToEbPointer(this.constructor._writePointer);
        }

        utils.writeMulti(this.context.rom, this.constructor._writePointer, this.data.event_flag, 2);
        this.constructor._writePointer += 2;
        this.data.subgroups.forEach(subgroup => {
            this.context.rom[this.constructor._writePointer] = subgroup.rate;
            this.constructor._writePointer += 1;
        })
        this.data.subgroups.forEach(subgroup => {
            if(subgroup.rate === 0) return;
            if(subgroup.entries.map(e => e.probability).reduce((a,b)=>a+b, 0) < 8) {
                throw new Error("Invalid subgroup odds.");
            }
            subgroup.entries.forEach(entry => {
                this.context.rom[this.constructor._writePointer] = entry.probability;
                this.constructor._writePointer += 1;
                utils.writeMulti(this.context.rom, this.constructor._writePointer, entry.enemyEncounter.index, 2);
                this.constructor._writePointer += 2;
            });
        });
        if(this.constructor._writePointer > 0x10c60d) {
            throw new Error("EnemyPlaceObject data too long.");
        }
        super.writeData();
    }

    static recreate() {
        //All of the potential sets of enemies used in the existing placements
        const subgroups = [].concat(...EnemyPlaceObject.every.map(o => o.data.subgroups)).filter(o => o.rate > 0);
        const entries = [].concat(...subgroups.map(s => s.entries));
        let mobs = entries.map(e => e.enemyEncounter);
        mobs = new Set(mobs);
        mobs.delete(BattleEntryObject.get(0x0)); // Invalid 0th beo
        mobs = [...mobs];
        mobs.sort((a,b) => b.rank - a.rank); // Reverse sort

        const butterfly = mobs.pop();
        mobs = this.context.random.shuffleNormal(mobs, this.randomDegree || this.context.specs.randomDegree);
        const butterflyPlace = this.validRankedPlacements[0];

        this.every.forEach(place => {
            // Erase rank cache
            delete place._rank;
            // Save the 0-index object as it is the magical no-enemy object
            if(place.index === 0) return;
            // Save the Magic Butterfly alone object
            if(place === butterflyPlace) return;

            // Create a basic enemy placement. No flags, high chance of encounter, even odds of 4 enemies
            place.data.event_flag = 0
            place.data.subgroups[1].entries = [];
            place.data.subgroups[1].rate = 0;
            place.data.subgroups[0].entries = [];
            if(mobs.length === 0) {
                place.data.subgroups[0].rate = 0;
                return;
            }
            place.data.subgroups[0].rate = this.context.random.randint(50, 100);
            [...Array(4).keys()].forEach(i => {
                const entry = { probability: 2 };
                entry.enemyEncounter = mobs.length ? mobs.pop() : butterfly;
                place.data.subgroups[0].entries.push(entry);
            });
        });
        delete this._validRankedPlacements;
        this.recreated = true;
    }
}

EnemyPlaceObject.tableSpecs = {
    text: tableText,
    count: 203,
    pointer: 0x10b880,
};

EnemyPlaceObject._displayName = "enemy place";
export default EnemyPlaceObject;