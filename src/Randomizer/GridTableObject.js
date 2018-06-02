import { TableObject } from 'randomtools-js';

class GridTableObject extends TableObject {
    static get height() {
        console.assert(this.maxRows % this.rows === 0);
        return this.maxRows / this.rows;
    }
    static get width() {
        console.assert(this.maxColumns % this.columns === 0);
        return this.maxColumns / this.columns;
    }

    get gridX() {
        return this.index % this.constructor.columns;
    }

    get gridY() {
        return Math.floor(this.index / this.constructor.columns);
    }

    get xBounds() {
        const x1 = this.constructor.cellSize * this.gridX * this.constructor.width;
        const x2 = this.constructor.cellSize * (this.gridX+1) * this.constructor.width;
        return {x1: x1, x2: x2};
    }

    get yBounds() {
        const y1 = this.constructor.cellSize * this.gridY * this.constructor.height;
        const y2 = this.constructor.cellSize * (this.gridY+1) * this.constructor.height;
        return {y1: y1, y2: y2};
    }

    get bounds() {
        return Object.assign({}, this.xBounds, this.yBounds);
    }

    get centerX() {
        const b = this.xBounds;
        return (b.x1 + b.x2) / 2;
    }

    get centerY() {
        const b = this.yBounds;
        return (b.y1 + b.y2) / 2;
    }

    contains(other, lenience = 0) {
        const b = this.bounds;
        b.x1 -= lenience;
        b.x2 += lenience;
        b.y1 -= lenience;
        b.y2 += lenience;

        if(other.x !== undefined && other.y !== undefined) {
            return(b.x1 <= other.x <= b.x2 && b.y1 <= other.y <= b.y2);
        }
        if(other.bounds !== undefined) other = other.bounds;
        return(b.x1 <= other.x1 <= other.x2 <= b.x2 && 
               b.y1 <= other.y1 <= other.y2 <= b.y2);
    }

    static getByGrid(x, y) {
        if(this._byGridCache === undefined) {
            this._byGridCache = {}
            this.every.forEach(o => {
                const key = `${o.gridX}x${o.gridY}`;
                //console.assert(!Object.keys(this._byGridCache).includes(key));
                this._byGridCache[key] = o;
            })
        }
        return this._byGridCache[`${x}x${y}`];
    }

    static getByCell(x, y) {
        x = x / this.width;
        y = y / this.height;
        return this.getByGrid(Math.floor(x), Math.floor(y));
    }

    static getByPixel(x, y) {
        x = x / (this.width * this.cellSize);
        y = y / (this.height * this.cellSize);
        return this.getByGrid(Math.floor(x), Math.floor(y));
    }
}

GridTableObject.maxRows = 320;
GridTableObject.maxColumns = 256;
GridTableObject.cellSize = 32;


export default GridTableObject;