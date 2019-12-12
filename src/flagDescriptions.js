const flagDescriptions = {
    b: {
        title: "Backgrounds",
        max: 2,
        default: 2,
        desc: {
            1: "In-battle backgrounds will be randomized. Warning: If you are sensitive to bright flashing lights causing epilepsy or seizures, you may not want to enable this mode.",
            2: "In-battle backgrounds will be randomized and color-shifted. Warning: If you are sensitive to bright flashing lights causing epilepsy or seizures, you may not want to enable this mode.",
        }
    },
    c: {
        title: "Character stats",
        max: 2,
        default: 2,
        desc: {
            1: "Player characters' stat increases on each level-up will be randomized.",
            2: "Player characters' special abilities (Pray, Spy, Mirror) will be shuffled, and stat increases on each level-up will be randomized. Spy and Mirror will be improved.",
        }
    },
    d: {
        title: "Dialogue",
        max: 2,
        default: 2,
        desc: {
            1: "NPCs with non-vital dialogue will have their lines shuffled.",
            2: "NPCs with non-vital dialogue will have their lines shuffled, and Heavily Armed Pokey will have random special lines.",
        }
    },
    g: {
        title: "Gift box contents",
        max: 2,
        default: 1,
        desc: {
            1: "If in Ancient Cave, gift boxes will have a logical progression of gear and supplies. In other modes, gift boxes will be replaced with similar content, with a 20% chance of being replaced by anything.",
            2: "If in Ancient Cave, gift boxes will have a logical progression of gear and supplies. In other modes, gift boxes will have a 100% chance of being replaced by anything.",
        }
    },
    i: {
        title: "PSI abilities",
        max: 2,
        default: 1,
        unsafe: 2,
        desc: {
            1: "Levels that PSI abilities are learned at will be randomized.",
            2: "Levels that PSI abilities are learned at, as well as which abilities are learned by which PC, will be randomized.",
        }
    },
    m: {
        title: "Enemy stats",
        max: 4,
        default: 2,
        unsafe: 4,
        desc: {
            1: "Enemy stats will be randomized.",
            2: "Enemy stats and names will be randomized.",
            3: "Enemy stats, names, and appearance will be randomized.",
            4: "Enemy stats, names, and appearance (completely) will be randomized.",
        }
    },
    n: {
        title: "NPC sprites",
        max: 3,
        default: 1,
        unsafe: 2,
        desc: {
            1: "Overworld NPC sprites will be randomized.",
            2: "Overworld NPC sprites will be randomized, without taking into consideration appropriate size.",
            3: "Overworld NPC sprites will be utterly randomized with no exceptions.",
        }
    },
    p: {
        title: "Palettes",
        max: 3,
        default: 2,
        unsafe: 3,
        desc: {
            1: "Enemy battle palettes will be randomized.",
            2: "Enemy battle palettes and window colors will be randomized.",
            3: "Enemy battle palettes, window colors, and map palettes will be randomized.",
        }
    },
    s: {
        title: "Shops",
        max: 1,
        default: 1,
        desc: {
            1: "Shop contents will be randomized with similar contents.",
        }
    },
    u: {
        title: "Game improvement patches",
        bitfield: true,
        opened: true,
        default: 21,
        fields: {
            1: "runButton",
            2: "ludicrousSpeed",
            4: "discardButton",
            8: "shortPrayers",
            16: "goodsMenuEquip",
        },
        desc: {
            1: "Run Mode - You are always at Skip Sandwich speed. Hold the Y Button to walk instead.",
            2: "Ludicrous Speed Text - Text boxes, including in battle, finish instantaneously.",
            4: "Discard Button - Press the R Button while on the overworld to discard the last item received from an item box, NPC, or battle.",
            8: "Short Giygas Prayers - The cutscenes during the Giygas battle are shortened.",
            16: "Goods Menu Equip - If you 'Use' an item in the Goods menu, it will equip if possible."
        }
    },
    w: {
        title: "Music",
        max: 3,
        default: 0,
        desc: {
            1: "In Ancient Cave, each floor will have its own music. In other modes, areas will have shuffled music.",
            2: "Battle music will be shuffled. In Ancient Cave, each floor will have its own music. In other modes, areas will have shuffled music.",
            3: "Battle and map music may be intermixed. Battle music will be shuffled. In Ancient Cave, each floor will have its own music. In other modes, areas will have shuffled music."
        }
    },
    z: {
        title: "Challenges",
        bitfield: true,
        default: 0,
        fields: {
            1: "noNess",
            2: "noPaula",
            4: "noJeff",
            8: "noPoo",
            16: "cashChests",
            32: "noHealSanctuaries",
            64: "instantRolldown",
            128: "allDiamonds",
            256: "ghostsAndShrooms",
            512: "longParty",
            1024: "yesBubble",
        },
        desc: {
            1: "Ancient Cave: No Ness in party",
            2: "Ancient Cave: No Paula in party",
            4: "Ancient Cave: No Jeff in party",
            8: "Ancient Cave: No Poo in party",
            16: "Only cash in chests (except progress/skip items)",
            32: "Sanctuaries do not heal party members",
            64: "HP rolldown instant speed",
            128: "All overworld enemy non-boss sprites are diamonds",
            256: "Constantly plagued by mini-ghosts and mushrooms",
            512: "Long party member follow distance",
            1024: "Ancient Cave: Bubble Monkey in party",
        }
    },
    devmode: {
        title: "Developer mode",
        max: 2,
        default: 0,
        desc: {
            0: "Disabled.",
            1: "Extra info in spoiler file and other development-oriented changes.",
            2: "Extra info in spoiler file and other development-oriented changes, and a debugger hook post-generation.",
        }
    },
    easymodo: {
        title: "Easy mode",
        max: 1,
        default: 0,
        desc: {
            0: "Disabled.",
            1: "Lvl 99, protective gear, enemy HP 1, no spawn plates.",
        }
    },
    giygastest: {
        title: "Giygas test mode",
        max: 1,
        default: 0,
        desc: {
            0: "Disabled.",
            1: "Ness's room connected to Giygas.",
        }
    },
}

export default flagDescriptions;
