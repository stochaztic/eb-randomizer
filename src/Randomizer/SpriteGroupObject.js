/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/sprite_group_table.txt';
import pointersText from '!array-loader!./tables/sprite_group_pointers.txt';

class SpriteGroupObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.p === 1; // PC sprites
    }

    get spriteCount() {
        if(this.index === 463) return 8;
        const next = SpriteGroupObject.get(this.index + 1);
        if(!next) return 16; // If we are not yet loaded, assume maximum size
        const rawSize = next.pointer - this.pointer;
        return Math.max(0, (rawSize - 9) / 2);
    }

    sameCollision(other) {
        const keys = Object.keys(this.data).filter(key => key.startsWith("collision"));
        return keys.every(key => this.data[key] === other.data[key]);
    }

    lenientSwap(other, exclusions) {
        if(exclusions.includes(this.index) || exclusions.includes(other.index)) return false;
        return this.spriteCount === other.spriteCount;
    }

    validSwap(other, exclusions) {
        if(exclusions.includes(this.index) || exclusions.includes(other.index)) return false;
        return this.spriteCount === other.spriteCount && this.sameCollision(other);
    }

    mutate() {
        this.variableSize = true;
        if(!([1,2,3,4].includes(this.index))) return; // Only randomize 4 main PCs
        let candidates = SpriteGroupObject.every.filter(sg => sg.data.size === this.data.size);
        const invalidIndexes = [8, 9, 10, 11, 12, 343]; // Normal ghosts, diamond
        candidates = candidates.filter(c => !invalidIndexes.includes(c.index) && !this.constructor.badSprites.includes(c.index));
        const chosen = this.context.random.choice(candidates);
        this.copyData(chosen);
        if(chosen.spriteCount < 16) {
            this.data.sprites_diagonal = chosen.data.sprites_cardinal;
        }
    }

    getVariableSpecsattrs() {
        const full = this.constructor.tableSpecs.attributes;
        if(this.spriteCount < 16) {
            const copy = Object.assign({}, full);
            delete copy["10"];
        }
        return full;
    }
}

SpriteGroupObject.badSprites = [
    0, 106, 200, 247, 295, 314, 316, 368,
    369, 371, 373, 374, 375, 376, 381, 410, 420, 428, 430, 431, 439,
    440, 441, 456, 462, 463,
];

SpriteGroupObject.tableSpecs = {
    text: tableText,
    pointers: pointersText,
};

SpriteGroupObject._displayName = "sprite group";
export default SpriteGroupObject;