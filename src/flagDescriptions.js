const flagDescriptions = {
    b: {
        title: "Backgrounds",
        max: 1,
        default: 1, 
        desc: {
            1: "In-battle backgrounds will be randomized. Warning: If you are sensitive to bright flashing lights causing epilepsy or seizures, you may not want to enable this mode.",
        }
    },
    c: {
        title: "Character stats",
        max: 1,
        default: 1, 
        desc: {
            1: "Player character's stat increases on each level-up will be randomized.",
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
            1: "If in Ancient Cave, gift boxes will have a logical progression of gear and supplies. If in Normal, gift boxes will be replaced with similar content, with a 20% change of being replaced by anything.",
            2: "If in Ancient Cave, gift boxes will have a logical progression of gear and supplies. If in Normal, gift boxes will have a 100% change of being replaced by anything.",
        }
    },
    m: {
        title: "Enemy stats",
        max: 4,
        default: 2, 
        unsafe: 4,
        desc: {
            1: "Enemy stats and palettes will be randomized.",
            2: "Enemy stats, palettes, and names will be randomized.",
            3: "Enemy stats, palettes, names, and appearance will be randomized.",
            4: "Enemy stats, palettes, names, and appearance (completely) will be randomized.",
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
        title: "PC sprites",
        max: 2,
        default: 1, 
        unsafe: 2,
        desc: {
            1: "PC sprites will be randomized.",
            2: "PC sprites will be set to random characters, who may be unusually sized.",
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
        title: "Run button patch",
        max: 1,
        default: 1, 
        desc: {
            0: "No run button patch applied.",
            1: "A run button patch will be applied to the game. Hold 'Y' to run. This is the same effect as having used a Skip Sandwich.",
        }
    },
    devmode: {
        title: "Developer mode",
        max: 1,
        default: 0, 
        desc: {
            0: "No dev mode.",
            1: "Dev mode enabled. Extra info in spoiler file and other changes.",
        }
    },
}

export default flagDescriptions;