import { ReadWriteObject } from 'randomtools-js';
import ebutils from './ebutils.js';
import Script from './Script.js';

class SpecialAbilities extends ReadWriteObject {
    static shouldRandomize() {
        return this.context.specs.flags.c >= 2;
    }
    
    static shuffleAll() {
        // Patch battle action parser
        this.context.rom.set([0x4C, 0xFC, 0x39], 0x238FA);
        this.context.rom.set([0x4C, 0xC2, 0x39], 0x23915);
        this.context.rom.set([0xC9, 0x08, 0x00, 0xF0, 0x03, 0x4C, 0x4D, 0x3B, 
            0xA9, 0x06, 0x00, 0x85, 0x02, 0x85, 0x1E, 0xEA], 0x239C2);

        // Patch Giygas prayer control codes to use 1C 02 xx format
        this.context.rom.set([0x1C, 0x02, 0x02], 0x9f6e4);
        this.context.rom.set([0x1C, 0x02, 0x02], 0x9f712);

        // Shuffle abilities and replace necessary values
        let validShuffle = false;
        let shuffleAttempts = 99999;
        while(shuffleAttempts > 0 && !validShuffle) {
            this.shuffledAbilities = this.context.random.shuffle(this.abilities);

            const prayIndex = this.shuffledAbilities.findIndex(a => a.name === "Pray");
            if(prayIndex === 0 && !this.context.specs.flags.z.noPaula) validShuffle = true;
            if(prayIndex === 1 && !this.context.specs.flags.z.noJeff) validShuffle = true;
            if(prayIndex === 2 && !this.context.specs.flags.z.noPoo) validShuffle = true;
            shuffleAttempts -= 1;
        }
        if(!validShuffle) {
            throw new Error("You must have a party member who can receive the Pray ability.");
        }

        this.shuffledAbilities.forEach((ability, index) => {
            const character = this.characters[index];
            this.context.rom.set(ebutils.asmLoadAddress(ability.textAddress), character.textLocation);
            this.context.rom[character.battleActionLocation] = ability.battleActionId;
            ability.hardcodedBytes.forEach(byte => {
                console.assert(this.context.rom[byte] === ability.originalPid);
                this.context.rom[byte] = character.pid;
            })
        });

        // De-gender prayer messages
        const normalPrayer = Script.getByPointer(0x2f89e0);
        console.assert(normalPrayer.lines[6].length === 13);
        normalPrayer.lines[6] = ebutils.encodeText("  with their whole heart!");
        normalPrayer.writeScript(true);

        const giygasPrayers = [
            0x9f0b8,
            0x9f134,
            0x9f196,
            0x9f1fd,
            0x9f25e,
            0x9f2bc,
            0x9f325,
            0x9f389,
            0x9f3ec,
        ];
        const prayerHeader = Script.writeNewScript([
            [1],
            [31, 2, 28],
            [112],
            [28, 13],
            [80, 160, 162, 145, 169, 149, 148],
            [0],
            ebutils.encodeText("  from the bottom of their heart!"),
            [2],
        ]);
        giygasPrayers.map(a => Script.getByPointer(a)).forEach(giygasPrayer => {
            const oldLines = giygasPrayer.lines;
            giygasPrayer.lines = [
                ebutils.ccodeCallAddress(prayerHeader.snesAddress),
                ...giygasPrayer.lines.slice(7),
            ];
            giygasPrayer.writeScript();
        });

        const finalPrayer = Script.getByPointer(0x9f70c);
        console.assert(finalPrayer.lines[4].length === 24);
        finalPrayer.lines[4] = ebutils.encodeText(" and their friends' calls touched the heart of ");
        finalPrayer.writeScript(true);
    }

    static fullCleanup() {
        super.fullCleanup();
        if(!this.shouldRandomize() && this.context.specs.flags.a && this.context.specs.flags.z.noPaula) {
            throw new Error(`You must randomize special abilities ("c" flag of 2 or higher) to disable Paula.`);
        }
    }
}

SpecialAbilities.characters = [
    {
        pid: 2,
        name: "Paula",
        textLocation: 0x237E0,
        battleActionLocation: 0x237FB,
    },
    {
        pid: 3,
        name: "Jeff",
        textLocation: 0x2378B,
        battleActionLocation: 0x237a6,
    },
    {
        pid: 4,
        name: "Poo",
        textLocation: 0x23808,
        battleActionLocation: 0x23823,
    },
];

SpecialAbilities.abilities = [
    {
        name: "Pray",
        textAddress: 0xC4A031,
        battleActionId: 0x07,
        originalPid: 2,
        hardcodedBytes: [
            0x23A79,
            0x9f6e6,
            0x9f714,
        ],
    },
    {
        name: "Spy",
        textAddress: 0xC4A051,
        battleActionId: 0x08,
        originalPid: 3,
        hardcodedBytes: [
            0x2886F,
            0x2f7e15,
            0x2f7e1e,
        ],
    },
    {
        name: "Mirror",
        textAddress: 0xC4A071,
        battleActionId: 0x07,
        originalPid: 4,
        hardcodedBytes: [
            0x23A7E,
            0x250A0,
            0x252C2,
            0x2531D,
            0x2547B,
            0x25DC4,
            0x260D4,
            0x288D0,
            0x290F1,
        ],
    },
]

SpecialAbilities._displayName = "special abilities";
export default SpecialAbilities;