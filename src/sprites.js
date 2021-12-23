import importAll from 'import-all.macro';
import PNGReader from 'png.js';
const urls = importAll.sync('./sprites/**/*.png');

export const customCharacters = [
    {
        label: "Lucas",
        value: "Lucas",
        creator: "Defqon1",
    },
    {
        label: "Claus",
        value: "Claus",
        creator: "Defqon1",
    },
    {
        label: "Kumatora",
        value: "Kumatora",
        creator: "Defqon1",
    },
    {
        label: "Salsa",
        value: "Salsa",
        creator: "Defqon1",
    },
    {
        label: "Duster",
        value: "Duster",
        creator: "Defqon1",
    },
    {
        label: "Flint",
        value: "Flint",
        creator: "Defqon1",
    },
    {
        label: "Save Frog",
        value: "SaveFrog",
        creator: "Defqon1",
    },
    {
        label: "Rope Snake",
        value: "RopeSnake",
        creator: "Defqon1",
    },
    {
        label: "Exit Mouse",
        value: "ExitMouse",
        creator: "Defqon1",
    },
    {
        label: "Mega Man",
        value: "MegaMan",
        creator: "Artheau",
    },
    {
        label: "Proto Man",
        value: "ProtoMan",
        creator: "Artheau",
    },
    {
        label: "Saturn Ness",
        value: "SaturnNess",
        creator: "BossCrafty",
    },
    {
        label: "Tessie",
        value: "Tessie",
        creator: "TheKubliest",
    },
    {
        label: "Dog (Laika)",
        value: "Laika",
        creator: "TheKubliest",
    },
    {
        label: "The Batter",
        value: "TheBatter",
        creator: "Bacon",
    },
    {
        label: "Erdrick",
        value: "Erdrick",
        creator: "Defqon1",
    },
    {
        label: "Rek",
        value: "Rek",
        creator: "Defqon1",
    },
    {
        label: "Link",
        value: "Link",
        creator: "Defqon1",
    },
    {
        label: "Dark Link",
        value: "DarkLink",
        creator: "Defqon1",
    },
    {
        label: "Zelda",
        value: "Zelda",
        creator: "Defqon1",
    },
    {
        label: "Terra",
        value: "Terra",
        creator: "Defqon1",
    },
    {
        label: "Sabin",
        value: "Sabin",
        creator: "Defqon1",
    },
    {
        label: "Celes",
        value: "Celes",
        creator: "Defqon1",
    },
    {
        label: "Edgar",
        value: "Edgar",
        creator: "Defqon1",
    },
    {
        label: "General Leo",
        value: "GeneralLeo",
        creator: "Defqon1",
    },
    {
        label: "Shadow",
        value: "Shadow",
        creator: "Defqon1",
    },
    {
        label: "Interceptor",
        value: "Interceptor",
        creator: "Defqon1",
    },
    {
        label: "Mog",
        value: "Mog",
        creator: "Defqon1",
    },
    {
        label: "Kefka",
        value: "Kefka",
        creator: "Defqon1",
    },
    {
        label: "Ultros",
        value: "Ultros",
        creator: "Defqon1",
    },
    {
        label: "Mario",
        value: "Mario",
        creator: "Defqon1",
    },
    {
        label: "Luigi",
        value: "Luigi",
        creator: "Defqon1",
    },
    {
        label: "Toad",
        value: "Toad",
        creator: "Defqon1",
    },
    {
        label: "Toadette",
        value: "Toadette",
        creator: "Defqon1",
    },
    {
        label: "Bomberman",
        value: "Bomberman",
        creator: "Defqon1",
    },
    {
        label: "Captain Falcon",
        value: "CaptainFalcon",
        creator: "Defqon1",
    },
    {
        label: "Kirby",
        value: "Kirby",
        creator: "Defqon1",
    },
    {
        label: "Prince of Cannock",
        value: "Cannock",
        creator: "Defqon1",
    },
    {
        label: "Prince of Midenhall",
        value: "Midenhall",
        creator: "Defqon1",
    },
    {
        label: "Princess of Moonbrooke",
        value: "Moonbrooke",
        creator: "Defqon1",
    },
    {
        label: "SimEarth Lizard",
        value: "SimEarthLizard",
        creator: "Peebs",
    },
    {
        label: "Chu",
        value: "Chu",
        creator: "Satsy",
    },
    {
        label: "Pride Ness",
        value: "PrideNess",
        creator: "stochaztic",
    },
    {
        label: "Nessa",
        value: "Nessa",
        creator: "Satsy",
    },
    {
        label: "Ninten",
        value: "Ninten",
        creator: "the salvation phoenix",
    },
    {
        label: "Teddy",
        value: "Teddy",
        creator: "EBrent",
    },
    {
        label: "Ness's Hat",
        value: "NessHat",
        creator: "stochaztic",
    },
    {
        label: "Kris (Deltarune)",
        value: "KrisDeltarune",
        creator: "Quatropus",
    },
    {
        label: "Lancer",
        value: "Lancer",
        creator: "Quatropus",
    },
    {
        label: "Ralsei",
        value: "Ralsei",
        creator: "Quatropus",
    },
    {
        label: "Susie",
        value: "Susie",
        creator: "Quatropus",
    },
    {
        label: "Dragon Ness",
        value: "DragonNess",
        creator: "Quatropus / Aurilliux",
    },
    {
        label: "Dragon Paula",
        value: "DragonPaula",
        creator: "Quatropus",
    },
    {
        label: "Dragon Jeff",
        value: "DragonJeff",
        creator: "Quatropus",
    },
    {
        label: "Dragon Poo",
        value: "DragonPoo",
        creator: "Quatropus",
    },
    {
        label: "Dorothy",
        value: "Dorothy",
        creator: "Defqon1",
    },
    {
        label: "Sophia",
        value: "Sophia",
        creator: "Defqon1",
    },
    {
        label: "Sonic",
        value: "Sonic",
        creator: "Quatropus",
    },
    {
        label: "Amy",
        value: "Amy",
        creator: "Quatropus",
    },
    {
        label: "Tails",
        value: "Tails",
        creator: "Quatropus",
    },
    {
        label: "Knuckles",
        value: "Knuckles",
        creator: "Quatropus",
    },
    {
        label: "Aya",
        value: "Aya",
        creator: "Quatropus",
    },
    {
        label: "Kris (Pokemon)",
        value: "Kris",
        creator: "TheKubliest",
    },
    {
        label: "Blue",
        value: "Blue",
        creator: "Zephram",
    },
    {
        label: "Red",
        value: "Red",
        creator: "Zephram",
    },
    {
        label: "Generic Pokemon",
        value: "GenericPokemon",
        creator: "EBrent",
    },
    {
        label: "Dragonair",
        value: "Dragonair",
        creator: "EBrent",
    },
    {
        label: "Bart Simpson",
        value: "Bart",
        creator: "Doug",
    },
    {
        label: "Gordon Freeman",
        value: "Gordon",
        creator: "EBrent",
    },
    {
        label: "Weird Al Yankovic",
        value: "WeirdAl",
        creator: "EBrent",
    },
    {
        label: "Ristar",
        value: "Ristar",
        creator: "Gabbi",
    },
    {
        label: "Swellman",
        value: "Swellman",
        creator: "Quatropus",
    },
    {
        label: "Jenn",
        value: "Jenn",
        creator: "Quatropus",
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
    },
    { label: "Mom", value: 145, },
    { label: "Monotoli", value: 164, },
    {
        label: "Mouse",
        value: "Mouse",
    },
    { label: "Mummy", value: 307, },
    { label: "Ness", value: 1, },
    { label: "Ness Pajamas", value: 437, },
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
    {
        label: "Prototype Cheese Man",
        value: "PrototypeCheeseMan",
    },
    {
        label: "Prototype Ness",
        value: "PrototypeNess",
    },
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

export async function testAllSprites() {
    for (const [name, url] of Object.entries(urls)) {
        console.log(`Testing image ${name}`);
        try {
            let response = await fetch(url);
            let buffer = await response.arrayBuffer();
            const png = await bufferToPng(buffer);
            processSpriteGroup(png);
        }
        catch(err) {
            console.warn(err);
        }
      }
}

export function getPercent(sprite) {
    const match = `/${sprite.value}/`;
    const matchCount = Object.keys(urls).filter(url => url.includes(match) && !url.endsWith(`006.png`)).length;
    return Math.min(100, Math.floor(100 * Math.max(1, matchCount) / 15));
}

export function getUrl(sprite, index) {
    let url = urls[`./sprites/${sprite.value}/${index.toString().padStart(3, '0')}.png`];
    if(!url && index === 1) {
        url = urls[`./sprites/${sprite.value}.png`];
    }
    if(!url) {
        url = urls[`./sprites/${sprite.value}-${index.toString().padStart(3, '0')}.png`];
    }
    return url?.default || url;
}

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

    const prepareSprite = async function(index) {
        const url = getUrl(sprite, index);
        if(!url) {
            if(index === 1) {
                throw new Error(`Could not find main sprite for ${sprite.value}`);
            }
            return undefined;
        }
        let response = await fetch(url);
        let buffer = await response.arrayBuffer();
        const png = await bufferToPng(buffer);
        const processedGroup = processSpriteGroup(png);
        return processedGroup;
    };

    newObj[index + 1] = await prepareSprite(1); // main
    newObj[index + 8] = await prepareSprite(8); // dead
    const downIdx = (index === 0) ? 16 : (392 + index);
    newObj[downIdx] = await prepareSprite(16); // down
    newObj[index + 17] = await prepareSprite(17); // ladder
    newObj[index + 21] = await prepareSprite(21); // rope
    newObj[index + 27] = await prepareSprite(27); // mini
    newObj[index + 335] = await prepareSprite(335); // jump

    if(index === 0) { // Ness
        newObj[5] = await prepareSprite(5); // robot
        newObj[437] = await prepareSprite(437); // pj
        newObj[6] = await prepareSprite(6); // nude
        if(!newObj[6]) { // special case: if there is no nude, re-use pj
            newObj[6] = newObj[437];
        }
        newObj[7] = await prepareSprite(7); // bike
        newObj[14] = await prepareSprite(14); // fuzzy
        newObj[378] = await prepareSprite(378); // bedNess
        newObj[453] = await prepareSprite(453); // sitting
        newObj[457] = await prepareSprite(457); // deadRobot
    }

    if(index === 1) { // Paula
        newObj[454] = await prepareSprite(453); // sitting
    }

    if(index === 2) { // Jeff
        newObj[15] = await prepareSprite(15); // bedJeff
    }

    if(index === 3) { // Poo
        newObj[362] = await prepareSprite(362); // meditate
    }

    return newObj;
}

const bufferToPng = function(buffer) {
    return new Promise(resolve => {
        const reader = new PNGReader(buffer);
	    reader.parse((err, png) => {
            if (err) throw err;
            resolve(png);
        });
    });
}


const arrEq = function(a, b) {
    if(a.constructor !== Array && a.constructor !== Uint8Array) {
        return false;
    }
    if(a.constructor !== b.constructor) {
        return false;
    }
    if(a.length !== b.length) {
        return false;
    }
    return a.every((x, i) => x === b[i]);
}

const SPRITE_GROUP_PALETTES = [
    { index: 16, values: [
        112, 112, 112, 248, 240, 240, 184, 200, 200,
        152, 136, 152,   0, 176, 128,   0, 144, 112,
         80, 112,  96, 168, 208, 240,  72, 152, 160,
         88, 208, 216, 200,   0, 160, 120,  48,  80,
        208, 176,  88, 184, 136,   0, 136, 112, 160,
         48,  32,  32 ]},
    { index: 20, values: [
         96, 152, 112, 240, 240, 240, 192, 192, 192,
        152, 152, 152, 128, 128, 128,  80,  80,  80,
        160, 192, 192, 104, 136, 136,  88, 112, 120,
         56,  80,  80, 240,   0,  96, 144,   0,  48,
        160, 136, 240, 112,  88, 224,  72,  40, 152,
         48,  32,  32 ]},
    { index: 18, values: [
        168, 200, 128, 240, 240, 240, 208, 208, 208,
        144, 160, 128,   0, 176, 128,   0, 144, 112,
         96, 128, 104, 192, 176, 128, 192, 160, 104,
        152, 120,  88, 240,   0,  96, 144,   0,  48,
        224, 208,  32, 224, 152,  24,  80,  80, 200,
         48,  32,  32 ]},
    { index: 22, values: [
        216, 200,  80, 240, 240, 176, 192, 176, 128,
        192, 160, 104, 152, 120,  88, 128,  96,  64,
         80,  64,  40,   0, 176, 128,   0, 144, 112,
         80, 112,  88, 240, 176, 144, 240, 144, 144,
        240, 240, 240, 200, 200, 200, 240,   0,  96,
         48,  32,  32 ]},
    { index: 24, values: [
          0,   0,   0, 192, 144, 120, 224, 176, 168,
        144, 120, 104, 232, 200, 152, 208, 152,  72,
        192, 136,  88, 168, 120,  32, 248, 200, 128,
        248, 176, 128, 200, 136, 104, 168,  96,  64,
        248, 232, 128, 168, 144,  88, 128, 128,  48,
         64,  64,  64 ]},
    { index: 26, values: [
          0, 176, 128, 240, 240, 240, 200, 200, 200,
        144, 160, 128,   0, 176, 128,   0, 144, 112,
         80, 112,  96, 240, 176, 144, 200, 152, 120,
        240, 144, 144, 240,   0,  96, 144,   0,  48,
        224, 208,  32, 240, 144,   0, 112, 112, 240,
         48,  32,  32 ]},
    { index: 30, values: [
         96, 104, 248, 240, 248, 248, 168, 168, 168,
        136, 136, 136, 152, 120,  88, 240,  48,  64,
        224, 208,  32, 240, 144,   0, 192, 128,  96,
          0, 232, 128,  40, 160, 112,  80, 120,  96,
        240, 240, 208, 192, 208, 152, 144, 152,  96,
         48,  32,  32 ]},
    { index: 28, values: [
        144, 224, 128, 240, 240, 240, 200, 200, 200,
        144, 160, 128,   0, 176, 128,   0, 144, 112,
         80, 112,  96, 240, 176, 144, 200, 152, 120,
        240, 144, 144, 240,   0,  96, 144,   0,  48,
        224, 208,  32, 240, 144,   0, 112, 112, 240,
         48,  32,  32 ]},
];

function getBit(num, bit) {
    return (num & (1 << bit)) === 0 ? 0 : 1;
}

function indexedToSnes4bpp(src, srcWidth, srcHeight) {
    if(src.constructor !== Uint8Array) {
        throw new Error(`src is not Uint8Array`);
    }
    if(!srcHeight || !srcWidth || srcHeight % 8 !== 0 || srcWidth % 8 !== 0 || src.length !== srcHeight * srcWidth) {
        throw new Error(`Invalid indexed source dimensions: ${src.length} length, ${srcWidth} width, ${srcHeight} height`);
    }
    let result4bpp = new Uint8Array();
    for(let i = 0; i * 8 < srcHeight; i++) {
        for(let j = 0; j * 8 < srcWidth; j++) {
            let tile = new Uint8Array();
            for(let x = 0; x < 8; x++) {
                const start = (i * srcWidth * 8) + (j * 8) + (srcWidth * x);
                const accum = src.slice(start, start + 8);
                tile = new Uint8Array([...tile, ...accum]);
            }
            
            console.assert(tile.length === 64);
            const accum = new Uint8Array(tile.length / 2);
            for(let x = 0; x < tile.length; x++) {
                const row = Math.floor(x / 8);
                const col = x % 8;
                
                accum[row*2] |= (getBit(tile[x], 0) << (7 - col));
                accum[row*2 + 1] |= (getBit(tile[x], 1) << (7 - col));
                accum[row*2 + 16] |= (getBit(tile[x], 2) << (7 - col));
                accum[row*2 + 17] |= (getBit(tile[x], 3) << (7 - col));
            }
            result4bpp = new Uint8Array([...result4bpp, ...accum]);
        }
    }
    return result4bpp;
}

function processSpriteGroup(png) {
    const pxArray = png.pixels;
    const width = png.width;
    const height = png.height;

    const spritesWide = 4;
    const spritesTall = 4;
    const spriteWidth = width / spritesWide;
    const spriteHeight = height / spritesTall;

    if(spriteWidth % 8 !== 0 || spriteHeight % 8 !== 0) {
        throw new Error("Sprite dimensions not tilable.")
    }

    const paletteValues = png.palette.slice(0, SPRITE_GROUP_PALETTES[0].values.length);
    const paletteMatch = SPRITE_GROUP_PALETTES.find(p => arrEq(p.values, paletteValues));
    if(!paletteMatch) {
        throw new Error("Matching sprite group palette not found.");
    }
    const palette = paletteMatch.index;

    let byteData = new Uint8Array();
    const byteIndexes = [];
    const spriteCaches = [];

    const spriteDatas = [];
    for(var i = 0; i < spritesWide; i++) {
        for(var j = 0; j < spritesTall; j++) {
            let normal = new Uint8Array();
            let mirrored = new Uint8Array();
            for(var x = 0; x < spriteHeight; x++) {
                const start = (i * width * spriteHeight) + (j * spriteWidth) + (width * x);
                const add = pxArray.slice(start, start + spriteWidth);
                normal = new Uint8Array([...normal, ...add]);
                mirrored = new Uint8Array([...mirrored, ...add.reverse()]);
            }
            console.assert(normal.length === spriteWidth * spriteHeight);
            spriteDatas.push({normal, mirrored});
        }
    }
    console.assert(spriteDatas.length === spritesWide * spritesTall);

    spriteDatas.forEach((spriteData, i) => {
        if(spriteData.normal.every(n => n === 0)) {
            return;
        }

        let cacheHit = spriteCaches.find(cacheItem => arrEq(cacheItem.spriteData.normal, spriteData.normal));
        if(cacheHit) {
            byteIndexes.push(cacheHit.byteIndex);
            return;
        }
        /* // Complicated due to: https://github.com/pk-hack/CoilSnake/issues/88 
        cacheHit = spriteCaches.find(cacheItem => arrEq(cacheItem.spriteData.mirrored, spriteData.normal));
        if(cacheHit) {
            byteIndexes.push(cacheHit.byteIndex + 1);
            return;
        }
        */

        const accum = indexedToSnes4bpp(spriteData.normal, spriteWidth, spriteHeight);
        const byteIndex = byteData.length;

        const cacheItem = {spriteData, byteIndex};
        spriteCaches.push(cacheItem);

        byteIndexes.push(byteData.length);
        byteData = new Uint8Array([...byteData, ...accum]);
    });

    if(byteIndexes.length !== 8 && byteIndexes.length !== 16) {
        throw new Error(`Incorrect number of non-blank sprites found: ${byteIndexes.length}`);
    }

    return {data: byteData, indexes: byteIndexes, palette};
}