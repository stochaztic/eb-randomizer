import MapEnemyObject from './MapEnemyObject.js';
import ZoneEventObject from './ZoneEventObject.js';
import ZoneSpriteObject from './ZoneSpriteObject.js';
import MapEventObject from './MapEventObject.js';
import MapSpriteObject from './MapSpriteObject.js';

const ZonePositionMixin = Base => class extends Base {
    get zone() {
        if(this._zone !== undefined) return this._zone;
        let candidates;
        if(this.constructor === MapEventObject) {
            const e = ZoneEventObject.every;
            candidates = e.filter(z => z.objPointers(this.constructor).includes(this.pointer));
        }
        else if(this.constructor === MapSpriteObject) {
            candidates = ZoneSpriteObject.every.filter(z => z.objPointers(this.constructor).includes(this.pointer));
        }
        else {
            throw new Error(`Unknown ZonePosition type ${this.constructor.displayName}`);
        }
        console.assert(candidates.length === 1);
        this._zone = candidates[0];
        return this.zone;
    }

    get xBounds() {
        return {x1: this.globalX, x2: this.globalX};
    }

    get yBounds() {
        return {y1: this.globalY, y2: this.globalY};
    }

    get bounds() {
        return Object.assign({}, this.xBounds, this.yBounds);
    }
    
    get enemyCell() {
        if(this._enemyCell !== undefined) return this._enemyCell;
        this._enemyCell = MapEnemyObject.getByPixel(this.globalX, this.globalY);
        console.assert(this.zone.contains(this._enemyCell));
        return this.enemyCell;
    }
}

export default ZonePositionMixin;