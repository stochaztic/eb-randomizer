/* eslint import/no-webpack-loader-syntax: off */
import ZoneTableObject from './ZoneTableObject.js';
import MapEnemyObject from './MapEnemyObject.js';
import tableText from '!array-loader!./tables/zone_event_table.txt';
import pointerText from '!array-loader!./tables/zone_event_pointers.txt';
import MapEventObject from './MapEventObject.js';


class ZoneEventObject extends ZoneTableObject {
    get muspalSignature() {
        if(this._muspalSignature !== undefined) return this._muspalSignature;
        const bounds = this.bounds;
        const me = MapEnemyObject.getByPixel(bounds.x1, bounds.y1);
        this._muspalSignature = (me.palette.oldData.palette_index * 256) + me.music.oldData.music_index;
        return this._muspalSignature;
    }
}

ZoneEventObject.tableSpecs = {
    text: tableText,
    pointers: pointerText,
};

ZoneEventObject.zoneObject = MapEventObject;

ZoneEventObject._displayName = "zone event";
export default ZoneEventObject;