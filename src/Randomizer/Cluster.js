/* eslint import/no-webpack-loader-syntax: off */
import exitsText from '!array-loader!./tables/exits.txt';
import MapEnemyObject from "./MapEnemyObject.js";
import MapEventObject from "./MapEventObject.js";

class Cluster {
    constructor() {
        this.exits = [];
        this.optional = false;
    }

    toString() {
        let str = `${this.constructor.displayName} ${this.index.toString(16)} - Rank ${this.rank || 0}}`
        this.exits.forEach(o => {
            str += `\n- ${o.doorDescription()}`
        })
        return str;
    }

    equals(other) {
        return this.index === other.index;
    }

    serialize() {
        const cellBounds = this.enemyCells.map(c => c.bounds);
        const exCellBounds = this.explicitEnemyCells.map(c => c.bounds);
        return {
            index: this.index,
            rank: this.rank,
            onShortestPath: this.onShortestPath,
            caveLevel: this.caveLevel,
            explicitBounds: {
                x1: Math.min(...exCellBounds.map(b => b.x1)),
                x2: Math.max(...exCellBounds.map(b => b.x2)),
                y1: Math.min(...exCellBounds.map(b => b.y1)),
                y2: Math.max(...exCellBounds.map(b => b.y2)),
            },
            areaBounds: {
                x1: Math.min(...cellBounds.map(b => b.x1)),
                x2: Math.max(...cellBounds.map(b => b.x2)),
                y1: Math.min(...cellBounds.map(b => b.y1)),
                y2: Math.max(...cellBounds.map(b => b.y2)),
            },
            doors: this.exits.map(d => d.serialize()),
        }
    }

    static findShortestPath(home, goal) {
        home = home || this.home; // 994827 -> 1005212
        goal = goal || this.goal; // 995464

        let leafs = [home];
        const shortestPaths = {};
        shortestPaths[home.index] = [];

        while(!shortestPaths[goal.index]) {
            const newLeafs = [];
            leafs.forEach(leaf => {
                const options = leaf.exits.map(x => leaf.getConnectedCluster(x));
                options.forEach(o => {
                    if(Object.keys(shortestPaths).includes(o.index.toString())) return;
                    const newPath = shortestPaths[leaf.index].slice();
                    newPath.push(leaf);
                    shortestPaths[o.index] = newPath;
                    newLeafs.push(o);
                })
            });
            leafs = newLeafs;
        }
        const result = shortestPaths[goal.index];
        result.push(goal);
        return result;
    }

    static markShortestPath() {
        const shortestPath = this.findShortestPath();
        shortestPath.forEach((c, i) => {
            c.onShortestPath = true;
            const c2 = shortestPath[i+1];
            if(!c2) return;
            const x = c.exits.find(x => c.getConnectedCluster(x) === c2);
            if(!x) throw new Error("Break in path???");
            x.onShortestPath = true;
        });
    }

    getConnectedCluster(x1) {
        const x2 = Cluster.assignDict[x1.index];
        return Cluster.getByExit(x2);
    }

    get area() {
        return this.exits[0].enemyCell.area;
    }

    get enemyCells() {
        return this.area.enemyCells;
    }

    get explicitEnemyCells() {
        return this.exits.map(x => x.enemyCell);
    }

    get mapSprites() {
        return this.area.mapSprites;
    }

    get hasBattleTrigger() {
        return this.mapSprites.some(ms => ms.hasBattleTrigger);
    }

    get rank() {
        return (this._rank !== undefined) ? this._rank : null;
    }

    set rank(val) {
        this._rank = val;
    }

    get onShortestPath() {
        return this._onShortestPath ? true : false;
    }

    set onShortestPath(val) {
        this._onShortestPath = val;
    }

    static get rankedClusters() {
        return this._allClusters.filter(c => c._rank !== undefined).sort((a,b) => a.rank - b.rank);
    }

    setRankRandom(rank, context) {
        let value = -1;
        while(Math.floor(rank + value) !== rank) {
            value = context.random.random();
        }
        this.rank = rank + value;
    }

    addExit(s) {
        if(s.startsWith(".")) {
            this.optional = true;
            s = s.substring(1);
        }

        let force = false;
        if(s.startsWith("!")) {
            force = true;
            s = s.substring(1);
        }

        let incoming = false;
        if(s.startsWith("(")) {
            incoming = true;
            s = s.substring(1);
        }

        let outgoing = false;
        if(s.startsWith(")")) {
            outgoing = true;
            s = s.substring(1);
        }

        let [meid, x, y] = s.split(" ").map(v => parseInt(v, 0x10));
        let candidates;
        if(!force) {
            candidates = MapEnemyObject.get(meid).mapEvents.filter(c => 
                c.isExit && c.hasMutualFriend && c.globalX === x && c.globalY === y);
        }
        else {
            candidates = MapEnemyObject.get(meid).mapEvents.filter(c => 
                c.isExit && c.globalX === x && c.globalY === y);
        }
        if(candidates.length === 0) return;
        if(candidates.length !== 1) {
            throw new Error(`Incorrect candidates length: ${candidates.length}`);
        }
        const chosen = candidates[0].canonicalNeighbor;
        let earlyExit = false;
        this.exits.forEach(x => {
            if(x.neighbors.includes(chosen)) {
                console.assert(chosen === x);
                earlyExit = true;
            }
        });
        if(earlyExit) return;

        chosen.force = force;
        chosen.incomingExit = incoming;
        chosen.outgoingExit = outgoing;

        this.exits.push(chosen);
        this.exits.sort((a,b) => a.pointer - b.pointer);
    }

    static assignExitPair(a, b) {
        if(this.assignDict === undefined) this.assignDict = {};
        console.assert(this.assignDict[a.index] === undefined);
        console.assert(this.assignDict[b.index] === undefined);
        console.assert(a.constructor === MapEventObject && a.isExit);
        console.assert(b.constructor === MapEventObject && b.isExit);
        this.assignDict[a.index] = b;
        this.assignDict[b.index] = a;
    }

    get unassignedExits() {
        if(this.constructor.assignDict === undefined) this.constructor.assignDict = {};
        const unassigned = [];
        this.exits.forEach(x => {
            const y = x.canonicalNeighbor;
            console.assert(y === y.canonicalNeighbor);
            if(Cluster.assignDict[y.index] === undefined && !unassigned.includes(y)) {
                unassigned.push(y);
            }
        })
        return unassigned;
    }

    get unassignedIncomingExits() {
        const unassigned = this.unassignedExits;
        const incoming = unassigned.filter(e => e.incomingExit);
        return incoming.length > 0 ? incoming : unassigned;
    }

    get unassignedOutgoingExits() {
        const unassigned = this.unassignedExits;
        const outgoing = unassigned.filter(e => e.outgoingExit);
        return outgoing.length > 0 ? outgoing : unassigned;
    }

    static rankClusters(context) {
        const home = this.home;
        let rank = 0;
        const ranked = new Set();
        const assignRank = u => {
            u.setRankRandom(rank, context);
            ranked.add(u);
        };
        assignRank(home);

        while(true) {
            const clusters = [...ranked].sort((a, b) => a.rank - b.rank);
            const exits = clusters.map(c => c.exits).reduce((acc, val) => acc.concat(val), []);

            let unranked = new Set();
            exits.forEach(x1 => {
                const x2 = this.assignDict[x1.index];
                if(x2 !== undefined) {
                    const c = this.getByExit(x2);
                    if(!ranked.has(c)) {
                        unranked.add(c);
                    }
                }
            });
            if(unranked.size === 0) {
                break;
            }
            rank += 1;
            unranked.forEach(assignRank);
            console.assert(unranked.size < ranked.size);
        }
        console.assert(ranked.has(this.goal));
    }

    findDistance(other) {
        const networked = new Set([this]);
        let newNetworked = new Set(networked);
        let counter = 0;
        while(!newNetworked.has(other)) {
            counter += 1;
            const temp = new Set();
            newNetworked.forEach(n => {
                n.exits.forEach(x1 => {
                    const x2 = Cluster.assignDict[x1.index];
                    const c = Cluster.getByExit(x2);
                    if(!networked.has(c)) {
                        networked.add(c);
                        temp.add(c);
                    }
                });
            });
            newNetworked = temp;
        }
        return counter;
    }

    static getByExit(exit) {
        if(this.exitDict === undefined) this.exitDict = {};
        if(this.exitDict[exit] !== undefined) return this.exitDict[exit];

        const clus = this.every.filter(clu => clu.exits.includes(exit));
        console.assert(clus.length <= 1);
        if(clus.length === 0) return null;
        this.exitDict[exit] = clus[0];
        return this.getByExit(exit);
    }

    static get home() {
        if(this._home) return this._home;
        const exits = MapEventObject.every.filter(me => me.isExit && me.globalY === 0x0450 && me.globalX === 0x1f20);
        console.assert(exits.length === 1);
        const chosen = this.every.filter(c => c.exits.includes(exits[0]));
        console.assert(chosen.length === 1);
        this._home = chosen[0];
        return this.home;
    }

    static get goal() {
        if(this._goal) return this._goal;
        const exits = MapEventObject.every.filter(me => me.isExit && me.globalY === 0x07f8 && me.globalX === 0x1088);
        console.assert(exits.length === 1);
        const chosen = this.every.filter(c => c.exits.includes(exits[0]));
        console.assert(chosen.length === 1);
        this._goal = chosen[0];
        return this.goal;
    }

    get index() {
        if(this.exits.length === 0) return null;
        return Math.min(...this.exits.map(x => x.pointer));
    }

    static generateClusters() {
        if(this._allClusters !== undefined) return this._allClusters;
        let clu = new this();
        const allClusters = [];
        exitsText.forEach(line => {
            line = line.trim();
            if(line[0] === '#') return;
            if(line[0] === ':' || line.length === 0) {
                if(clu.exits.length > 0) {
                    allClusters.push(clu);
                    clu = new this();
                }
                return;
            }
            clu.addExit(line);
        });

        console.assert(allClusters.length === (new Set(allClusters.map(clu => clu.index))).size)
        this._allClusters = allClusters.sort((a, b) => a.index - b.index);
        return this.generateClusters();
    }


    static get every() {
        return this.generateClusters();
    }
}

Cluster._displayName = "cluster";
export default Cluster;