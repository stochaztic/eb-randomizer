/* eslint import/no-webpack-loader-syntax: off */
import tableText from '!array-loader!./tables/map_music_table.txt';
import GridTableObject from './GridTableObject.js';
import MapEnemyObject from './MapEnemyObject.js';
import EnemyObject from './EnemyObject.js';
import MusicObject from './MusicObject.js';


class MapMusicObject extends GridTableObject {
    static shouldRandomize() {
        return this.context.specs.flags.w;
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
            const musics = Array.from(MusicObject.battleMusics);
            EnemyObject.every.forEach(e => e.data.music = this.context.random.choice(musics));
        }


        if(this.context.specs.flags.a) {
            // Map music shuffle - Ancient Cave mode
            const chosenMusics = MusicObject.ancientCaveMusics;

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

            const originalMusics = Array.from(MusicObject.overworldMusics);
            const chosenMusics = this.context.random.shuffle(Array.from(MusicObject.overworldMusics));
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