/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/map_event_table.txt';
import pointerText from '!array-loader!./tables/map_event_pointers.txt';
import friendsText from '!array-loader!./tables/meo_friends.txt';
import ZonePositionMixin from './ZonePositionMixin.js';
import ZoneEventObject from './ZoneEventObject.js';
import EventObject from './EventObject.js';
import Cluster from './Cluster.js';

class MapEventObject extends ZonePositionMixin(TableObject) {
    toString() {
        return [this.enemyCell.index, this.globalX, this.globalY, this.data.event_type, 
                this.data.event_index].map(i => i.toString(16)).join(" ");
    }

    doorDescription() {
        if(!this.isExit) {
            return `Enemy Cell: ${this.enemyCell.index.toString(16)} Loc: (${this.globalX}, ${this.globalY}) NON-DOOR`;
        }
        return `Enemy Cell: ${this.enemyCell.index.toString(16)} Loc: (${this.globalX}, ${this.globalY}) Dest: (${this.newEvent.x * 8}, ${this.newEvent.y * 8})`;
    }

    serialize() {
        const result = {
            index: this.index,
            enemyCell: this.enemyCell.index,
            x: this.globalX,
            y: this.globalY,
            onShortestPath: this.onShortestPath ? true : false,
        }
        if(this.isExit) {
            result.xDestination = this.newEvent.x * 8;
            result.yDestination = this.newEvent.y * 8;
        }
        return result;
    }

    connectExit(other, override = false) {
        if(!override) {
            console.assert(!this.connected);
            if(other.connected) console.assert(other.connected === this);
        }

        if(other === this) {
            // Connecting the door to itself. We do this when the door goes unused in the maze.
            // Unless the door is a dialogue door, disable it by changing it to a non-door type.
            if(!this.dialogueDoor) {
                this.neighbors.forEach(x => { x.data.event_type = 5; });
            }
        }
        else {
            if(other.hasMutualFriend) {
                // The door that we want to connect to, in the vanilla game, has a door that normally
                // leads to it (a 'friend'). We will steal that door's event for this door.
                const friend = other.friend;
                friend.event.data.event_flag = 0;
                this.neighbors.forEach(x => { x.data.event_index = friend.oldData.event_index });
            }
            else {
                // The door that we want to connect to, in the vanilla game, has no door that normally
                // leads to it. We will steal a door-event from the pool of donor exits and reconfigure it.
                console.assert(Cluster.donorExits.length > 0);
                let donor = Cluster.donorExits.pop();
                donor = donor.friend;
                console.assert(!donor.isDonated);
                console.assert(!donor.event.isDonated);
                donor.isDonated = true;
                donor.event.isDonated = true;
                donor.event.data.x = other.globalX >> 3;
                donor.event.data.y_facing = other.globalY >> 3;
                this.neighbors.forEach(x => { x.data.event_index = donor.oldData.event_index });
            }
        }

        this.neighbors.forEach(x => { x.connected = other });
    }

    static dialogueDoors() {
        if(this._dialogueDoors !== undefined) return this._dialogueDoors;
        this._dialogueDoors = MapEventObject.allExits.filter(x => x.event.data.event_flag === 0x8154);
        return this.dialogueDoors;
    }

    get dialogueDoor() {
        return this.event.data.event_flag === 0x8154 && this.index !== 0x106; // Special case: Dungeon Man front exit
    }

    get event() {
        if(this._event !== undefined) return this._event;
        this._event = EventObject.getByPointer(0xF0000 | this.oldData.event_index);
        return this.event;
    }

    get newEvent() {
        return EventObject.getByPointer(0xF0000 | this.data.event_index);
    }

    get script() {
        return this.event ? this.event.script : null;
    }

    get destinationZone() {
        if(this._destinationZone !== undefined) return this._destinationZone;
        this._destinationZone = ZoneEventObject.getByPixel(this.event.globalX, this.event.globalY);
        return this.destinationZone;
    }

    get friend() {
        if(this.constructor._prelearned_friends === undefined) {
            const friends = {};
            friendsText.forEach(line => {
                if(line.trim().length === 0) return;
                line = line.trim();
                if(line.startsWith("#")) return;
                let [a, b] = line.trim().split(" ");
                a = parseInt(a, 0x10);
                if(b === "None") {
                    b = null;
                }
                else {
                    b = MapEventObject.get(parseInt(b, 0x10));
                }
                friends[a] = b;
            });
            this.constructor._prelearned_friends = friends;
        }
        return this.constructor._prelearned_friends[this.index];
    }

    getDistance(x, y) {
        return Math.abs(this.globalX - x) + Math.abs(this.globalY - y);
    }

    get neighbors() {
        if(this._neighbors !== undefined) return this._neighbors;
        this._neighbors = MapEventObject.allExits.filter(me => {
            return me.oldData.event_index === this.oldData.event_index
                && me.zone.muspalSignature === this.zone.muspalSignature
                && this.getDistance(me.globalX, me.globalY) <= 250;
        });
        console.assert(!this._neighbors.includes(null));
        console.assert(this._neighbors.includes(this));
        return this.neighbors;
    }

    get canonicalNeighbor() {
        if(this._canonicalNeighbor !== undefined) return this._canonicalNeighbor;
        this._canonicalNeighbor = this.neighbors.sort((a,b) => a.index - b.index)[0];
        return this.canonicalNeighbor;
    }

    get hasMutualFriend() {
        if(this._hasMutualFriend !== undefined) return this._hasMutualFriend;
        this._hasMutualFriend = this.friend && this.neighbors.includes(this.friend.friend);
        return this.hasMutualFriend;
    }

    get isExit() {
        return this.data.event_type === 2;
    }

    static get allExits() {
        if(this._allExits !== undefined) return this._allExits;
        this._allExits = this.every.filter(meo => meo.isExit);
        return this.allExits;
    }

    static get mutualExits() {
        if(this._mutualExits !== undefined) return this._mutualExits;
        this._mutualExits = this.allExits.filter(meo => meo.hasMutualFriend);
        return this.mutualExits;
    }

    get cluster() {
        return Cluster.getByExit(this);
    }

    get caveRank() {
        if(this._caveRank !== undefined) return this._caveRank;
        const cluster = Cluster.getByExit(this);
        if(cluster && cluster.rank !== null) {
            const maxRank = Math.max(...Cluster.every.map(c => c.rank).filter(n =>!!n));
            this._caveRank = cluster.rank / maxRank;
        }
        else {
            this._caveRank = null;
        }
        return this._caveRank;
    }

    get globalX() {
        const b = this.zone.xBounds;
        const x = b.x1 + (this.data.x * 8);
        console.assert(b.x1 <= x <= b.x2);
        return x;
    }
    
    get globalY() {
        const b = this.zone.yBounds;
        const y = b.y1 + (this.data.y * 8);
        console.assert(b.y1 <= y <= b.y2);
        return y;
    }
}


MapEventObject.tableSpecs = {
    text: tableText,
    pointers: pointerText,
};

MapEventObject._displayName = "map event";
export default MapEventObject;