import { ReadWriteObject } from 'randomtools-js';
import Cluster from './Cluster.js';
import ebutils from './ebutils.js';
import MusicObject from './MusicObject.js';

class Credits extends ReadWriteObject {
    static fullCleanup() {
        super.fullCleanup();
        if(this.context.specs.special) return;

        let addedSpace = 0;
        // Something about the added space accumulator is slightly off,
        // but I am not sure what, as these values are directly from the changes
        // made to $B4E3 when any of these types of codes are used.
        // Fine for now but will need investigation before major credit changes.

        const smallText = (str) => {
            addedSpace += 0x8;
            return [0x01, ...ebutils.encodeText(str,true,1), 0x00];
        };
        const bigText = (str) => {
            addedSpace += 0x10;
            return [0x02, ...ebutils.encodeText(str,true,2), 0x00];
        }
        const space = (amt) => {
            addedSpace += (amt * 8);
            return [3, amt];
        };
        const printAddr = (addr, len=1) => {
            addedSpace += 0x10;
            return [0x05, ...ebutils.ccodeAddress(addr), len];
        }

        let ancientCaveStats = [];
        if(this.context.specs.flags.a) {
            ancientCaveStats = [
                ...smallText("CAVE LENGTH"),
                ...bigText(Math.floor(Cluster.goal.rank).toString()),
                ...space(2),
                ...smallText("YOUR DOOR TRANSITIONS"),
                ...printAddr(0x7EB600, 2),
                ...space(2),
            ];
        }

        let ancientCaveMusic = [];
        if(this.context.specs.flags.a && this.context.specs.flags.w >= 2) {
            ancientCaveMusic = [
                ...space(6),
                ...bigText("ANCIENT CAVE MUSIC"), // Condensed
                ...bigText("__________________"),
                ...space(2),
            ];

            const nums = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
            MusicObject.ancientCaveMusics.forEach((music, i) => {
                ancientCaveMusic.push(...smallText(`FLOOR ${nums[i]}`));
                ancientCaveMusic.push(...bigText(MusicObject.songInfo(music).title.toUpperCase()));
                ancientCaveMusic.push(...bigText(MusicObject.songInfo(music).artist.toUpperCase()));
                ancientCaveMusic.push(...space(2));
            });
        }

        const newCredits = [
            ...space(2),
            ...bigText("STATISTICS"),
            ...bigText("__________"),
            ...space(2),
            ...ancientCaveStats,
            ...smallText("NESS LEVEL"),
            ...printAddr(0x7e99d3, 1),
            ...space(2),
            ...smallText("MONEY IN BANK"),
            ...printAddr(0x7e9835, 4),
            ...space(2),
            ...smallText("MONEY ON HAND"),
            ...printAddr(0x7e9831, 4),
            ...space(6),
            ...smallText("RANDOM BATTLES"),
            ...printAddr(0x7EB602, 2),
            ...space(2),
            ...smallText("SCRIPTED BATTLES"),
            ...printAddr(0x7EB604, 2),
            ...space(2),
            ...smallText("INSTANT WINS"),
            ...printAddr(0x7EB606, 2),
            ...space(6),
            ...smallText("DAMAGE RECEIVED"),
            ...printAddr(0x7EB608, 4),
            ...space(2),
            ...smallText("DAMAGE DEALT"),
            ...printAddr(0x7EB60C, 4),
            ...space(6),
            ...smallText("CHICKENS FREED"),
            ...printAddr(0x7EB612, 1),
            ...space(2),
            ...smallText("L BUTTON NO PROBLEM HERES"),
            ...printAddr(0x7EB610, 2),
            ...space(6),
            ...bigText("RANDOMIZER"),
            ...bigText("__________"),
            ...space(2),
            ...smallText("WEBSITE"),
            ...bigText("EARTHBOUND.APP"),
            ...space(2),
            ...smallText("VERSION"),
            ...bigText(this.context.specs.version),
            ...space(2),
            ...smallText("SEED"),
            ...bigText(this.context.specs.seed.toString()),
            ...space(2),
            ...smallText("FLAGS"),
            ...bigText(ebutils.flagString(this.context.specs.flags)
                .toUpperCase().replace(/\(|\)/g,"*")),
            ...space(6),
            ...smallText("LEAD DEVELOPER"),
            ...bigText("STOCHAZTIC"),
            ...space(2),
            ...smallText("LEAD PLAYTESTER"),
            ...bigText("TSJONTE"),
            ...space(2),
            ...smallText("PREVIOUS RANDOMIZER"),
            ...smallText("DEVELOPERS"),
            ...bigText("TOMATO"),
            ...bigText("RYDEL"),
            ...bigText("ABYSSONYM"),
            ...space(2),
            ...smallText("SUPERSERIES ANCIENT CAVE WINNERS"),
            ...bigText("AURILLIUX"),
            ...bigText("ANDYPERFECT"),
            ...bigText("DOCTORSWELLMAN"),
            ...space(2),
            ...smallText("PATREON SUPPORTERS"),
            ...bigText("ANDYPERFECT"),
            ...bigText("AURILLIUX"),
            ...bigText("COBALTCUSTARD"),
            ...bigText("DOCTORSWELLMAN"),
            ...bigText("JRBRANDON15"),
            ...bigText("MICROWAVEDANIKA"),
            ...bigText("MRNOOBLORD"),
            ...bigText("PROJPATSUMMITT"),
            ...bigText("QUINN"),
            ...bigText("ROFISH"),
            ...bigText("SNOWRAY"),
            ...bigText("STEINBECK"),
            ...bigText("TOM FAWKES"),
            ...bigText("TRIANGULITO"),
            ...space(2),
            ...smallText("SPECIAL THANKS"),
            ...bigText("EB SPEEDRUNNING COMMUNITY"),
            ...bigText("PK HACK COMMUNITY"),
            ...ancientCaveMusic,
            ...space(6),
            ...bigText("ORIGINAL GAME"), // Condensed
            ...bigText("_____________"),
            0x03,0x02,0x01,0x5B,0x7A,0x4B,0x54,0x6C,0x44,0x45,0x54,0x40,0x42,0x5A,0x54,0x40,0x54,0x48,0x7A,0x45,0x44,0x7B,0x45,0x54,0x40,0x52,0x6E,0x00,0x02,0xA3,0x88,0x89,0x87,0x85,0xA3,0x81,0xA4,0x8F,0x40,0x89,0xA4,0x8F,0x89,0x00,0x03,0x02,0x01,0x6D,0x7A,0x48,0x7B,0x7B,0x45,0x5A,0x40,0x52,0x6E,0x00,0x02,0xA3,0x88,0x89,0x87,0x85,0xA3,0x81,0xA4,0x8F,0x40,0x89,0xA4,0x8F,0x89,0x00,0x03,0x02,0x01,0x4A,0x6C,0x6B,0x48,0x44,0x40,0x52,0x6E,0x00,0x02,0x8B,0x85,0x89,0x89,0x83,0x88,0x89,0x40,0xA3,0xA5,0xAA,0xA5,0x8B,0x89,0x00,0x02,0x88,0x89,0xA2,0x8F,0x8B,0x81,0xAA,0xA5,0x40,0xA4,0x81,0x8E,0x81,0x8B,0x81,0x00,0x03,0x06,0x01,0x46,0x42,0x4A,0x45,0x40,0x54,0x45,0x6B,0x48,0x46,0x5A,0x45,0x7A,0x00,0x02,0x81,0x8B,0x89,0x88,0x89,0x8B,0x8F,0x40,0x8D,0x89,0xA5,0xA2,0x81,0x00,0x03,0x02,0x01,0x42,0x7A,0x7B,0x40,0x54,0x48,0x7A,0x45,0x44,0x7B,0x4B,0x7A,0x00,0x02,0x8B,0x8F,0xA5,0x89,0x83,0x88,0x89,0x40,0x8F,0x8F,0xA9,0x81,0x8D,0x81,0x00,0x03,0x02,0x01,0x6B,0x4B,0x6C,0x5A,0x54,0x40,0x54,0x48,0x7A,0x45,0x44,0x7B,0x4B,0x7A,0x00,0x02,0x88,0x89,0xA2,0x8F,0x8B,0x81,0xAA,0xA5,0x40,0xA4,0x81,0x8E,0x81,0x8B,0x81,0x00,0x03,0x02,0x01,0x5B,0x7A,0x4B,0x46,0x7A,0x42,0x4A,0x40,0x54,0x48,0x7A,0x45,0x44,0x7B,0x4B,0x7A,0x00,0x02,0xA3,0x81,0xA4,0x8F,0xA2,0xA5,0x40,0x89,0xA7,0x81,0xA4,0x81,0x00,0x03,0x02,0x01,0x6C,0xAD,0x6B,0xAD,0x40,0x44,0x4B,0x5A,0x7C,0x45,0x7A,0x6B,0x48,0x4B,0x5A,0x40,0x54,0x48,0x7A,0x45,0x44,0x7B,0x4B,0x7A,0x00,0x02,0x8B,0x8F,0xA5,0x8A,0x89,0x40,0x8D,0x81,0x8C,0xA4,0x81,0x00,0x03,0x02,0x01,0x7B,0x7A,0x42,0x5A,0x6B,0x59,0x42,0x7B,0x48,0x4B,0x5A,0x40,0x54,0x48,0x7A,0x45,0x44,0x7B,0x4B,0x7A,0x6B,0x00,0x02,0x8D,0x81,0xA2,0x83,0xA5,0xA3,0x40,0x8C,0x89,0x8E,0x84,0x82,0x8C,0x8F,0x8D,0x00,0x02,0x8D,0x81,0xA3,0x81,0xA9,0xA5,0x8B,0x89,0x40,0x8D,0x89,0xA5,0xA2,0x81,0x00,0x03,0x06,0x01,0x44,0x56,0x48,0x45,0x55,0x40,0x44,0x4B,0x4B,0x7A,0x54,0x48,0x5A,0x42,0x7B,0x4B,0x7A,0x00,0x02,0x8D,0x81,0xA2,0x83,0xA5,0xA3,0x40,0x8C,0x89,0x8E,0x84,0x82,0x8C,0x8F,0x8D,0x00,0x03,0x06,0x01,0x59,0x48,0x5A,0x45,0x40,0x5B,0x7A,0x4B,0x54,0x6C,0x44,0x45,0x7A,0x00,0x02,0xA4,0xA3,0xA5,0x8E,0x85,0x8B,0x81,0xAA,0x40,0x89,0xA3,0x88,0x89,0x88,0x81,0xA2,0x81,0x00,0x03,0x06,0x01,0x44,0x4B,0x5B,0x7A,0x4B,0x54,0x6C,0x44,0x45,0x7A,0x00,0x02,0xA3,0x81,0xA4,0x8F,0xA2,0xA5,0x40,0x89,0xA7,0x81,0xA4,0x81,0x00,0x03,0x06,0x01,0x5A,0x4B,0x42,0x40,0x5B,0x7A,0x4B,0x54,0x6C,0x44,0x45,0x7A,0x00,0x02,0x8D,0x89,0x8B,0x85,0x40,0x86,0xA5,0x8B,0xA5,0x84,0x81,0x00,0x03,0x06,0x01,0x6B,0x6C,0x5B,0x45,0x7A,0x7C,0x48,0x6B,0x4B,0x7A,0x00,0x02,0xA3,0x88,0x89,0x87,0x85,0xA2,0xA5,0x40,0x8D,0x89,0xA9,0x81,0x8D,0x8F,0xA4,0x8F,0x00,0x03,0x06,0x01,0x45,0x7D,0x45,0x44,0x6C,0x7B,0x48,0x7C,0x45,0x40,0x5B,0x7A,0x4B,0x54,0x6C,0x44,0x45,0x7A,0x6B,0x00,0x02,0x88,0x89,0xA2,0x8F,0xA3,0x88,0x89,0x40,0xA9,0x81,0x8D,0x81,0xA5,0x83,0x88,0x89,0x00,0x02,0x8D,0x89,0x8E,0x8F,0xA2,0xA5,0x40,0x81,0xA2,0x81,0x8B,0x81,0xA7,0x81,0x00,0x03,0x06,0x01,0x5B,0x7A,0x45,0x6B,0x45,0x5A,0x7B,0x45,0x54,0x40,0x52,0x6E,0x00,0x02,0x8E,0x89,0x8E,0xA4,0x85,0x8E,0x84,0x8F,0x00,0x03,0x02,0x01,0x48,0x5A,0x40,0x42,0x6B,0x6B,0x4B,0x44,0x48,0x42,0x7B,0x48,0x4B,0x5A,0x40,0x6D,0x48,0x7B,0x56,0x00,0x02,0x81,0xA0,0x85,0x40,0x89,0x8E,0x83,0x4E,0x00,0x03,0x02,0x01,0x42,0x5A,0x54,0x00,0x02,0x88,0x81,0x8C,0x40,0x8C,0x81,0x82,0x8F,0xA2,0x81,0xA4,0x8F,0xA2,0xA9,0x4C,0x89,0x8E,0x83,0x4E,0x00,
            0x03,0x0C,0x01,0x42,0x5A,0x54,0xAD,0xAD,0xAD,0x00,0x01,0x40,0x00,0x03,0x0E,0x01,0x5B,0x59,0x42,0x6E,0x45,0x7A,0x00,
            0x04, 0x3, 0x0D, 0xFF,
        ];
        if(newCredits.length + this.beginAddress > this.endAddress) {
            throw new Error(`Credits length ${newCredits.length} too long.`);
        }
        this.context.rom.set(newCredits, this.beginAddress);

        const baseSpace = 0x568;
        const totalSpace = baseSpace + addedSpace;
        const newScrollLength = [totalSpace % 256, Math.floor(totalSpace / 256)];
        //console.log(`ADDED SPACE: ${addedSpace} ; 0x${addedSpace.toString(16)}`);
        //console.log(`remainder: ${addedSpace - 0x7f0} ; 0x${(addedSpace - 0x7f0).toString(16)}`);

        //const newScrollLength = [0xf0, 0x07];
        this.scrollAddresses.forEach(scrollAddress => {
            this.context.rom.set(newScrollLength, scrollAddress);
        });
    }
}

Credits.beginAddress = 0x21413f;
Credits.endAddress = 0x214DE7;
Credits.scrollAddresses = [
    0x4f583,
    0x4f58c,
    0x4f66f,
]

Credits._displayName = "credits";
export default Credits;