import NessPride from './sprites/NessPride.bin';
import Ninten from './sprites/Ninten.bin';
import NintenDead from './sprites/Ninten-Dead.bin';
import NintenFuzzy from './sprites/Ninten-Fuzzy.bin';
import Bart from './sprites/Bart.bin';
import DragonNess from './sprites/DragonNess.bin';
import DragonPaula from './sprites/DragonPaula.bin';
import DragonJeff from './sprites/DragonJeff.bin';

export const customCharacters = [
    {
        label: "Ness Pride",
        value: "NessPride",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 960, 1153, 1345, 1537, 1729, 1536, 1728, 1152, 1344],
                data: NessPride,
                palette: 26,
            },
        },
    },
    {
        label: "Ninten",
        value: "Ninten",
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
        label: "Bart",
        value: "Bart",
        sprites: {
            main: {
                indexes: [0, 1, 193, 385, 576, 768, 192, 384, 961, 1153, 1345, 1537, 1728, 1536, 960, 1920],
                data: Bart,
                palette: 26,
            },
        },
    },
    {
        label: "Dragon Ness",
        value: "DragonNess",
        sprites: {
            main: {
                indexes: [0, 192, 384, 576, 768, 960, 1152, 1344, 0, 192, 768, 960, 768, 960, 0, 192],
                data: DragonNess,
                palette: 26,
            },
        },
    },
    {
        label: "Dragon Paula",
        value: "DragonPaula",
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
        sprites: {
            main: {
                indexes: [0, 192, 385, 577, 768, 769, 384, 576, 0, 192, 768, 769, 768, 769, 0, 192],
                data: DragonJeff,
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
    { label: "Lardna Minch", value: 148, },
    { label: "Liar X Agerate", value: 152, },
    { label: "Lucky", value: 149, },
    { label: "Magic Cake Lady", value: 181, },
    { label: "Manly Fish", value: 288, },
    { label: "Maxwell", value: 69, },
    { label: "Mayor Pirkle", value: 154, },
    { label: "Mr Saturn", value: 171, },
    { label: "Mr T", value: 79, },
    { label: "Mom", value: 145, },
    { label: "Monotoli", value: 164, },
    { label: "Mummy", value: 307, },
    { label: "Nurse", value: 140, },
    { label: "Orange Kid", value: 175, },
    { label: "Paula's Dad", value: 155, },
    { label: "Paula's Mom", value: 156, },
    { label: "Phone Man", value: 167, },
    { label: "Photo Man", value: 143, },
    { label: "Picky", value: 45, },
    { label: "Pigpen", value: 115, },
    { label: "Pizza Guy", value: 151, },
    { label: "Pokey", value: 44, },
    { label: "Pokey Fancy", value: 48, },
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
    let response = await fetch(sprite.sprites.main.data);
    let buffer = await response.arrayBuffer();
    let data = new Uint8Array(buffer);
    newObj[index + 1] = Object.assign({}, sprite.sprites.main, { data: data });

    if(sprite.sprites.dead) {
        response = await fetch(sprite.sprites.dead.data);
        buffer = await response.arrayBuffer();
        data = new Uint8Array(buffer);
        newObj[index + 8] = Object.assign({}, sprite.sprites.dead, { data: data });
    }

    if(sprite.sprites.fuzzy && index === 0) {
        response = await fetch(sprite.sprites.fuzzy.data);
        buffer = await response.arrayBuffer();
        data = new Uint8Array(buffer);
        newObj[index + 14] = Object.assign({}, sprite.sprites.fuzzy, { data: data });
    }

    return newObj;
}