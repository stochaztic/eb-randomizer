/* eslint import/no-webpack-loader-syntax: off */
import areasText from '!array-loader!./tables/areas.txt';
import MapEnemyObject from './MapEnemyObject.js';
import MapEventObject from './MapEventObject.js';
import MapSpriteObject from './MapSpriteObject.js';

class Area {
    constructor(label, cells) {
        this.label = label;
        this.cells = cells.sort();
        this.enemyCells.forEach(ec => ec.area = this);
    }

    get enemyCells() {
        if(this._enemyCells !== undefined) return this._enemyCells;
        this._enemyCells = MapEnemyObject.every.filter(m => this.cells.includes(m.index));
        return this.enemyCells;
    }

    get mapEvents() {
        if(this._mapEvents !== undefined) return this._mapEvents;
        this._mapEvents = MapEventObject.every.filter(me => this.enemyCells.includes(me.enemyCell));
        return this.mapEvents;
    }

    get mapSprites() {
        if(this._mapSprites !== undefined) return this._mapSprites;
        this._mapSprites = MapSpriteObject.every.filter(ms => this.enemyCells.includes(ms.enemyCell));
        return this.mapSprites;
    }

    static get allAreas() {
        if(this._allAreas !== undefined) return this._allAreas;
        this.initialize();
        return this.allAreas;
    }

    static initialize() {
        const allAreas = [];
        const newArea = function() { return {label: "unknown", cells: new Set()}};
        let currentArea = newArea();
        
        areasText.forEach(line => {
            if(line.trim().length === 0 || line.startsWith(':')) {
                if(currentArea.cells.size > 0) {
                    allAreas.push(currentArea);
                }
                currentArea = newArea();
                if(line.startsWith(':')) {
                    currentArea.label = line.substring(1)
                }
                return;
            };
            const newCells = new Set();
            line.split(" ").forEach(word => {
                if(word.trim() !== "....") newCells.add(parseInt(word.trim(), 0x10));
            });
            newCells.forEach(c => {
                currentArea.cells.add(c);
                [0x80,1,0x81,2,0x82,3,0x83].forEach(v => currentArea.cells.add(c | v));
            });
        });

        this._allAreas = allAreas.map(rawArea => {
            const arr = [...rawArea.cells].sort();
            return new this(
                `${Math.min(...arr).toString(16)} ${rawArea.label}`,
                arr
            );
        });
    }
}

Area._displayName = "area";
export default Area;