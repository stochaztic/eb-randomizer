import GridTableObject from './GridTableObject.js';

class ZoneTableObject extends GridTableObject {
    toString() {
        let str = `${this.constructor.displayName} ${this.index.toString(16)} 0x${this.pointer.toString(16)}`;
        this.objects.forEach(o => {
            str += `\n- ${o.toString()}`;
        });
        return str;
    }

    objPointers(zoneObject) {
        zoneObject = zoneObject || this.constructor.zoneObject;
        if(!zoneObject) {
            throw new Error("zoneObject undefined.");
        }
        if(this.pointer === 0) return [];
        return [...Array(this.data.num_objects).keys()].map(i => this.pointer + 2 + (zoneObject.totalSize * i));
    }

    get objects() {
        if(this._objects !== undefined) return this._objects;
        const objs = this.objPointers.map(p => this.zoneObject.getByPointer(p));
        this._objects = objs.filter(o => o && !(o.x === o.y === 0));
        return this.objects;
    }
}

ZoneTableObject.rows = 40;
ZoneTableObject.columns = 32;

export default ZoneTableObject;