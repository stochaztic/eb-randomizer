/* eslint import/no-webpack-loader-syntax: off */
import { TableObject, utils } from 'randomtools-js';
import tableText from '!array-loader!./tables/tpt_table.txt';
import Script from './Script.js';
import ebutils from './ebutils.js';
import SpriteGroupObject from './SpriteGroupObject.js';

class TPTObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.n; // NPC sprites
    }

    get isChest() {
        return this.data.tpt_type === 2;
    }

    get isShop() {
        if(!this.script) return false;
        return this.script.properties["shop"];
    }

    get script() {
        const pointer = this.data.address;
        if(pointer === 0) return null;
        console.assert((pointer & 0xFFC00000) === 0xC00000);
        return Script.getByPointer(ebutils.ebToFilePointer(pointer));
    }

    mutate() {
        const phones = [167, 215, 412, 385, 216];
        const chests = [33, 195, 214, 233, 262, 322, 408];
        const tptExclusions = [198, //# Meteorite (causes Buzz Buzz scene problems)
            884]; //# Runaway 5 in Clumsy room (causes softlock)
        let spriteExclusions = [0, 106, 200, 247, 295, 314, 316, 368,
            369, 371, 373, 374, 375, 376, 381, 410, 420, 428, 430, 431, 439,
            440, 441, 456, 462, 463,
            457, // Defeated Ness Robot
            427, // Tiny bird phone
            // Also exclude all phone sprites
            167, 215, 412, 385, 216,
            // Also exclude all chest sprites
            33, 195, 214, 233, 262, 322, 408];
        if(this.context.specs.flags.n >= 3) {
            spriteExclusions = [];
        }
        if(tptExclusions.includes(this.index)) return;
        if(chests.includes(this.data.sprite)) {
            this.data.sprite = this.context.random.choice(chests);
            return;
        }
        if(phones.includes(this.data.sprite)) {
            this.data.sprite = this.context.random.choice(phones);
            return;
        }
        if(spriteExclusions.includes(this.data.sprite)) return;

        const currentSprite = SpriteGroupObject.get(this.data.sprite);
        let candidates;
        if(this.context.specs.flags.n >= 3) {
            candidates = SpriteGroupObject.every;
        }
        else if(this.context.specs.flags.n >= 2) {
            candidates = SpriteGroupObject.every.filter(sg => currentSprite.lenientSwap(sg, spriteExclusions));
        }
        else {
            candidates = SpriteGroupObject.every.filter(sg => currentSprite.validSwap(sg, spriteExclusions));
        }
        this.data.sprite = this.context.random.choice(candidates).index;

        // Special fixes
        if(this.index === 795) { //  Backhoe on bridge
            utils.writeMulti(this.context.rom, 0x307AF, this.data.sprite, 2);
        }
    }

    cleanup() {
        if(this.context.specs.flags.a && this.data.address === 0xc75909) {
            this.data.address = 0xc68017; // Make home phone a normal phone
        }
    }
}

TPTObject.tableSpecs = {
    text: tableText,
    count: 1584,
    pointer: 0xf8985,
};

TPTObject._displayName = "tpt";
export default TPTObject;