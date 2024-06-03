import tableText from './tables/map_enemy_table.txt';
import canonicalExitsText from './tables/meo_canonical_exits.txt';
import GridTableObject from './GridTableObject.js';
import MapEventObject from './MapEventObject.js';
import MapSpriteObject from './MapSpriteObject.js';
import MapMusicObject from './MapMusicObject.js';
import MapPaletteObject from './MapPaletteObject.js';
import EnemyPlaceObject from './EnemyPlaceObject.js';
import Area from './Area.js';

class MapEnemyObject extends GridTableObject {
    static shouldRandomize() {
        return this.context.specs.flags.a;
    }

    serialize() {
        return {
            "index": this.index,
            "bounds": this.bounds,
            "caveRank": this.caveRank,
            "canonicalExit": this.canonicalExit ? this.canonicalExit.index : null,
            "enemyGroup": this.enemyGroup.serialize(),
            "area": this.area.label,
        };
    }

    get area() {
        if(this._area === undefined) {
            Area.initialize();
        }
        return this._area;
    }

    set area(val) {
        this._area = val;
    }

    get neighbors() {
        const neighbors = [];
        for(let y = -1; y <= 1; y++) {
            for(let x = -1; x <= 1; x++) {
                const index = this.index + x + (y * this.constructor.columns);
                const n = this.constructor.get(index);
                if(n === undefined) continue;
                if(Math.abs(n.gridX - this.gridX) > 1) continue;
                if(n.area && this.area && n.area.label !== this.area.label) continue;
                neighbors.push(n);
            }
        }
        return neighbors;
    }

    get enemyAdjacent() {
        if(this._enemyAdjacent !== undefined) return this._enemyAdjacent;
        if(this.oldData.enemy_place_index > 0) {
            this._enemyAdjacent = true;
        }
        else {
            this._enemyAdjacent = this.neighbors.some(n => n.oldData.enemy_place_index > 0);
        }
        return this.enemyAdjacent;
    }

    get mapEvents() {
        if(this._mapEvents !== undefined) return this._mapEvents;
        this._mapEvents = MapEventObject.every.filter(me => me.enemyCell === this);
        return this.mapEvents;
    }

    get mapSprites() {
        if(this._mapSprites !== undefined) return this._mapSprites;
        this._mapSprites = MapSpriteObject.every.filter(ms => ms.enemyCell === this);
        return this.mapSprites;
    }

    get canonicalExit() {
        if(!this.constructor._prelearned_canonical_exits) {
            const exits = {};
            canonicalExitsText.forEach(line => {
                if(line.trim().length === 0) return;
                let [a, b] = line.trim().split(" ");
                a = parseInt(a, 0x10);
                if(b === "None") {
                    b = null;
                }
                else {
                    b = MapEventObject.get(parseInt(b, 0x10));
                }
                exits[a] = b;
            });
            this.constructor._prelearned_canonical_exits = exits;
        }
        return this.constructor._prelearned_canonical_exits[this.index];
    }

    get caveRank() {
        if(this._caveRank !== undefined) return this._caveRank;
        if(!this.canonicalExit || this.canonicalExit.caveRank === undefined) {
            this._caveRank = null;
        }
        else {
            this._caveRank = this.canonicalExit.caveRank;
        }
        return this.caveRank;
    }

    get caveLevel() {
        if(this._caveLevel !== undefined) return this._caveLevel;
        if(!this.canonicalExit || this.canonicalExit.caveLevel === undefined) {
            this._caveLevel = null;
        }
        else {
            this._caveLevel = this.canonicalExit.caveLevel;
        }
        return this.caveLevel;
    }

    get enemyGroup() {
        return EnemyPlaceObject.get(this.data.enemy_place_index);
    }

    get palette() {
        if(this._palette !== undefined) return this._palette;
        this._palette = MapPaletteObject.getByGrid(Math.floor(this.gridX / 4), Math.floor(this.gridY / 2));
        return this.palette;
    }

    get music() {
        if(this._music !== undefined) return this._music;
        this._music = MapMusicObject.getByGrid(Math.floor(this.gridX / 4), Math.floor(this.gridY / 2));
        return this.music;
    }

    caveSanitizeEvents() {
        throw new Error("Run sanitization on problematic_scripts instead.");
        /*
        for o in self.map_events + self.map_sprites:
            script = o.script
            if script is None:
                continue
            script.remove_exit_mouse_store()
            script.remove_encounters_off()
            script.remove_status_effects_off()
            script.remove_teleports()
            script.remove_party_changes()
            script.fix_hotels()
        */
    }

    randomize() {
        if(!EnemyPlaceObject.recreated) {
            this.context.hooks.message("Recreating enemy placement groups...");
            EnemyPlaceObject.recreate();
        }

        if(this.caveRank === null) {
            this.data.enemy_place_index = 0;
            return;
        }

        // Don't place enemy cells on top of doors (can cause softlock)
        if(this.canonicalExit.enemyCell === this) {
            this.data.enemy_place_index = 0;
            return;
        }

        if(this.constructor.problematicPlates.includes(this.index)) {
            this.data.enemy_place_index = 0;
            return;
        }

        if(!this.enemyAdjacent && this.context.random.random() > this.context.specs.randomDegree) {
            return;
        }

        if(this.context.random.random() > (0.105 * this.area.rate)) {
            this.data.enemy_place_index = 0;
            return;
        }

        if(this.oldData.enemy_place_index === 0 && this.mapSprites.length > 0) {
            return;
        }

        if(this.context.random.random() < 0.01) { // magic butterfly
            this.data.enemy_place_index = EnemyPlaceObject.validRankedPlacements[0].index;
            return;
        }
        const maxIndex = EnemyPlaceObject.validRankedPlacements.length - 1;
        let index = Math.round(maxIndex * (this.caveRank ** 1.5));
        index = Math.max(index, 1);

        let chosen = EnemyPlaceObject.validRankedPlacements[index];
        chosen = chosen.getSimilar();
        this.data.enemy_place_index = chosen.index;
    }

    cleanup() {
        if(this.context.specs.flags.easymodo) {
            this.data.enemy_place_index = 0;
        }
    }
}

MapEnemyObject.problematicPlates = [
    0x4413, // Twoson tunnel exit
    0x49c6, // Threed tunnel 1 exit
    0x49e5, // Threed tunnel 2 exit
    0x2b26, // Thunder & Storm drop spot
    0x138,  // Fake Electro Specter door
    0xd31,  // 1 off of Mondo Mole cave entrance
];

MapEnemyObject.rows = 160;
MapEnemyObject.columns = 128;

MapEnemyObject.tableSpecs = {
    text: tableText,
    count: 20480,
    pointer: 0x101880,
};

MapEnemyObject._displayName = "map enemy";
export default MapEnemyObject;