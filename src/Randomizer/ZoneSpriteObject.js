import ZoneTableObject from './ZoneTableObject.js';
import MapSpriteObject from './MapSpriteObject.js';
import tableText from './tables/zone_event_table.txt';
import pointerText from './tables/zone_sprite_pointers.txt';


class ZoneSpriteObject extends ZoneTableObject {
}

ZoneSpriteObject.tableSpecs = {
    text: tableText,
    pointers: pointerText,
};

ZoneSpriteObject.zoneObject = MapSpriteObject;

ZoneSpriteObject._displayName = "zone sprite";
export default ZoneSpriteObject;