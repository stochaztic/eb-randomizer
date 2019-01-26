import PrideNess from './sprites/PrideNess.bin';
import PrideNessPJ from './sprites/PrideNess-PJ.bin';
import Ninten from './sprites/Ninten.bin';
import NintenDead from './sprites/Ninten-Dead.bin';
import NintenFuzzy from './sprites/Ninten-Fuzzy.bin';
import Teddy from './sprites/Teddy.bin';
import NessHat from './sprites/NessHat.bin';
import NessHatClimb from './sprites/NessHat-Climb.bin';
import Halo from './sprites/Halo.bin';
import Bart from './sprites/Bart.bin';
import BartRope from './sprites/Bart-Rope.bin';
import BartLadder from './sprites/Bart-Ladder.bin';
import DragonPaula from './sprites/DragonPaula.bin';
import DragonJeff from './sprites/DragonJeff.bin';
import DragonPoo from './sprites/DragonPoo.bin';
import Sonic from './sprites/Sonic.bin';
import Amy from './sprites/Amy.bin';
import Tails from './sprites/Tails.bin';
import Knuckles from './sprites/Knuckles.bin';
import Blue from './sprites/Blue.bin';
import Red from './sprites/Red.bin';
import GenericPokemon from './sprites/GenericPokemon.bin';
import Dragonair from './sprites/Dragonair.bin';
import Gordon from './sprites/Gordon.bin';
import WeirdAl from './sprites/WeirdAl.bin';

import Mole from './sprites/Mole.bin';
import Mouse from './sprites/Mouse.bin';

import ProtoMan001 from './sprites/ProtoMan/001.bin';
import ProtoMan005 from './sprites/ProtoMan/005.bin';
import ProtoMan006 from './sprites/ProtoMan/006.bin';
import ProtoMan007 from './sprites/ProtoMan/007.bin';
import ProtoMan008 from './sprites/ProtoMan/008.bin';
import ProtoMan014 from './sprites/ProtoMan/014.bin';
import ProtoMan015 from './sprites/ProtoMan/015.bin';
import ProtoMan016 from './sprites/ProtoMan/016.bin';
import ProtoMan017 from './sprites/ProtoMan/017.bin';
import ProtoMan021 from './sprites/ProtoMan/021.bin';
import ProtoMan027 from './sprites/ProtoMan/027.bin';
import ProtoMan335 from './sprites/ProtoMan/335.bin';
import ProtoMan362 from './sprites/ProtoMan/362.bin';
import ProtoMan378 from './sprites/ProtoMan/378.bin';
import ProtoMan437 from './sprites/ProtoMan/437.bin';
import ProtoMan457 from './sprites/ProtoMan/457.bin';

import Tessie001 from './sprites/Tessie/001.bin';
import Tessie005 from './sprites/Tessie/005.bin';
import Tessie007 from './sprites/Tessie/007.bin';
import Tessie008 from './sprites/Tessie/008.bin';
import Tessie014 from './sprites/Tessie/014.bin';
import Tessie015 from './sprites/Tessie/015.bin';
import Tessie016 from './sprites/Tessie/016.bin';
import Tessie017 from './sprites/Tessie/017.bin';
import Tessie021 from './sprites/Tessie/021.bin';
import Tessie027 from './sprites/Tessie/027.bin';
import Tessie335 from './sprites/Tessie/335.bin';
import Tessie362 from './sprites/Tessie/362.bin';
import Tessie378 from './sprites/Tessie/378.bin';
import Tessie437 from './sprites/Tessie/437.bin';
import Tessie457 from './sprites/Tessie/457.bin';

import Kris001 from './sprites/Kris/001.bin';
import Kris007 from './sprites/Kris/007.bin';
import Kris008 from './sprites/Kris/008.bin';
import Kris014 from './sprites/Kris/014.bin';
import Kris015 from './sprites/Kris/015.bin';
import Kris016 from './sprites/Kris/016.bin';
import Kris017 from './sprites/Kris/017.bin';
import Kris021 from './sprites/Kris/021.bin';
import Kris027 from './sprites/Kris/027.bin';
import Kris378 from './sprites/Kris/378.bin';
import Kris437 from './sprites/Kris/437.bin';

import DragonNess001 from './sprites/DragonNess/001.bin';
import DragonNess008 from './sprites/DragonNess/008.bin';
import DragonNess014 from './sprites/DragonNess/014.bin';
import DragonNess015 from './sprites/DragonNess/015.bin';
import DragonNess016 from './sprites/DragonNess/016.bin';
import DragonNess017 from './sprites/DragonNess/017.bin';
import DragonNess021 from './sprites/DragonNess/021.bin';
import DragonNess027 from './sprites/DragonNess/027.bin';
import DragonNess335 from './sprites/DragonNess/335.bin';
import DragonNess362 from './sprites/DragonNess/362.bin';
import DragonNess378 from './sprites/DragonNess/378.bin';
import DragonNess437 from './sprites/DragonNess/437.bin';

export const customCharacters = [
    {
        label: "Proto Man",
        value: "ProtoMan",
        creator: "Artheau",
        sprites: {
            main: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304, 2496, 2688, 2880],
                data: ProtoMan001,
                palette: 26,
            },
            robot: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1153, 1345, 1537, 1729, 1536, 1728, 1152, 1344],
                data: ProtoMan005,
                palette: 26,
            },
            nude: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1153, 1345, 1536, 1728, 1920, 2112, 1152, 1344],
                data: ProtoMan006,
                palette: 26,
            },
            bike: {
                indexes: [0, 768, 1536, 2304, 3072, 3840, 4608, 5376, 6145, 6913, 7681, 8449, 7680, 9216, 6144, 6912],
                data: ProtoMan007,
                palette: 26,
            },
            dead: {
                indexes: [0, 192, 385, 577, 768, 768, 384, 576, 960, 192, 1152, 768, 1152, 768, 960, 192],
                data: ProtoMan008,
                palette: 26,
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: ProtoMan014,
                palette: 26,
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: ProtoMan015,
                palette: 26,
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
                data: ProtoMan016,
                palette: 26,
            },
            ladder: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                data: ProtoMan017,
                palette: 26,
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                data: ProtoMan021,
                palette: 26,
            },
            mini: {
                indexes: [0, 128, 257, 385, 0, 128, 256, 384, 0, 128, 0, 128, 0, 128, 0, 128],
                data: ProtoMan027,
                palette: 26,
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: ProtoMan335,
                palette: 26,
            },
            meditate: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: ProtoMan362,
                palette: 26,
            },
            bedNess: {
                indexes: [0, 128, 0, 256, 0, 128, 0, 256],
                data: ProtoMan378,
                palette: 26,
            },
            pj: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1152, 192, 1344, 960, 1344, 960, 1152, 192],
                data: ProtoMan437,
                palette: 26,
            },
            deadRobot: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
                data: ProtoMan457,
                palette: 26,
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
                data: Tessie001,
                palette: 20,
            },
            robot: {
                indexes: [0, 192, 385, 577, 768, 769, 384, 576, 961, 1153, 1345, 1537, 1344, 1536, 960, 1152],
                data: Tessie005,
                palette: 26,
            },
            bike: {
                indexes: [0, 768, 1537, 2305, 3072, 3840, 1536, 2304, 0, 768, 4608, 5376, 6144, 6912, 0, 768],
                data: Tessie007,
                palette: 20,
            },
            dead: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 1153, 1345, 1152, 1152, 0, 192],
                data: Tessie008,
                palette: 26,
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: Tessie014,
                palette: 20,
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: Tessie015,
                palette: 20,
            },
            down: {
                indexes: [0, 192, 0, 192, 0, 192, 193, 1],
                data: Tessie016,
                palette: 20,
            },
            ladder: {
                indexes: [0, 1, 0, 1, 0, 1, 0, 1],
                data: Tessie017,
                palette: 20,
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                data: Tessie021,
                palette: 20,
            },
            mini: {
                indexes: [0, 128, 257, 385, 512, 640, 256, 384, 0, 128, 512, 640, 512, 640, 0, 128],
                data: Tessie027,
                palette: 20,
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: Tessie335,
                palette: 20,
            },
            meditate: {
                indexes: [0, 0, 0, 0, 192, 192, 192, 192],
                data: Tessie362,
                palette: 20,
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
                data: Tessie378,
                palette: 20,
            },
            pj: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 1153, 1345, 1152, 1344, 0, 192],
                data: Tessie437,
                palette: 20,
            },
            deadRobot: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 193],
                data: Tessie457,
                palette: 26,
            },
        },
    },
    {
        label: "Pride Ness",
        value: "PrideNess",
        creator: "pickfifteen",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 960, 1153, 1345, 1537, 1729, 1536, 1728, 1152, 1344],
                data: PrideNess,
                palette: 26,
            },
            pj: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304, 2496, 2688, 2880],
                data: PrideNessPJ,
                palette: 26,
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
                data: Ninten,
                palette: 26,
            },
            dead: {
                indexes: [0, 0, 193, 193, 384, 384, 192, 192, 1, 1, 384, 384, 384, 384, 1, 1],
                data: NintenDead,
                palette: 26,
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: NintenFuzzy,
                palette: 26,
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
                data: Teddy,
                palette: 26,
            },
        },
    },
    {
        label: "Ness's Hat",
        value: "NessHat",
        creator: "pickfifteen",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 1152, 1344, 1537, 1729, 1536, 1728, 1920, 2112],
                data: NessHat,
                palette: 26,
            },
            dead: {
                indexes: [0, 0, 1, 1, 192, 192, 384, 384, 1, 1, 192, 192, 192, 192, 1, 1],
                data: Halo,
                palette: 26,
            },
            ladder: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: NessHatClimb,
                palette: 26,
            },
            rope: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: NessHatClimb,
                palette: 26,
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
                data: DragonNess001,
                palette: 26,
            },
            dead: {
                indexes: [0, 0, 193, 193, 384, 384, 192, 192, 0, 0, 384, 384, 384, 384, 0, 0],
                data: DragonNess008,
                palette: 26,
            },
            fuzzy: {
                indexes: [0, 192, 0, 0, 0, 0, 0, 0],
                data: DragonNess014,
                palette: 26,
            },
            bedJeff: {
                indexes: [0, 256, 0, 0, 0, 0, 0, 0],
                data: DragonNess015,
                palette: 26,
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 576, 576],
                data: DragonNess016,
                palette: 26,
            },
            ladder: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                data: DragonNess017,
                palette: 26,
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                data: DragonNess021,
                palette: 26,
            },
            mini: {
                indexes: [0, 1, 128, 256, 384, 385, 512, 640, 768, 769, 384, 385, 897, 385, 0, 1],
                data: DragonNess027,
                palette: 26,
            },
            jump: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: DragonNess335,
                palette: 26,
            },
            meditate: {
                indexes: [0, 0, 0, 0, 192, 192, 192, 192],
                data: DragonNess362,
                palette: 26,
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
                data: DragonNess378,
                palette: 26,
            },
            pj: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 1536, 1728, 1920, 2112, 2304, 2496, 2688, 2880],
                data: DragonNess437,
                palette: 26,
            },
        },
    },
    {
        label: "Dragon Paula",
        value: "DragonPaula",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 769, 960, 576, 0, 192, 768, 769, 768, 769, 0, 192],
                data: DragonPaula,
                palette: 26,
            },
        },
    },
    {
        label: "Dragon Jeff",
        value: "DragonJeff",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 769, 384, 576, 0, 192, 768, 769, 768, 769, 0, 192],
                data: DragonJeff,
                palette: 26,
            },
        },
    },
    {
        label: "Dragon Poo",
        value: "DragonPoo",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 384, 0, 1, 576, 768, 576, 768, 0, 1],
                data: DragonPoo,
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
                indexes: [0, 192, 385, 577, 768, 769, 960, 576, 0, 192, 768, 769, 768, 769, 0, 192],
                data: Sonic,
                palette: 26,
            },
        },
    },
    {
        label: "Amy",
        value: "Amy",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 0, 1, 576, 577, 576, 577, 0, 1],
                data: Amy,
                palette: 26,
            },
        },
    },
    {
        label: "Tails",
        value: "Tails",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 960, 0, 1, 576, 768, 576, 768, 0, 1],
                data: Tails,
                palette: 26,
            },
        },
    },
    {
        label: "Knuckles",
        value: "Knuckles",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 1, 192, 384, 576, 768, 960, 1152, 0, 1, 576, 768, 576, 768, 0, 1],
                data: Knuckles,
                palette: 26,
            },
        },
    },
    {
        label: "Kris",
        value: "Kris",
        creator: "TheKubliest",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 577, 192, 384, 768, 960, 193, 385, 192, 384, 768, 0],
                data: Kris001,
                palette: 26,
            },
            bike: {
                indexes: [0, 768, 1537, 2305, 3072, 3840, 1536, 2304, 4608, 5376, 1537, 2305, 6144, 6912, 7680, 8448],
                data: Kris007,
                palette: 26,
            },
            dead: {
                indexes: [0, 192, 385, 577, 768, 960, 576, 384, 0, 192, 768, 960, 768, 960, 0, 192],
                data: Kris008,
                palette: 26,
            },
            fuzzy: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: Kris014,
                palette: 26,
            },
            bedJeff: {
                indexes: [0, 0, 0, 0, 0, 0, 0, 0],
                data: Kris015,
                palette: 26,
            },
            down: {
                indexes: [0, 0, 0, 0, 0, 0, 1, 1],
                data: Kris016,
                palette: 26,
            },
            ladder: {
                indexes: [0, 1, 0, 1, 0, 1, 0, 1],
                data: Kris017,
                palette: 26,
            },
            rope: {
                indexes: [0, 192, 0, 192, 0, 192, 0, 192],
                data: Kris021,
                palette: 26,
            },
            mini: {
                indexes:  [0, 1, 129, 257, 0, 1, 128, 256, 0, 1, 0, 1, 0, 1, 0, 1],
                data: Kris027,
                palette: 26,
            },
            bedNess: {
                indexes: [0, 128, 0, 128, 0, 128, 0, 128],
                data: Kris378,
                palette: 26,
            },
            pj: {
                indexes: [0, 192, 384, 576, 768, 769, 960, 1152, 1344, 192, 384, 576, 960, 1152, 1344, 0],
                data: Kris437,
                palette: 26,
            },
        },
    },
    {
        label: "Blue",
        value: "Blue",
        creator: "Arithium",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 768, 960, 768, 960, 1152, 1344],
                data: Blue,
                palette: 26,
            },
        },
    },
    {
        label: "Red",
        value: "Red",
        creator: "Arithium",
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 960, 384, 576, 0, 192, 768, 960, 768, 960, 1152, 1344],
                data: Red,
                palette: 26,
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
                data: GenericPokemon,
                palette: 26,
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
                data: Dragonair,
                palette: 26,
            },
        },
    },
    {
        label: "Bart Simpson",
        value: "BartSimpson",
        creator: "Quatropus",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 384, 961, 1153, 1345, 1537, 1728, 1536, 960, 1920],
                data: Bart,
                palette: 26,
            },
            ladder: {
                indexes: [0, 1, 0, 192, 0, 1, 0, 1],
                data: BartLadder,
                palette: 26,
            },
            rope: {
                indexes: [0, 192, 0, 384, 0, 192, 0, 192],
                data: BartRope,
                palette: 26,
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
                data: Gordon,
                palette: 26,
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
                data: WeirdAl,
                palette: 26,
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
                data: Mole,
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
                data: Mouse,
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

    const prepareSprite = async function(sprite) {
        let response = await fetch(sprite.data);
        let buffer = await response.arrayBuffer();
        let data = new Uint8Array(buffer);
        return Object.assign({}, sprite, { data: data });
    };

    newObj[index + 1] = await prepareSprite(sprite.sprites.main);

    if(sprite.sprites.robot && index === 0) {
        newObj[5] = await prepareSprite(sprite.sprites.robot);
    }

    if(sprite.sprites.pj && index === 0) {
        newObj[437] = await prepareSprite(sprite.sprites.pj);
        if(sprite.sprites.nude) {
            newObj[6] = await prepareSprite(sprite.sprites.nude);
        }
        else {
            newObj[6] = newObj[437];
        }
    }

    if(sprite.sprites.bike && index === 0) {
        newObj[7] = await prepareSprite(sprite.sprites.bike);
    }

    if(sprite.sprites.dead) {
        newObj[index + 8] = await prepareSprite(sprite.sprites.dead);
    }

    if(sprite.sprites.fuzzy && index === 0) {
        newObj[14] = await prepareSprite(sprite.sprites.fuzzy);
    }

    if(sprite.sprites.bedJeff && index === 2) {
        newObj[15] = await prepareSprite(sprite.sprites.bedJeff);
    }

    if(sprite.sprites.down) {
        const newIdx = (index === 0) ? 16 : (392 + index);
        newObj[newIdx] = await prepareSprite(sprite.sprites.down);
    }

    if(sprite.sprites.ladder) {
        newObj[index + 17] = await prepareSprite(sprite.sprites.ladder);
    }

    if(sprite.sprites.rope) {
        newObj[index + 21] = await prepareSprite(sprite.sprites.rope);
    }

    if(sprite.sprites.mini) {
        newObj[index + 27] = await prepareSprite(sprite.sprites.mini);
    }

    if(sprite.sprites.jump) {
        newObj[index + 335] = await prepareSprite(sprite.sprites.jump);
    }

    if(sprite.sprites.meditate && index === 3) {
        newObj[362] = await prepareSprite(sprite.sprites.meditate);
    }

    if(sprite.sprites.bedNess && index === 0) {
        newObj[378] = await prepareSprite(sprite.sprites.bedNess);
    }

    if(sprite.sprites.deadRobot && index === 0) {
        newObj[457] = await prepareSprite(sprite.sprites.deadRobot);
    }

    return newObj;
}