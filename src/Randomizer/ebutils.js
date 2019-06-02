/* eslint import/no-webpack-loader-syntax: off */
import textMapRaw0 from '!array-loader!./tables/text_mapping.txt';
import textMapRaw1 from '!array-loader!./tables/text_mapping_1.txt';
import textMapRaw2 from '!array-loader!./tables/text_mapping_2.txt';
import { utils } from 'randomtools-js';
import Color from 'color';

const ebutils = {
    // Note: Music note / Ness placeholder is "&"
    textMap: function(type = 0) {
        if(this._textMap) return this._textMap[type];
        this._textMap = [];

        const loadRawMap = (textMapRaw) => {
            const arr = [];
            textMapRaw.forEach(line => {
                if(line.trim().length === 0) return;
                const eq = line.indexOf('=');
                let [code, text] = [line.slice(0, eq), line.slice(eq+1)];
                if(code.length === 4) {
                    code = [code.substr(0, 2), code.substr(2, 2)].map(i => parseInt(i, 16));
                }
                else {
                    code = parseInt(code, 16);
                }
                arr.push({code: code, text: text.replace('\r','')});
            });
            arr.sort((a, b) => b.text.length - a.text.length); // Longest entries first
            return arr;
        };

        this._textMap.push(loadRawMap(textMapRaw0));
        this._textMap.push(loadRawMap(textMapRaw1));
        this._textMap.push(loadRawMap(textMapRaw2));

        return this.textMap(type);
    },

    listToText: function(list) {
        let text = "";
        let vals = list.slice();
        const map = this.textMap();
        const matchesFirstTwo = entry => Array.isArray(entry.code) && entry.code[0] === vals[0] && entry.code[1] === vals[1];
        const matchesFirst = entry => entry.code === vals[0];
        while(vals.length) {
            const longEntry = map.find(matchesFirstTwo);
            if(longEntry) {
                text += longEntry.text;
                vals = vals.slice(2);
                continue;
            }
            const shortEntry = map.find(matchesFirst);
            if(shortEntry) {
                text += shortEntry.text;
                vals = vals.slice(1);
                continue;
            }
            throw new Error(list + " invalid parsing.");
        }
        return text;
    },

    textToList: function(str, length = 25) {
        const arr = this.encodeText(str, false);
        while(arr.length < length) {
            arr.push(0x0);
        }
        if(arr.length > length) {
            throw new Error(str + " too long to encode to list.");
        }
        return arr;
    },

    encodeText: function(str, useMulti = true, textMap = 0) {
        let map = this.textMap(textMap);
        if(!useMulti) {
            map = map.filter(i => i.text.length === 1);
        }
        const arr = [];
        const matchesBeginning = entry => str.startsWith(entry.text);
        while(str.length) {
            const entry = map.find(matchesBeginning);
            if(!entry) {
                throw new Error(`${str} unable to be encoded with map ${textMap}.`);
            }
            Array.isArray(entry.code) ? arr.push(...entry.code) : arr.push(entry.code);
            str = str.substring(entry.text.length);
        }
        return arr;
    },

    ebToFilePointer: function(pointer) {
        console.assert((pointer & 0xC00000) === 0xC00000);
        return pointer & 0x3FFFFF;
    },

    fileToEbPointer: function(pointer) {
        console.assert((pointer & 0xC00000) === 0x0);
        return pointer | 0xC00000;
    },
    
    ccodeAddress: function(address) {
        if((address & 0xC00000) === 0x0) address = this.fileToEbPointer(address);
        return [
            address & 0xff,
            Math.floor((address & 0xff00) / 0xff),
            Math.floor((address & 0xff0000) / 0xffff),
            0x00
        ];
    },

    ccodeCallAddress: function(address) {
        const line = this.ccodeAddress(address);
        line.unshift(0x08);
        return line;
    },
    ccodeGotoAddress: function(address) {
        const line = this.ccodeAddress(address);
        line.unshift(0x0a);
        return line;
    },

    flagString: function(flags) {
        let str = "";
        Object.keys(flags).forEach( flag => {
            if(flags[flag]) {
            str += (flag.length > 1 ? `(${flag})` : flag);
            }
            if(flags[flag] > 1) {
            str += flags[flag];
            }
        })
        return str;
    },

    parseFlagString: function(str) {
        const flags = {};
        const regex = /([a-z]|\([a-z]+\))([0-9]*)/ig;
        let match;
        while((match = regex.exec(str)) !== null) {
            const key = match[1].replace("(","").replace(")","");
            const val = match[2] ? parseInt(match[2], 10) : 1;
            flags[key] = val;
        }
        return flags;
    },

    rotateEbPalette: function(palette, degrees) {
        return palette.map((color, i) => {
            if(i === 0) return color;
            const oldRgb = utils.snesColorToRgb(color);
            const oldColor = Color(oldRgb);
            const newRbg = oldColor.rotate(degrees).rgb().object();
            return utils.rgbToSnesColor(newRbg);
        });
    },

    SANCTUARY_BOSS_POINTERS: [
        0x68409,
        0x68410,
        0x6841e,
        0x68417,
        0x68425,
        0x6842c,
        0x68433,
        0x6843a,
    ],

    SANCTUARY_HOTSPOT_POINTERS: [
        0x7becf,
        0x7bf95,
        0x7c06e,
        0x7c12a,
        0x7c208,
        0x7c2c6,
        0x7c39b,
        0x7c479,
    ],

    SANCTUARY_ACTIVATION_POINTERS: [
        0x9b08d,
        0x9afe1,
        0x9afb6,
        0x9af8b,
        0x9b00c,
        0x9b037,
        0x9b062,
        0x9b0b2,
    ],

    SANCTUARY_BOSS_INDEXES: [
        0x147, 0xc0, 0x16e, 0x1f, 0x1d0, 0x30b, 0x19, 0x3a2  // ordered, NOT 0x2b4
    ],

    EVEN_DISTRIBUTE_DOORS: [
        0x6a,   // Giant Step
        0x30b,  // Rainy Circle
        0x35c,  // Magnet Hill
        0x3f5,  // Milky Well
        0x52c,  // Pink Cloud
        0x68c,  // Lilliput Steps
        0x6b5,  // Brick Road's Head
        0x6d1,  // Throne Room
        0x7ce,  // Fire Spring
    ],

    GIYGAS_PRAYER_SCRIPTS: [
        0x7b9a1,
        0x7ba2c,
        0x7bac7,
        0x7bb38,
        0x7bbf3,
        0x7bc56,
        0x7bc96,
    ],
}
export default ebutils;