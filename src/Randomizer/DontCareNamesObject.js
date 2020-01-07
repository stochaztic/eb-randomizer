import { ReadWriteObject, utils } from 'randomtools-js';
import ebutils from './ebutils.js';

class DontCareNamesObject extends ReadWriteObject {

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

    static fullCleanup() {
        super.fullCleanup();
        if(this.context.specs.flags.u.skipNaming) {
            const bytes = [0x48, 0x08, 0xe2, 0x20];
            this.types.forEach(type => {
                const chosen = this.context.random.choice(this.every.filter(x => x.type === type));
                bytes.push(...chosen.writeToMemory(type.memoryAddress));
            });
            bytes.push(0x28, 0x68, 0x5c, 0xc0, 0xfa, 0xc1);
            const patch = ebutils.writeToFreespace(bytes, this.context);

            this.context.rom.set([0x5c, ...ebutils.ccodeAddress(patch.snesAddress)], 0x1faae);
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