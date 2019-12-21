import importAll from 'import-all.macro';
const urls = importAll.sync('./music/**');

export const customSongs = [
    {
        title: "Bonetrousle",
        artist: "Cover by D-Man",
        instruments: [0x05, 0x54], 
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Song 38",
        artist: "D-Man",
        instruments: [0x05, 0x7c], 
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Song 20",
        artist: "D-Man",
        instruments: [0x05, 0x34], 
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
];

export async function prepareCustomSongIndex(index) {
    if(index >= customSongs.length) {
        throw new Error(`Invalid custom song index.`);
    }
    const song = customSongs[index];
    return await prepareCustomSong(song);
}

export async function prepareCustomSong(song) {
    let url = urls[`./music/${song.filename || song.title.replace(/ /g, '_')}.ebm`];
    if(!url) {
        throw new Error(`Could not find music ebm file for ${song.title}.`);
    }
    let response = await fetch(url);
    let buffer = await response.arrayBuffer();
    let data = new Uint8Array(buffer);

    if(data.length < 4) {
        throw new Error(`Invalid song data length.`);
    }
    const songAddress = data.slice(2, 4);
    return Object.assign({ data, songAddress }, song);
}