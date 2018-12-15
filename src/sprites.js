import NessPride from './sprites/NessPride.bin';

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
];

export const vanillaSprites = [
    { label: "Cop", value: 111, },
    { label: "Flying Man", value: 39, },
    { label: "Shades", value: 71, },
    { label: "Starmaster", value: 98, },
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
    const mainResponse = await fetch(sprite.sprites.main.data);
    const mainBuffer = await mainResponse.arrayBuffer();
    const mainData = new Uint8Array(mainBuffer);
    newObj[index + 1] = Object.assign({}, sprite.sprites.main, { data: mainData });
    return newObj;
}