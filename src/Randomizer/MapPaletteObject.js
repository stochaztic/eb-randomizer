import tableText from './tables/map_palette_table.txt';
import GridTableObject from './GridTableObject.js';

class MapPaletteObject extends GridTableObject {
}

MapPaletteObject.rows = 80;
MapPaletteObject.columns = 32;

MapPaletteObject.tableSpecs = {
    text: tableText,
    count: 2560,
    pointer: 0x17a800,
};

MapPaletteObject._displayName = "map palette";
export default MapPaletteObject;