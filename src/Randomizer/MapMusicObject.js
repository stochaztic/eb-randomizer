/* eslint import/no-webpack-loader-syntax: off */
import tableText from '!array-loader!./tables/map_music_table.txt';
import GridTableObject from './GridTableObject.js';
import MapEnemyObject from './MapEnemyObject.js';

class MapMusicObject extends GridTableObject {
    static shouldRandomize() {
        return this.context.specs.flags.w;
    }

    static get validMusics() {
        if(this._validMusics !== undefined) return this._validMusics;
        this._validMusics = new Set(this.every.map(m => m.oldData.music_index))
        return this.validMusics;
    }
    
    static mutateAll() {
        this.classReseed("mut");
        if(this.context.specs.flags.a) {
            // Ancient Cave mode
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
            // Non-Ancient Cave mode
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