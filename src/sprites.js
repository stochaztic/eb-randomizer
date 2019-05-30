import importAll from 'import-all.macro';
const urls = importAll.sync('./sprites/**/*.bin');

export const customCharacters = [
    {
        label: "Mega Man",
        value: "MegaMan",
        creator: "Artheau",
        sprites: {
            main: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304, 2496, 2688, 2880],
            },
            robot: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 769, 961, 1152, 1344, 1536, 1728, 768, 1920],
            },
            bike: {
                indexes: [0, 768, 1536, 2304, 3072, 3840, 4608, 5376, 0, 768, 3072, 3840, 3072, 3840, 0, 768],
            },
            dead: {
                indexes: [0, 192, 385, 577, 768, 768, 384, 576, 960, 192, 1152, 768, 1152, 768, 960, 192],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
            },
            ladder: {
                indexes: [0, 1, 0, 1, 0, 1, 0, 1],
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            mini: {
                indexes: [0, 1, 129, 257, 384, 385, 128, 256, 0, 1, 384, 385, 384, 385, 0, 1],
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            meditate: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
            },
            pj: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1537, 1729, 1921, 2113, 1920, 2112, 1536, 1728],
            },
            deadRobot: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
            },
        },
    },
    {
        label: "Proto Man",
        value: "ProtoMan",
        creator: "Artheau",
        sprites: {
            main: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304, 2496, 2688, 2880],
            },
            robot: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1153, 1345, 1537, 1729, 1536, 1728, 1152, 1344],
            },
            nude: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1153, 1345, 1536, 1728, 1920, 2112, 1152, 1344],
            },
            bike: {
                indexes: [0,768,1537,2305,3072,3840,2304,4608,0,768,3072,3840,3072,3840,0,768],
            },
            dead: {
                indexes: [0, 192, 385, 577, 768, 768, 384, 576, 960, 192, 1152, 768, 1152, 768, 960, 192],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
            },
            ladder: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            mini: {
                indexes: [0,128,257,385,512,640,256,384,0,128,512,640,512,640,0,128],
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            meditate: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            bedNess: {
                indexes: [0, 128, 0, 256, 0, 128, 0, 256],
            },
            pj: {
                indexes: [0,1,193,385,576,577,192,384,769,1,961,577,961,577,769,1],
            },
            deadRobot: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
            },
        },
    },
    {
        label: "Tessie",
        value: "Tessie",
        creator: "TheKubliest",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 1153, 1345, 1152, 1344, 0, 192],
                palette: 20,
            },
            robot: {
                indexes: [0, 192, 385, 577, 768, 769, 384, 576, 961, 1153, 1345, 1537, 1344, 1536, 960, 1152],
            },
            bike: {
                indexes: [0, 768, 1537, 2305, 3072, 3840, 1536, 2304, 0, 768, 4608, 5376, 6144, 6912, 0, 768],
                palette: 20,
            },
            dead: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 1153, 1345, 1152, 1152, 0, 192],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 20,
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 20,
            },
            down: {
                indexes: [0, 192, 0, 192, 0, 192, 193, 1],
                palette: 20,
            },
            ladder: {
                indexes: [0, 1, 0, 1, 0, 1, 0, 1],
                palette: 20,
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                palette: 20,
            },
            mini: {
                indexes: [0, 128, 257, 385, 512, 640, 256, 384, 0, 128, 512, 640, 512, 640, 0, 128],
                palette: 20,
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 20,
            },
            meditate: {
                indexes: [0, 0, 0, 0, 192, 192, 192, 192],
                palette: 20,
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
                palette: 20,
            },
            pj: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 1153, 1345, 1152, 1344, 0, 192],
                palette: 20,
            },
            deadRobot: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 193],
            },
        },
    },
    {
        label: "Dog (Laika)",
        value: "Laika",
        creator: "TheKubliest",
        sprites: {
            main: {
                indexes: [0,192,384,576,768,960,1152,1344,0,192,384,576,1536,1344,0,192],
                palette: 18,
            },
            robot: {
                indexes: [0,192,384,576,768,960,1152,1344,0,192,384,576,1152,1344,0,192],
            },
            bike: {
                indexes: [0,768,1536,2304,3072,3840,4608,5376,0,768,6144,6912,3072,3840,0,768],
                palette: 18,
            },
            dead: {
                indexes: [0,192,384,576,768,960,1152,1344,0,192,768,960,768,960,0,192],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 18,
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 18,
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 18,
            },
            ladder: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 18,
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                palette: 18,
            },
            mini: {
                indexes: [0,128,256,384,512,640,768,896,0,128,512,640,512,640,0,128],
                palette: 18,
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 18,
            },
            meditate: {
                indexes: [0, 0, 0, 0, 192, 192, 192, 192],
                palette: 18,
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
                palette: 18,
            },
            pj: {
                indexes: [0,192,384,576,768,960,1152,1344,0,192,384,1536,1152,1344,0,192],
                palette: 18,
            },
            deadRobot: {
                indexes: [0, 0, 0, 0, 0, 0, 192, 192],
            },
        },
    },
    {
        label: "The Batter",
        value: "TheBatter",
        creator: "Bacon",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 577, 576, 576, 577, 1, 0],
            },
            robot: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1153, 1345, 1537, 1729, 1536, 1728, 1152, 1344],
            },
            nude: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 576, 577, 577, 576, 1, 0],
            },
            bike: {
                indexes: [0, 768, 1536, 2304, 3072, 3840, 4608, 5376, 0, 768, 3072, 3840, 3072, 3840, 0, 768],
            },
            dead: {
                indexes: [0, 0, 193, 193, 384, 384, 192, 192, 0, 0, 384, 384, 384, 384, 0, 0],
            },
            fuzzy: {
                indexes: [1, 1, 1, 1, 0, 0, 1, 1],
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
            },
            ladder: {
                indexes: [0, 1, 0, 1, 0, 1, 0, 1],
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            mini: {
                indexes: [0, 1, 129, 257, 0, 1, 128, 256, 0, 1, 0, 1, 0, 1, 0, 1],
            },
            jump: {
                indexes: [1, 1, 1, 1, 0, 0, 1, 1],
            },
            meditate: {
                indexes: [0, 0, 1, 1, 192, 192, 193, 193],
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
            },
            pj: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 577, 576, 576, 577, 1, 0],
            },
            deadRobot: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
            },
        },
    },
    {
        label: "Chu",
        value: "Chu",
        creator: "Satsy",
        sprites: {
            main: {
                indexes: [0,192,384,576,768,960,1152,1344,1536,1728,1920,2112,2304,2496,2688,2880],
            },
            robot: {
                indexes: [0,192,385,577,768,960,384,576,1153,1345,1536,1728,1920,2112,2304,1344],
            },
            dead: {
                indexes: [0,0,192,192,384,384,576,576,0,0,384,384,384,384,0,0],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            ladder: {
                indexes: [0,192,384,192,0,192,0,192],
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            mini: {
                indexes: [0,1,129,257,384,385,128,512,0,1,0,1,384,385,384,385],
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            pj: {
                indexes: [0,192,384,576,384,576,384,576,0,192,384,576,384,576,0,192],
            },
        },
    },
    {
        label: "Pride Ness",
        value: "PrideNess",
        creator: "stochaztic",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 960, 1153, 1345, 1537, 1729, 1536, 1728, 1152, 1344],
            },
            pj: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304, 2496, 2688, 2880],
            },
        },
    },
    {
        label: "Ninten",
        value: "Ninten",
        creator: "the salvation phoenix",
        sprites: {
            main: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1537, 1729, 1921, 2113, 1920, 2112, 1536, 1728],
            },
            dead: {
                indexes: [0, 0, 193, 193, 384, 384, 192, 192, 1, 1, 384, 384, 384, 384, 1, 1],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
        },
    },
    {
        label: "Teddy",
        value: "Teddy",
        creator: "EBrent",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 384, 961, 1153, 1345, 1537, 1344, 1536, 960, 1152],
            },
        },
    },
    {
        label: "Ness's Hat",
        value: "NessHat",
        creator: "stochaztic",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1152, 1344, 1537, 1729, 1536, 1728, 1920, 2112],
            },
            dead: {
                indexes: [0, 0, 1, 1, 192, 192, 384, 384, 1, 1, 192, 192, 192, 192, 1, 1],
            },
            ladder: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            rope: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
        },
    },
    {
        label: "Kris (Deltarune)",
        value: "KrisDeltarune",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,192,384,576,768,960,1152,1344,0,192,768,960,768,960,0,192],
                palette: 16,
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 16,
            },
            ladder: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 16,
            },
            rope: {
                indexes: [0,192,0,192,384,576,0,192],
                palette: 16,
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 16,
            },
            pj: {
                indexes: [0,192,385,577,768,960,384,576,0,192,768,960,768,960,0,192],
            },
        },
    },
    {
        label: "Lancer",
        value: "Lancer",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,192,385,577,768,769,384,576,960,961,768,769,768,769,960,961],
                palette: 16,
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 16,
            },
            ladder: {
                indexes: [0, 1, 0, 1, 0, 1, 0, 1],
                palette: 16,
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 16,
            },
            meditate: {
                indexes: [0, 0, 0, 0, 192, 192, 192, 192],
                palette: 16,
            },
        },
    },
    {
        label: "Ralsei",
        value: "Ralsei",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,192,385,577,768,960,384,576,0,1152,768,1344,768,960,0,1152],
                palette: 16,
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 16,
            },
            ladder: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 16,
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 16,
            },
        },
    },
    {
        label: "Susie",
        value: "Susie",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,1,193,385,576,577,192,384,0,1,576,577,769,577,0,1],
                palette: 16,
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 16,
            },
            ladder: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 16,
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 16,
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                palette: 16,
            },
        },
    },
    {
        label: "Dragon Ness",
        value: "DragonNess",
        creator: "Quatropus / Aurilliux",
        sprites: {
            main: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1537, 1729, 1921, 2113, 2304, 2112, 2496, 1728],
            },
            dead: {
                indexes: [0, 0, 193, 193, 384, 384, 192, 192, 0, 0, 384, 384, 384, 384, 0, 0],
            },
            fuzzy: {
                indexes: [0, 192, 0, 0, 0, 0, 0, 0],
            },
            bedJeff: {
                indexes: [0, 256, 0, 0, 0, 0, 0, 0],
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 576, 576],
            },
            ladder: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            mini: {
                indexes: [0, 1, 128, 256, 384, 385, 512, 640, 768, 769, 384, 385, 897, 385, 0, 1],
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            meditate: {
                indexes: [0, 0, 0, 0, 192, 192, 192, 192],
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
            },
            pj: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304, 2496, 2688, 2880],
            },
        },
    },
    {
        label: "Dragon Paula",
        value: "DragonPaula",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,192,385,577,768,769,384,576,0,192,768,769,768,769,0,192],
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            ladder: {
                indexes: [0,1,0,1,0,1,0,1],
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
            },
        },
    },
    {
        label: "Dragon Jeff",
        value: "DragonJeff",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,192,385,577,768,769,384,576,0,192,768,769,768,769,0,192],
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            ladder: {
                indexes: [0,1,0,1,0,1,0,1],
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
        },
    },
    {
        label: "Dragon Poo",
        value: "DragonPoo",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,1,193,385,576,577,192,384,768,769,576,577,576,577,768,769],
                palette: 20,
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            ladder: {
                indexes: [0,1,0,1,0,1,0,1],
                palette: 20,
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
                palette: 20,
            },
            meditate: {
                indexes: [0,0,0,0,192,192,192,192],
                palette: 20,
            },
        },
    },
    {
        label: "Sonic",
        value: "Sonic",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,192,385,577,768,960,1152,576,0,192,768,960,768,960,0,192],
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            ladder: {
                indexes: [0,1,0,1,0,1,0,1],
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
            },
        },
    },
    {
        label: "Amy",
        value: "Amy",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,1,193,385,576,768,192,384,0,1,576,768,576,768,0,1],
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,576,384,768,0,0],
            },
            ladder: {
                indexes: [0,1,0,1,0,1,0,1],
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
            },
        },
    },
    {
        label: "Tails",
        value: "Tails",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,1,193,385,576,768,192,384,0,1,576,768,576,768,0,1],
            },
            dead: {
                indexes: [0,0,193,385,576,576,384,192,0,0,576,576,576,576,0,0],
            },
            ladder: {
                indexes: [0,1,0,1,0,1,0,1],
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
            },
        },
    },
    {
        label: "Knuckles",
        value: "Knuckles",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0,1,192,384,576,768,960,1152,0,1,576,768,576,768,0,1],
            },
            dead: {
                indexes: [0,0,193,193,384,384,192,192,0,0,384,384,384,384,0,0],
            },
            ladder: {
                indexes: [0,1,0,1,0,1,0,1],
            },
            rope: {
                indexes: [0,192,0,192,0,192,0,192],
            },
        },
    },
    {
        label: "Aya",
        value: "Aya",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 768, 960, 768, 960, 0, 192],
            },
            dead: {
                indexes: [0, 0, 193, 193, 384, 384, 192, 192, 0, 0, 384, 384, 384, 384, 0, 0],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            ladder: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            meditate: {
                indexes:  [0, 0, 0, 0, 192, 192, 192, 192],
            },
        },
    },
    {
        label: "Kris (Pokemon)",
        value: "Kris",
        creator: "TheKubliest",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 768, 960, 193, 385, 192, 384, 768, 0],
            },
            bike: {
                indexes: [0, 768, 1537, 2305, 3072, 3840, 1536, 2304, 4608, 5376, 1537, 2305, 6144, 6912, 7680, 8448],
            },
            dead: {
                indexes: [0, 192, 385, 577, 768, 960, 576, 384, 0, 192, 768, 960, 768, 960, 0, 192],
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
            },
            ladder: {
                indexes: [0, 1, 0, 1, 0, 1, 0, 1],
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
            },
            mini: {
                indexes:  [0, 1, 129, 257, 0, 1, 128, 256, 0, 1, 0, 1, 0, 1, 0, 1],
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
            },
            pj: {
                indexes: [0, 192, 384, 576, 768, 769, 960, 1152, 1344, 192, 384, 576, 960, 1152, 1344, 0],
            },
        },
    },
    {
        label: "Blue",
        value: "Blue",
        creator: "Zephram",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 768, 960, 768, 960, 1152, 1344],
            },
        },
    },
    {
        label: "Red",
        value: "Red",
        creator: "Zephram",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 768, 960, 768, 960, 1152, 1344],
            },
        },
    },
    {
        label: "Generic Pokemon",
        value: "GenericPokemon",
        creator: "EBrent",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1153, 1345, 768, 960, 768, 960, 1152, 192],
            },
        },
    },
    {
        label: "Dragonair",
        value: "Dragonair",
        creator: "EBrent",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 193, 385, 576, 577, 192, 384],
            },
        },
    },
    {
        label: "Bart Simpson",
        value: "Bart",
        creator: "Zephram",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 384, 961, 1153, 1345, 1537, 1728, 1536, 960, 1920],
            },
            ladder: {
                indexes: [0, 1, 0, 192, 0, 1, 0, 1],
            },
            rope: {
                indexes: [0, 192, 0, 384, 0, 192, 0, 192],
            },
        },
    },
    {
        label: "Gordon Freeman",
        value: "Gordon",
        creator: "EBrent",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 193, 385, 576, 577, 192, 384],
            },
        },
    },
    {
        label: "Weird Al Yankovic",
        value: "WeirdAl",
        creator: "EBrent",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 193, 385, 576, 577, 192, 384],
            },
        },
    },
];

export const vanillaSprites = [
    { label: "Aloysius Minch", value: 147, },
    { label: "Apple Kid", value: 176, },
    { label: "Arms Dealer", value: 144, },
    { label: "Bag Lady", value: 57, },
    { label: "Baseball Cap", value: 124, },
    { label: "Bellboy", value: 73, },
    { label: "Black Rabbit", value: 107, },
    { label: "Bowler Hat", value: 125, },
    { label: "Brick Road", value: 161, },
    { label: "Bubble Monkey", value: 46, },
    { label: "Bubble Monkey's Gal", value: 160, },
    { label: "Bus Driver", value: 111, },
    { label: "Carpainter", value: 159, },
    { label: "Captain Strong", value: 75, },
    { label: "Clock", value: 326, },
    { label: "Coil Snake", value: 283, },
    { label: "Cop", value: 111, },
    { label: "Crawling Dog", value: 42, },
    { label: "Crow", value: 282, },
    { label: "Detective", value: 63, },
    { label: "Diamond", value: 306, },
    { label: "Doctor", value: 139, },
    { label: "Dr Andonuts", value: 162, },
    { label: "Drunk", value: 60, },
    { label: "Duck", value: 287, },
    { label: "Electra", value: 396, },
    { label: "Entertainer", value: 76, },
    { label: "Everdred", value: 157, },
    { label: "Flying Man", value: 39, },
    { label: "Frank", value: 153, },
    { label: "George Montague", value: 173, },
    { label: "Gerardo Montague", value: 172, },
    { label: "Ghost", value: 305, },
    { label: "Gorgeous", value: 150, },
    { label: "Grandpa", value: 52, },
    { label: "Grandma", value: 53, },
    { label: "Healer", value: 189, },
    { label: "Hippie", value: 361, },
    { label: "Jeff", value: 3, },
    { label: "Lardna Minch", value: 148, },
    { label: "Liar X Agerate", value: 152, },
    { label: "Lucky", value: 149, },
    { label: "Magic Cake Lady", value: 181, },
    { label: "Manly Fish", value: 288, },
    { label: "Maxwell", value: 69, },
    { label: "Mayor Pirkle", value: 154, },
    { label: "Mr Saturn", value: 171, },
    { label: "Mr T", value: 79, },
    {
        label: "Mole",
        value: "Mole",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 769, 577, 576, 577, 961, 1],
                palette: 22,
            },
        },
    },
    { label: "Mom", value: 145, },
    { label: "Monotoli", value: 164, },
    {
        label: "Mouse",
        value: "Mouse",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 768, 960, 576, 577, 576, 577, 0, 1],
                palette: 20,
            },
        },
    },
    { label: "Mummy", value: 307, },
    { label: "Ness", value: 1, },
    { label: "Nurse", value: 140, },
    { label: "Orange Kid", value: 175, },
    { label: "Paula", value: 2, },
    { label: "Paula's Dad", value: 155, },
    { label: "Paula's Mom", value: 156, },
    { label: "Phone Man", value: 167, },
    { label: "Photo Man", value: 143, },
    { label: "Picky", value: 45, },
    { label: "Pigpen", value: 115, },
    { label: "Pizza Guy", value: 151, },
    { label: "Pokey", value: 44, },
    { label: "Pokey Fancy", value: 48, },
    { label: "Poo", value: 4, },
    { label: "Poo's Master", value: 166, },
    { label: "Pumpkin Head", value: 444, },
    { label: "Ranboob", value: 292, },
    { label: "Robot", value: 25, },
    { label: "Saxaphonist", value: 77, },
    { label: "Sea Captain", value: 90, },
    { label: "Sentry Robot", value: 310, },
    { label: "Slots Brother", value: 110, },
    { label: "Shades Moonsidian", value: 71, },
    { label: "Shark", value: 284, },
    { label: "Shy Guy", value: 119, },
    { label: "Smilin Sphere", value: 302, },
    { label: "Starman", value: 303, },
    { label: "Starmaster", value: 98, },
    { label: "Teddy Bear", value: 51, },
    { label: "Tenda", value: 97, },
    { label: "Tenda Chieftain", value: 170, },
    { label: "Tessie Watcher", value: 83, },
    { label: "Tony", value: 182, },
    { label: "Tracy", value: 146, },
    { label: "Traffic Sign", value: 309, },
    { label: "Trash Can", value: 285, },
    { label: "Trisha", value: 97, },
    { label: "UFO", value: 304, },
    { label: "Venus", value: 165, },
    { label: "Zombie", value: 308, },
    { label: "Zombie Lady", value: 87, },
];

export const selectData = [
    {
        label: "Random",
        options: [
            { label: "No change", value: "NoChange"},
            { label: "Random vanilla", value: 999},
            { label: "Random custom", value: "RandomCustom"},
        ],
    },
    {
        label: "Custom Sprites",
        options: customCharacters,
    },
    {
        label: "Vanilla Sprites",
        options: vanillaSprites,
    },
];

export async function prepare(sprite, index) {
    const newObj = {};
    if(sprite.value === "NoChange") {
        return newObj;
    }
    if(!isNaN(sprite.value)) {
        newObj[index + 1] = sprite.value;
        return newObj;
    }
    if(sprite.value === "RandomCustom") {
        sprite = customCharacters[Math.floor(Math.random()*customCharacters.length)];
    }

    const prepareSprite = async function(individualSprite, index) {
        let url = urls[`./sprites/${sprite.value}/${index.toString().padStart(3, '0')}.bin`];
        if(!url && index === 1) {
            url = urls[`./sprites/${sprite.value}.bin`];
        }
        if(!url) {
            url = urls[`./sprites/${sprite.value}-${index.toString().padStart(3, '0')}.bin`];
        }
        if(!url) {
            throw new Error(`Could not find sprite bin file for ${sprite.value} ${index.toString().padStart(3, '0')}`);
        }
        let response = await fetch(url);
        let buffer = await response.arrayBuffer();
        let data = new Uint8Array(buffer);
        return Object.assign({palette: 26}, individualSprite, { data: data });
    };

    newObj[index + 1] = await prepareSprite(sprite.sprites.main, 1);

    if(sprite.sprites.robot && index === 0) {
        newObj[5] = await prepareSprite(sprite.sprites.robot, 5);
    }

    if(sprite.sprites.pj && index === 0) {
        newObj[437] = await prepareSprite(sprite.sprites.pj, 437);
        if(sprite.sprites.nude) {
            newObj[6] = await prepareSprite(sprite.sprites.nude, 6);
        }
        else {
            newObj[6] = newObj[437];
        }
    }

    if(sprite.sprites.bike && index === 0) {
        newObj[7] = await prepareSprite(sprite.sprites.bike, 7);
    }

    if(sprite.sprites.dead) {
        newObj[index + 8] = await prepareSprite(sprite.sprites.dead, 8);
    }

    if(sprite.sprites.fuzzy && index === 0) {
        newObj[14] = await prepareSprite(sprite.sprites.fuzzy, 14);
    }

    if(sprite.sprites.bedJeff && index === 2) {
        newObj[15] = await prepareSprite(sprite.sprites.bedJeff, 15);
    }

    if(sprite.sprites.down) {
        const newIdx = (index === 0) ? 16 : (392 + index);
        newObj[newIdx] = await prepareSprite(sprite.sprites.down, 16);
    }

    if(sprite.sprites.ladder) {
        newObj[index + 17] = await prepareSprite(sprite.sprites.ladder, 17);
    }

    if(sprite.sprites.rope) {
        newObj[index + 21] = await prepareSprite(sprite.sprites.rope, 21);
    }

    if(sprite.sprites.mini) {
        newObj[index + 27] = await prepareSprite(sprite.sprites.mini, 27);
    }

    if(sprite.sprites.jump) {
        newObj[index + 335] = await prepareSprite(sprite.sprites.jump, 335);
    }

    if(sprite.sprites.meditate && index === 3) {
        newObj[362] = await prepareSprite(sprite.sprites.meditate, 362);
    }

    if(sprite.sprites.bedNess && index === 0) {
        newObj[378] = await prepareSprite(sprite.sprites.bedNess, 378);
    }

    if(sprite.sprites.deadRobot && index === 0) {
        newObj[457] = await prepareSprite(sprite.sprites.deadRobot, 457);
    }

    return newObj;
}