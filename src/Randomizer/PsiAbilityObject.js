/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/psi_ability_table.txt';

class PsiAbilityObject extends TableObject {
    toString() {
        let str = `${this.constructor.names[this.data.name_index]}-${this.data.greek_letter}:\n` +
            `\tOLD: Ness-${this.oldData.ness_level},\tPaula-${this.oldData.paula_level},\tPoo-${this.oldData.poo_level}` +
            `\tNEW: Ness-${this.data.ness_level},\tPaula-${this.data.paula_level},\tPoo-${this.data.poo_level}`;
        return str;
    }

    static shouldRandomize() {
        return this.context.specs.flags.i;
    }

    static mutateAll() {
        this.classReseed("mut");
        if(this.context.specs.flags.i >= 2) {
            // Redistribute the PSI skills among the kids
            // TODO: Starstorm consequences?

            // 1) Bucket skills by placement in the menu (can only be assigned one group of skills per slot)
            const buckets = {};
            this.every.forEach(o => {
                // Starstorm exception: do not assign bucket
                if(o.data.name_index === 6) return;
                const bucketName = `${o.data.type}-${o.data.entry_number}`;
                if(buckets[bucketName] === undefined) buckets[bucketName] = [];
                buckets[bucketName].push(o);

                // Also, blank out all existing abilities
                this.levelAttrs.forEach(attrName => {
                    o.data[attrName] = 0;
                });
            });

            // 2) Re-assign zero-to-one skill per menu place
            this.levelAttrs.forEach(attrName => {
                Object.keys(buckets).forEach(bucketName => {
                    // Starstorm exception: Leave Poo's attack 1 bucket empty
                    if(attrName === "poo_level" && bucketName === "1-0") {
                        return;
                    }

                    // A) Chance to have nothing in this slot
                    if(this.context.random.random() < 0.15) {
                        return;
                    }

                    // B) Select one group of abilities in this slot
                    const bucket = buckets[bucketName];
                    const abilities = [...new Set(bucket.map(o => o.data.name_index))];
                    const chosenNameIndex = this.context.random.choice(abilities);

                    // C) Assign each instance of the chosen ability a non-zero value
                    bucket.filter(o => o.data.name_index === chosenNameIndex).forEach(o => {
                        // Small chance to not have this instance of this ability
                        if(this.context.random.random() < 0.075) {
                            return;
                        }
                        const nonZeroValues = [];
                        this.levelAttrs.forEach(attrName2 => {
                            if(o.oldData[attrName2] !== 0) nonZeroValues.push(o.oldData[attrName2]);
                        });
                        console.assert(nonZeroValues.length > 0);
                        o.data[attrName] = this.context.random.choice(nonZeroValues);
                    });
                });
            });

            // 3) Ensure someone has Teleport B
            const teleportB = this.every.find(o => o.data.name_index === 0x11 && o.data.greek_letter === 2);
            console.assert(teleportB !== undefined);
            if(this.levelAttrs.every(attrName => teleportB.data[attrName] === 0)) {
                teleportB.data[this.context.random.choice(this.levelAttrs)] = 0x12;
            }
        }
        super.mutateAll();
    }

    get mutateAttributes() {
        const attrs = {};
        this.constructor.levelAttrs.forEach(attrName => {
            if(this.data[attrName] !== 0) {
                attrs[attrName] = [1,75];
            }
        });
        return attrs;
    }

    cleanup() {
        if((this.context.specs.flags.k || this.context.specs.flags.o) && this.data.name_index === 0x11 && this.data.greek_letter === 0x01) {
            this.data.ness_level = 1;
        }
    }
}

PsiAbilityObject.levelAttrs = ["ness_level","paula_level","poo_level"];

PsiAbilityObject.names = [
    "NULL",
    "Rockin'",
    "Fire",
    "Freeze",
    "Thunder",
    "Flash",
    "Starstorm",
    "Lifeup",
    "Healing",
    "Shield",
    "PSI Shield",
    "Offense Up",
    "Defense Down",
    "Hypnosis",
    "Magnet",
    "Paralysis",
    "Brainshock",
    "Teleport",
]

PsiAbilityObject.tableSpecs = {
    text: tableText,
    count: 52,
    pointer: 0x158a5f,
};

PsiAbilityObject._displayName = "psi ability";
export default PsiAbilityObject;