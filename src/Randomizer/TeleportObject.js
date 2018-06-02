/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/teleport_table.txt';

class TeleportObject extends TableObject {
    cleanup() {
        if(this.context.specs.flags.a) {
            if(this.index === 0x02) { // Fourside hotel
                this.data.x = 748;
                this.data.y = 764;
            }
            if(this.index === 0x0B) { // Onett hotel
                this.data.x = 1004;
                this.data.y = 188;
            }
            if(this.index === 0x11) { // Threed hotel
                this.data.x = 842;
                this.data.y = 1164;
            }
            if(this.index === 0x13) { // Twoson hotel
                this.data.x = 948;
                this.data.y = 908;
            }
            if(this.index === 0x27) { // Happy Happy hotel
                this.data.x = 879;
                this.data.y = 206;
            }
            if(this.index === 0x32) { // Tenda hotel
                this.data.x = 55;
                this.data.y = 18;
            }
            if(this.index === 0x0E) { // Summers hotel
                this.data.x = 838;
                this.data.y = 1182;
            }
            if(this.index === 0xA2) { // Moonside hotel
                this.data.x = 817;
                this.data.y = 733;
            }
            if(this.index === 0xC4) { // Ness's house
                this.data.x = 954;
                this.data.y = 45;
            }
            if(this.index === 0xE8) { // Moonside skipping chests
                this.data.x = TeleportObject.get(0x70).x;
                this.data.y = TeleportObject.get(0x70).y;
            }
            if(this.index === 0xE9) { // Unused value - for testing
                this.data.x = 492;
                this.data.y = 1210;
            }
        }
    }
}

TeleportObject.tableSpecs = {
    text: tableText,
    count: 234,
    pointer: 0x15ebab,
};

TeleportObject._displayName = "teleport";
export default TeleportObject;