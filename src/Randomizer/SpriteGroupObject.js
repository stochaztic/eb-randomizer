/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/sprite_group_table.txt';
import ebutils from './ebutils.js';

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
            this.vanillaReplaceSprite = Number.parseInt(sprite);
            return;
        }

        if(sprite.standardize) {
            const standardSprite = this.constructor.get(this.constructor.standardSpriteIndex);
            console.assert(standardSprite.spriteCount === this.spriteCount);
            this.data = Object.assign({}, standardSprite.data);
        }
        
        const writeData = ebutils.writeToFreespace(sprite.data, this.context, `sprite data`);

        this.data.bank = writeData.snesBank;
        this.data.palette = sprite.palette || this.data.palette;
        this.data.sprites_cardinal = sprite.indexes.slice(0, 8).map(i => i + writeData.bankAddress);
        while(this.data.sprites_cardinal.length < 8) {
            this.data.sprites_cardinal.push(this.data.sprites_cardinal[0]);
        }
        this.data.sprites_diagonal = sprite.indexes.slice(8).map(i => i + writeData.bankAddress);
    }

    cleanup() {
        if(this.vanillaReplaceSprite) {
            this.vanillaReplace(this.vanillaReplaceSprite);
        }
    }

    vanillaReplace(spriteNumber) {
        let chosen = spriteNumber;
        if(chosen >= SpriteGroupObject.every.length) {
            // Currently unused since change to RandomVanilla in frontend.
            let candidates = SpriteGroupObject.every.filter(sg => sg.data.size === this.data.size);
            const invalidIndexes = [8, 9, 10, 11, 12, 343]; // Normal ghosts, diamond
            candidates = candidates.filter(c => !invalidIndexes.includes(c.index) && !this.constructor.badSprites.includes(c.index));
            chosen = this.context.random.choice(candidates);
        }
        else {
            chosen = SpriteGroupObject.get(chosen);
        }
        this.data.sprites_cardinal = chosen.data.sprites_cardinal;
        this.data.sprites_diagonal = chosen.data.sprites_diagonal;
        this.data.palette = chosen.data.palette;
        this.data.bank = chosen.data.bank;
        if(chosen.spriteCount < 16) {
            this.data.sprites_diagonal = chosen.data.sprites_cardinal;
        }
    }

    getVariableSpecsattrs() {
        let attrs = this.constructor.tableSpecs.attributes;
        if(this.spriteCount < 16) {
            attrs = attrs.slice();
            attrs.splice(10, 1);
            if(this.spriteCount === 9) {
                attrs.push({name: 'sprites_diagonal', size: '1x2', other: 'list'});
                this.data.sprites_diagonal = [this.data.sprites_diagonal[0]];
                this.oldData.sprites_diagonal = [this.oldData.sprites_diagonal[0]];
            }
        }
        return attrs;
    }
}

SpriteGroupObject.expandedBank = 0x31;
SpriteGroupObject.currentExpandedIndex = 0;
SpriteGroupObject.standardSpriteIndex = 14;

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