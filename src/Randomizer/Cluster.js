import exitsText from './tables/exits.txt';
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

    serialize(c) {
        const cellBounds = this.enemyCells.map(c => c.bounds);
        const exCellBounds = this.explicitEnemyCells.map(c => c.bounds);
        return c.specs.flags.t || {
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
            optional: this.optional,
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
        if(s.startsWith("##")) {
            return;
        }

        let donor = false;
        if(s.startsWith("#")) {
            donor = true;
            s = s.substring(1);
        }

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
        let candidates = MapEnemyObject.get(meid).mapEvents.filter(c => 
            c.isExit && c.globalX === x && c.globalY === y);
        if(candidates.length === 0) return;
        if(candidates.length !== 1) {
            throw new Error(`Incorrect candidates length: ${candidates.length}`);
        }
        const chosen = candidates[0].canonicalNeighbor;

        if(chosen.dialogueDoor) {
            return;
        }

        if(donor) {
            if(!chosen.hasMutualFriend) {
                return;
            }
            if(!Cluster.donorExits.map(exit => exit.friend.event.index).includes(chosen.friend.event.index)) {
                Cluster.donorExits.push(chosen);
            }
            return;
        }

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
        if(this.firstCell === undefined) {
            this.firstCell = meid;
        }
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
        if(this._index !== undefined) return this._index;
        if(this.exits.length === 0) return null;
        this._index = Math.min(...this.exits.map(x => x.pointer));
        return this.index;
    }

    static getByIndex(index) {
        return this.every.find(c => c.index === index);
    }

    static getByCell(meid) {
        return this.every.find(c => c.firstCell === meid);
    }

    get isRootStem() {
        return this.rootLeaves !== undefined && this.rootLeaves.length > 0;
    }

    get isRootLeaf() {
        return this.rootStem !== undefined;
    }

    static generateClusters() {
        if(this._allClusters !== undefined) return this._allClusters;
        let clu = new this();
        const allClusters = [];
        exitsText.forEach(line => {
            line = line.trim();
            if(line[0] === ':' || line.length === 0) {
                if(clu.exits.length > 0) {
                    allClusters.push(clu);
                    clu = new this();
                }
                if(line[0] === ':') clu.label = line.slice(1);
                return;
            }
            clu.addExit(line);
        });

        console.assert(allClusters.length === (new Set(allClusters.map(clu => clu.index))).size)
        this._allClusters = allClusters.sort((a, b) => a.index - b.index);

        Object.keys(this.rootData).forEach(key => {
            const stem = this.getByCell(Number.parseInt(key, 0x10));
            stem.rootLeaves = this.rootData[key].map(meid => this.getByCell(meid));
            stem.rootLeaves.forEach(rootLeaf => {
                rootLeaf.rootStem = stem;
            });
        });

        return this.generateClusters();
    }


    static get every() {
        return this.generateClusters();
    }
}

Cluster.donorExits = [];

Cluster.rootData = {
    "28e5": [0x2864, 0x2865],           // Monkey 1
    "2ae2": [0x2a60, 0x2a61],           // Monkey 2
    "2ce2": [0x2c60, 0x2c61],           // Monkey 3
    "2ceb": [0x2c68, 0x2c6a],           // Monkey 4
    "2cfe": [0x2c7c],                   // Monkey Room with Pencil
    "2efa": [0x2e78, 0x2e79],           // Monkey 5
    "30e3": [0x3060, 0x3061],           // Monkey 6
    "0044": [0x2a9a],                   // Dungeon Man from South Scaraba
    "0416": [0x0d87],                   // Central Onett from Seaside House
    "1bc7": [0x20c3],                   // Dalaam from Rabbit Cave
    "248a": [0x240c],                   // Winters Pencil
    "11c2": [0x0c5d],                   // PRV Pencil
    "2e64": [0x31e4],                   // Stonehenge Eraser
    "2549": [0x24c5],                   // Master Belch
    "4af4": [0x4a75],                   // Tiny Ruby
    "2a4b": [0x2b4f],                   // Topolla Theater
    "39f4": [0x3976],                   // Chaos Theater
    "294f": [0x29c4],                   // Fourside Museum
}

Cluster._displayName = "cluster";
export default Cluster;