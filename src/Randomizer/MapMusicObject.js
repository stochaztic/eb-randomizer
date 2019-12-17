/* eslint import/no-webpack-loader-syntax: off */
import tableText from '!array-loader!./tables/map_music_table.txt';
import GridTableObject from './GridTableObject.js';
import MapEnemyObject from './MapEnemyObject.js';
import EnemyObject from './EnemyObject.js';

class MapMusicObject extends GridTableObject {
    static shouldRandomize() {
        return this.context.specs.flags.w;
    }

    static get validMusics() {
        if(this._validMusics !== undefined) return this._validMusics;
        this._validMusics = new Set([2, 3, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 76, 77, 78, 80, 81, 82, 83, 84, 86, 87, 90, 91, 92, 106, 107, 108, 112, 114, 116, 117, 118, 119, 120, 121, 122, 125, 128, 129, 130, 131, 132, 136, 140, 142, 144, 146, 147, 149, 150, 151, 152, 153, 154, 159, 169, 170, 171, 173, 178, 187, 188]);
        if(this.context.specs.flags.w >= 3) {
            EnemyObject.every.forEach(e => this._validMusics.add(e.oldData.music));
        }
        return this.validMusics;
    }

    static get battleMusics() {
        if(this._battleMusics !== undefined) return this._battleMusics;
        if(this.context.specs.flags.w >= 3) return this.validMusics;
        this._battleMusics = new Set(EnemyObject.every.map(e => e.oldData.music));
        return this.battleMusics;
    }

    static get clearFloorFlags() {
        return [...Array(9).keys()].map(caveLevelZeroIndex =>
            [0x05, this.flagBase + caveLevelZeroIndex, 0x03]
        );
    }
    
    static mutateAll() {
        this.classReseed("mut");
        if(this.context.specs.flags.w >= 2) {
            // Battle music shuffle
            const musics = Array.from(this.battleMusics);
            EnemyObject.every.forEach(e => e.data.music = this.context.random.choice(musics));
        }


        if(this.context.specs.flags.a) {
            // Map music shuffle - Ancient Cave mode
            const chosenMusics = this.context.random.sample(Array.from(this.validMusics), 9);
            MapEnemyObject.every.forEach(meo => {
                if(meo.caveLevel === null || meo.caveLevel === undefined) return;
                const mmo = meo.music;
                if(mmo.mutated) return;
                mmo.data.music_index = 2;
                mmo.mutated = true;
            });

            // Replace second entry in the overworld_event_music_table with our new music flag data
            const newMusicData = [];
            chosenMusics.forEach((chosenMusic, index) => {
                newMusicData.push(...[(this.flagBase + index), 0x83, chosenMusic, 0x00]);
            });

            newMusicData.push(...[0x00, 0x00, 156, 0x00]); // Meteor fall
            this.context.rom.set(newMusicData, 0xF5A3D);
        }
        else {
            // Map music shuffle - Non-Ancient Cave mode

            // Hack map music to not use lookup table
            this.context.rom.set([0x80, 0x6B], 0x6928);

            const originalMusics = Array.from(this.validMusics);
            const chosenMusics = this.context.random.shuffle(Array.from(this.validMusics));
            const assign = {};
            originalMusics.forEach((o, i) => assign[o] = chosenMusics[i]);

            this.every.forEach(mmo => {
                mmo.data.music_index = assign[mmo.oldData.music_index];
                mmo.mutated = true;
            });
        }
    }
}

MapMusicObject.flagBase = 0xE0; // 0x3e0

MapMusicObject.rows = 80;
MapMusicObject.columns = 32;

MapMusicObject.tableSpecs = {
    text: tableText,
    count: 2560,
    pointer: 0x1cd637,
};

MapMusicObject._displayName = "map music";
export default MapMusicObject;