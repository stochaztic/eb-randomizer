/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/sprite_group_table.txt';

class SpriteGroupObject extends TableObject {
    static shouldRandomize() {
        return true; // custom PC sprites if they are manually set
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
        if(!this.context.specs.sprites || !this.context.specs.sprites[this.index]) return;
        const sprite = this.context.specs.sprites[this.index];
        if(!isNaN(sprite)) {
            this.vanillaMutate(Number.parseInt(sprite));
            return;
        }

        const addressToSet = (this.constructor.expandedBank << 16) + this.constructor.currentExpandedIndex;
        this.context.rom.set(sprite.data, addressToSet);
        this.data.bank = this.constructor.expandedBank | 0xc0;
        this.data.palette = sprite.palette || this.data.palette;
        this.data.sprites_cardinal = sprite.indexes.slice(0, 8).map(i => i + this.constructor.currentExpandedIndex);
        this.data.sprites_diagonal = sprite.indexes.slice(8).map(i => i + this.constructor.currentExpandedIndex);
        this.constructor.currentExpandedIndex += sprite.data.length;
    }


    vanillaMutate(spriteNumber) {
        let chosen = spriteNumber;
        if(chosen >= SpriteGroupObject.every.length) {
            let candidates = SpriteGroupObject.every.filter(sg => sg.data.size === this.data.size);
            const invalidIndexes = [8, 9, 10, 11, 12, 343]; // Normal ghosts, diamond
            candidates = candidates.filter(c => !invalidIndexes.includes(c.index) && !this.constructor.badSprites.includes(c.index));
            chosen = this.context.random.choice(candidates);
        }
        else {
            chosen = SpriteGroupObject.get(chosen);
        }
        this.copyData(chosen);
        this.data.collision_ns_w = this.oldData.collision_ns_w;
        this.data.collision_ns_h = this.oldData.collision_ns_h;
        this.data.collision_ew_w = this.oldData.collision_ew_w;
        this.data.collision_ew_h = this.oldData.collision_ew_h;
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

SpriteGroupObject.expandedBank = 0x30;
SpriteGroupObject.currentExpandedIndex = 0;

SpriteGroupObject.badSprites = [
    0, 106, 200, 247, 295, 314, 316, 368,
    369, 371, 373, 374, 375, 376, 381, 410, 420, 428, 430, 431, 439,
    440, 441, 456, 462, 463,
];

SpriteGroupObject.tableSpecs = {
    text: tableText,
    pointed: true,
    pointer: 0x2f133f,
    count: 464,
};

SpriteGroupObject._displayName = "sprite group";
export default SpriteGroupObject;