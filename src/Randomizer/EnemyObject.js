/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/enemy_table.txt';
import ebutils from './ebutils.js';
import ItemObject from './ItemObject.js';
import SpriteGroupObject from './SpriteGroupObject.js';
import { battleSpriteNames, enemyAdjectives, enemySuffixes, superlatives } from './RandomNames.js';

class EnemyObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.m; // Enemy stats
    }

    get name() {
        return ebutils.listToText(this.data.name_text);
    }

    get oldName() {
        if(this._oldName !== undefined) return this._oldName;
        this._oldName = ebutils.listToText(this.oldData.name_text);
        return this.oldName;
    }

    set name(str) {
        this.data.name_text = ebutils.textToList(str, this.data.name_text.length);
    }

    get isBoss() {
        return this.data.boss_flag || this.data.death_sound;
    }

    get isFinalBoss() {
        return this.oldName.includes("Pokey") || this.oldName.includes("Giygas");
    }

    get isNpc() {
        return !this.isBoss && this.data.out_of_battle_sprite === 0;
    }

    get intershuffleValid() {
        return this.isNormalEnemy;
    }

    get isNormalEnemy() {
        return !this.isBoss && !this.isFinalBoss && !this.isNpc && !(this.index === 225); // Magic Butterfly
    }

    get rank() {
        if(this._rank !== undefined) return this._rank;
        const byHp = EnemyObject.everyMutable.sort((a, b) => a.oldData.hp - b.oldData.hp);
        const byXp = EnemyObject.everyMutable.sort((a, b) => a.oldData.xp - b.oldData.xp);
        EnemyObject.every.forEach(e => {
            e._rank = Math.max(byHp.indexOf(e), byXp.indexOf(e));
        })
        return this.rank;
    }

    mutate() {
        super.mutate();

        if((this.data.final_action === 64 || this.data.final_action === 65) && this.context.random.random() < 0.01) {
            this.data.final_action = 0;
        }

        if(this.data.final_action === 0 && this.data.hp > 140 && this.context.random.random() < 0.005) {
            this.data.final_action = 64;
        }

        if(this.data.final_action === 0 && this.data.hp > 140 && this.context.random.random() < 0.005) {
            this.data.final_action = 65;
        }

        if( (this.context.specs.flags.m >= 3 && this.data.battle_sprite !== 0) ||
            (this.context.specs.flags.m >= 2 && this.data.battle_sprite !== 0 && this.oldName === "Giygas")) {
            // Randomize sprite pairs
            const pairs = this.constructor.existingValues(["battle_sprite", "out_of_battle_sprite", "movement"]);
            const newPair = this.context.random.choice(pairs);
            // Don't change to null or Giygas sprites
            if(![0, 0x6c].includes(newPair.battle_sprite)) {
                this.data.battle_sprite = newPair.battle_sprite;
            }
            if(newPair.out_of_battle_sprite !== 0) {
                this.data.movement = newPair.movement;
                this.data.out_of_battle_sprite = newPair.out_of_battle_sprite;
            }
        }

        if(this.context.specs.flags.m >= 4 && this.data.battle_sprite !== 0) {
            // Get any movement and similarly-sized sprite
            const newMovement = this.context.random.choice(this.constructor.existingValues("movement"));
            if(newMovement !== 0) this.data.movement = newMovement;
            const existingSprite = SpriteGroupObject.get(this.data.out_of_battle_sprite);
            const sprites = SpriteGroupObject.every.filter(sg => 
                !SpriteGroupObject.badSprites.includes(sg.index) && sg.data.size === existingSprite.data.size);
            this.data.out_of_battle_sprite = this.context.random.choice(sprites).index;
        }

        if(this.context.specs.flags.m >= 2 && this.data.battle_sprite !== 0) {
            // Randomize name
            let validChanged = false;
            const baseChoices = battleSpriteNames[this.data.battle_sprite - 1].split(",");
            while(!validChanged) {
                let newName = this.context.random.choice(baseChoices);
                if(this.context.random.random() < 0.06) {
                    newName = `${newName}${this.context.random.choice(enemySuffixes)}`;
                }
                else {
                    newName = `${this.context.random.choice(enemyAdjectives)} ${newName}`;
                }
                if(this.context.random.random() < 0.075) {
                    newName = `${this.context.random.choice(superlatives)}${newName}`;
                }
                if(newName.length <= this.data.name_text.length) {
                    this.name = newName;
                    validChanged = true;
                }
            }
        }
    }

    cleanup() {
        if(this.context.specs.special) return;
        if(this.isBoss && !this.isFinalBoss && this.context.random.random() < 0.8) {
            ["hp", "pp", "level", "offense", "defense", "speed", "guts",
            "iq", "weakness_fire", "weakness_freeze", "weakness_flash",
            "weakness_paralysis", "weakness_hypnosis"].forEach(attr => {
                this.data[attr] = Math.max(this.data[attr], this.oldData[attr]);
            });
        }

        // Starting-status Cannot Concentrate enemies keep that status
        if(this.oldData.status === 6) {
            this.data.status = 6;
        }

        // Special case for Giygas before dupe sanitizing: The first entry is not the sprite-having entry.
        if(this.name === "Giygas") {
            const renamedGiegue = this.constructor.every.find(o => o.oldName === this.name && o.name !== this.name);
            if(renamedGiegue) this.name = renamedGiegue.name;
            this.data.weakness_flash = this.oldData.weakness_flash;
        }

        // Sanitize any duplicate-logic entries to match values that used to match across dupes.
        let dupes = this.constructor.every.filter(o => !o._dupeChecked && o.index !== this.index && o.oldName === this.oldName);
        dupes.forEach(dupe => {
            this.constructor.tableSpecs.attributes.forEach(spec => {
                dupe.name = this.name;
                if(dupe.oldData[spec.name] === this.oldData[spec.name] && dupe.data[spec.name] !== this.data[spec.name]) {
                    dupe.data[spec.name] = this.data[spec.name];
                }
            });
            dupe._dupeChecked = true;
        });
        this._dupeChecked = true;

        if(this.oldData.battle_sprite === 0) {
            this.data.battle_sprite = 0;
        }

        if(this.isNormalEnemy && this.context.specs.flags.z.allDiamonds) {
            const diamondEnemy = this.constructor.get(13);
            this.data.movement = diamondEnemy.oldData.movement;
            this.data.out_of_battle_sprite = diamondEnemy.oldData.out_of_battle_sprite;
        }

        if(this.context.specs.flags.a) {
            this.data.xp = Math.ceil(this.data.xp * 1.3);
            this.data.xp = Math.max(this.data.xp, 4);

            // Clumsy Robot
            if(this.data.final_action === 243) {
                this.data.final_action = 0;
            }
        }

        if(this.context.specs.flags.easymodo) {
            this.data.hp = 1;
            this.data.pp = 1;
            this.data.offense = 1;
            this.data.speed = 1;
            this.data.iq = 1;
        }

        if(this.context.specs.flags.c >= 2) {
            // Improve mirror success odds if special abilities are shuffled
            let mirrorImprove = this.context.random.randint(5, 25);
            if(!this.isBoss) {
                mirrorImprove += 10;
            }
            this.data.mirror_success_rate = Math.min(100, this.data.mirror_success_rate + mirrorImprove);
        }
        
        if(this.context.specs.flags.z.randomDrops) {
            this.data.drop_frequency = 0;
        }
    }
}

const battlePaletteMutator = (o) => {
    if(o.context.specs.flags.p >= 1 && o.context.specs.rarity[1] < 0.3) {
        return o.context.random.randint(0, 31);
    }
    return o.data.battle_palette;
};

const rangeMutator = (attr, max) => (o) => {
    return o.context.random.mutateNormal(o.data[attr], 0, max, 1); 
}

EnemyObject.mutateAttributes = {
    "hp": null,
    "pp": null,
    "xp": null,
    "money": null,
    "level": null,
    "offense": null,
    "defense": null,
    "speed": null,
    "guts": null,
    "iq": null,
    "miss_rate": null,
    "drop_frequency": rangeMutator("drop_frequency", 7),
    "drop_item_index": ItemObject,
    "mirror_success_rate": null,
    //"max_call": null,
    "weakness_fire": rangeMutator("weakness_fire", 3),
    "weakness_freeze": rangeMutator("weakness_freeze", 3),
    "weakness_flash": rangeMutator("weakness_flash", 3),
    "weakness_paralysis": rangeMutator("weakness_paralysis", 3),
    "weakness_hypnosis": rangeMutator("weakness_hypnosis", 3),
    "battle_palette": battlePaletteMutator,
};

EnemyObject.intershuffleAttributes = [
    "hp", "xp", "money", "level",
    "offense", "defense", "speed", "guts", "iq", "miss_rate",
    ["drop_item_index", "drop_frequency"], "status",
    "mirror_success_rate",
];

EnemyObject.tableSpecs = {
    text: tableText,
    count: 231,
    pointer: 0x159589,
};

EnemyObject._displayName = "enemy";
export default EnemyObject;