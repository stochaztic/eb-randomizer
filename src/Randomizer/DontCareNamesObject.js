import { ReadWriteObject, utils } from 'randomtools-js';
import ebutils from './ebutils.js';
import { battleSpriteNames, enemyAdjectives, characterNames } from './RandomNames.js';

class DontCareNamesObject extends ReadWriteObject {
    static shouldRandomize() {
        return this.context.specs.flags.c >= 3; // Character stats
    }

    static initialize(context) {
        super.initialize(context);

        this.types.forEach((type, typeIndex) => {
            utils.range(this.number).forEach(entryIndex => {
                const offsetInEntry = this.size * entryIndex;
                const offset = (typeIndex * this.number * this.size) + offsetInEntry;
                const pointer = this.address + offset;
                const entry = new this({ pointer });
                entry.type = type;
                entry.readData();
            });
        });

        Object.freeze(this.every);
    }

    readData() {
        const bytes = this.context.rom.slice(this.pointer, this.pointer + this.constructor.size);
        const name = ebutils.listToText(bytes);
        this.oldData.name = name;
        this.data.name = name;
    }

    writeData() {
        console.assert(this.data.name.length <= this.type.maxSize);
        this.context.rom.set(ebutils.textToList(this.data.name, this.constructor.size), this.pointer);
    }

    writeToMemory(address) {
        return ebutils.textToList(this.data.name, this.constructor.size).flatMap((letter, i) => {
            const letterAddress = address + i;
            return [0xa9, letter, 0x8d, letterAddress % 256, Math.floor(letterAddress / 256)];
        });
    }
    
    static fullRandomize() {
        super.fullRandomize();

        // Create pool of possible names from various sources. Reduce to 20% of non-character-names.
        let pool = this.every.map(o => o.oldData.name);
        pool = pool.concat(enemyAdjectives.filter(t => t.length <= 6));
        pool = pool.concat(battleSpriteNames.flatMap(o => o.split(",")).filter(t => t.length <= 6));
        pool = this.context.random.sample(pool, pool.length / 5);
        pool = pool.concat(characterNames.filter(t => t.length <= 6));

        // Get 6-sized names
        const chosenSix = this.context.random.sample(pool, this.number * this.types.filter(x => x.maxSize === 6).length);
        
        // Get 5-sized names from reduced pool
        pool = pool.filter(o => o.length <= 5 && !chosenSix.includes(o));
        const chosenFive = this.context.random.sample(pool, this.number * this.types.filter(x => x.maxSize === 5).length);
        
        // Assign
        const chosens = chosenFive.concat(chosenSix);
        this.every.forEach((o, i) => o.data.name = chosens[i]);
    }

    static fullCleanup() {
        super.fullCleanup();
        if(this.context.specs.flags.u.skipNaming) {
            const bytes = [0xA9, 0x02, 0x00, 0x22, 0xBD, 0xFB, 0xC4]; // bytes we are overwriting and need to replace
            bytes.push(0x48, 0x08, 0xe2, 0x20);
            this.types.forEach(type => {
                const chosen = this.context.random.choice(this.every.filter(x => x.type === type));
                bytes.push(...chosen.writeToMemory(type.memoryAddress));
            });
            bytes.push(0x28, 0x68, 0x5c, 0xc0, 0xfa, 0xc1);
            const patch = ebutils.writeToFreespace(bytes, this.context, "skip naming stuff");

            this.context.rom.set([0x20, 0x8E, 0x00, 0x5c, ...ebutils.ccodeAddress(patch.snesAddress).slice(0,3)], 0x1F8FB);
        }
    }
}

DontCareNamesObject.number = 7;
DontCareNamesObject.size = 6;
DontCareNamesObject.address = 0x15F4CF;
DontCareNamesObject.types = [
    { name: "Ness",   maxSize: 5, memoryAddress: 0x99ce },
    { name: "Paula",  maxSize: 5, memoryAddress: 0x9a2d },
    { name: "Jeff",   maxSize: 5, memoryAddress: 0x9a8c },
    { name: "Poo",    maxSize: 5, memoryAddress: 0x9aeb },
    { name: "King",   maxSize: 6, memoryAddress: 0x9819 },
    { name: "Steak",  maxSize: 6, memoryAddress: 0x981f },
    { name: "Rockin", maxSize: 6, memoryAddress: 0x9829 },
];

DontCareNamesObject._displayName = "dont care names";
export default DontCareNamesObject;