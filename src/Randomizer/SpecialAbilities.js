import { ReadWriteObject } from 'randomtools-js';
import ebutils from './ebutils.js';

class SpecialAbilities extends ReadWriteObject {
    static shouldRandomize() {
        return this.context.specs.flags.c >= 2;
    }
    
    static shuffleAll() {
        // Patch battle action parser
        this.context.rom.set([0x4C, 0xFC, 0x39], 0x238FA); // C239FC
        this.context.rom.set([0x4C, 0xC2, 0x39], 0x23915);
        this.context.rom.set([0xC9, 0x08, 0x00, 0xF0, 0x03, 0x4C, 0x4D, 0x3B, 
            0xA9, 0x06, 0x00, 0x85, 0x02, 0x85, 0x1E, 0xEA], 0x239C2);

        // Shuffle abilities and replace necessary values
        this.shuffledAbilities = this.context.random.shuffle(this.abilities);
        this.shuffledAbilities.forEach((ability, index) => {
            const character = this.characters[index];
            this.context.rom.set(ebutils.asmLoadAddress(ability.textAddress), character.textLocation);
            this.context.rom[character.battleActionLocation] = ability.battleActionId;
            ability.hardcodedBytes.forEach(byte => {
                console.assert(this.context.rom[byte] === ability.originalPid);
                this.context.rom[byte] = character.pid;
            })
        });
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