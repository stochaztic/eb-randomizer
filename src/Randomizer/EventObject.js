/* eslint import/no-webpack-loader-syntax: off */
import tableText from '!array-loader!./tables/event_table.txt';
import pointerText from '!array-loader!./tables/event_pointers.txt';
import { TableObject } from 'randomtools-js';
import Script from './Script.js';
import ebutils from './ebutils.js';

class EventObject extends TableObject {
    toString() {
        return [this.pointer, this.data.event_call, this.data.event_flag, 
            this.data.x, this.data.y].map(i => i.toString(16)).join(" ");
    }

    get script() {
        if(this.data.event_call === 0) return null;
        if((this.data.event_call & 0xFFC00000) !== 0xC00000) return null;
        const pointer = ebutils.ebToFilePointer(this.data.event_call);
        return Script.getByPointer(pointer);
    }

    get x() {
        return this.data.x;
    }

    get y() {
        return this.data.y_facing & 0x3ff;
    }

    get globalX() {
        return this.x << 3;
    }

    get globalY() {
        return this.y << 3;
    }
}

EventObject.tableSpecs = {
    text: tableText,
    pointers: pointerText,
};

EventObject._displayName = "event";
export default EventObject;