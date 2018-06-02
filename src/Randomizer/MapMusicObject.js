/* eslint import/no-webpack-loader-syntax: off */
import tableText from '!array-loader!./tables/map_music_table.txt';
import GridTableObject from './GridTableObject.js';

class MapMusicObject extends GridTableObject {
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