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
        this._validMusics = new Set(this.every.map(m => m.oldData.music_index))
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
                mmo.data.music_index = chosenMusics[meo.caveLevel];
                mmo.mutated = true;
            });
        }
        else {
            // Map music shuffle - Non-Ancient Cave mode
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

MapMusicObject.rows = 80;
MapMusicObject.columns = 32;

MapMusicObject.tableSpecs = {
    text: tableText,
    count: 2560,
    pointer: 0x1cd637,
};

MapMusicObject._displayName = "map music";
export default MapMusicObject;