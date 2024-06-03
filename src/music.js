const urls = import.meta.glob('./music/**', { query: '?url', import: 'default' });

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
        title: "Battle Against a Funky Foe",
        artist: "D-Man",
        instruments: [0x05, 0x4a],
    },
    {
        title: "Song 48",
        artist: "D-Man",
        instruments: [0x05, 0x59],
    },
    {
        title: "Song 47",
        artist: "D-Man",
        instruments: [0x05, 0x18],
    },
    {
        title: "Song 40",
        artist: "D-Man",
        instruments: [0x05, 0x21],
    },
    {
        title: "Song 39",
        artist: "D-Man",
        instruments: [0x05, 0x21],
    },
    {
        title: "Song 38",
        artist: "D-Man",
        instruments: [0x05, 0x7c],
    },
    {
        title: "Song 36",
        artist: "D-Man",
        instruments: [0x05, 0x40],
    },
    {
        title: "Song 34",
        artist: "D-Man",
        instruments: [0x05, 0x18],
    },
    {
        title: "Song 33",
        artist: "D-Man",
        instruments: [0x05, 0x18],
    },
    {
        title: "Song 32",
        artist: "D-Man",
        instruments: [0x05, 0x18],
    },
    {
        title: "Song 31",
        artist: "D-Man",
        instruments: [0x05, 0x08],
    },
    {
        title: "Song 26",
        artist: "D-Man",
        instruments: [0x05, 0x34],
    },
    {
        title: "Song 24",
        artist: "D-Man",
        instruments: [0x05, 0x54],
    },
    {
        title: "Song 22",
        artist: "D-Man",
        instruments: [0x05, 0x40],
    },
    {
        title: "Dark Bowser",
        artist: "Cover by D-Man",
        instruments: [0x05, 0x40],
    },
    {
        title: "Song 21",
        artist: "D-Man",
        instruments: [0x05, 0x34],
    },
    {
        title: "Song 20",
        artist: "D-Man",
        instruments: [0x05, 0x34],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Song 19",
        artist: "D-Man",
        instruments: [0x05, 0x40],
    },
    {
        title: "Home Guitar Version",
        artist: "Cover by D-Man",
        instruments: [0x05, 0x34],
    },
    {
        title: "Home Music Box Version",
        artist: "Cover by D-Man",
        instruments: [0x05, 0x18],
    },
    {
        title: "Town4",
        artist: "D-Man",
        instruments: [0x05, 0x18],
    },
    {
        title: "Town4s Night",
        artist: "D-Man",
        instruments: [0x05, 0x18],
    },
    {
        title: "Bacon Flavored",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Battle with a Dangerous Foe",
        artist: "livvy94",
        instruments: [0x05, 0x54],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Battle With a Flippant Foe",
        artist: "livvy94",
        instruments: [0x05, 0x76],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Brinstar Red Soil",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x32],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Beginning",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x32],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Susie",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x32],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Friendliness",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Megalovania",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x7c],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
        isUnsafe: true,
    },
    {
        title: "Moonsong",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x23],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Ruins",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x15],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Summers Plaza",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "The Battle of Lil Slugger",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x7A],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "The High Sign",
        artist: "livvy94",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Time Trax Music 02",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x7C],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Casino Night Zone",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Grandiose Foe",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Akira Volume",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x54],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "SMT Chaos",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "SMT Nocturne Fierce Battle",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x7c],
        isOverworld: false,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "SMT II Chaos",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x40],
        isOverworld: false,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "SMT II 3D Valhalla",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x6e],
        isOverworld: false,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "I'll Face Myself",
        filename: "I_ll_Face_Myself",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x7c],
        isOverworld: false,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "Kazuya Volume",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x7c],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Say Face D-Mix",
        artist: "Ari3s and D-Man",
        instruments: [0x05, 0x08],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Battle with Magus",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x40],
        isOverworld: false,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "Battle Against a Gatekeeper",
        artist: "Ari3s",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Requiem for the Champions",
        artist: "Ari3s",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Terminal Velocity",
        artist: "Ari3s",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Friendly Neighbors Reggae",
        artist: "livvy94",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Hospital Dr Dick",
        artist: "Blazephlozard",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Home Sweet Family Guy",
        artist: "livvy94",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Faron Woods",
        artist: "Cover by livvy94",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Our House",
        artist: "Blazephlozard",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Save the Leekspin",
        artist: "Xarlable",
        instruments: [0x05, 0x15],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Magicalphys",
        artist: "Blazephlozard",
        instruments: [0x05, 0x18],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Summers Girls",
        artist: "Blazephlozard",
        instruments: [0x05, 0x32],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
        isUnsafe: true,
    },
    {
        title: "Mobile Flinstones",
        artist: "Xarlable",
        instruments: [0x05, 0x6E],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Johnny B Goode",
        artist: "Triple-Q",
        instruments: [0x05, 0x74],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
        isUnsafe: true,
    },
    {
        title: "Megalokrakia",
        artist: "avolience",
        instruments: [0x05, 0x7A],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Machine Gravity",
        artist: "Cover by Blazephlozard",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Masked Man Strong One",
        artist: "Cover by Blazephlozard",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Techno Boss Battle Mettaton",
        artist: "Blazephlozard",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Geothermal",
        artist: "Cover by Blazephlozard",
        instruments: [0x05, 0x7C],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Knights of Cydonia",
        artist: "Cover by Blazephlozard",
        instruments: [0x05, 0x7C],
        isOverworld: false,
        isBattle: false,
        isBoss: true,
        isUnsafe: true,
    },
    {
        title: "What is Love",
        artist: "Cover by Blazephlozard",
        instruments: [0x05, 0x8B],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Welcome Booster",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x36],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Human Music",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x2A],
        isOverworld: false,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Pursuit Cornered",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x54],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Tetrinet",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Kraid Lair",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Dragon Warrior Overworld",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Mii Channel",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Wily Castle v3",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Waterworld Map",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Sand Hut",
        artist: "EBisumaru",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Forest Themest",
        artist: "EBisumaru",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "A Bad Dream",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "Chiaki",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Crossing Over",
        artist: "Ari3s",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Never Ending Journey",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x2F],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Poltergeist",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x54],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Suspense",
        artist: "Cover by Ari3s",
        instruments: [0x05, 0x40],
        isOverworld: true,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "Finishing War",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x7A],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Grandmaster Theme",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x54],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "North America",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Lower Maridia",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x25],
        isOverworld: true,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "Stab the Sword",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x21],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
        title: "Sound of Silence",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
        isUnsafe: true,
    },
    {
        title: "Sandopolis Act 2",
        artist: "Cover by frogmary",
        instruments: [0x05, 0x3c],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "Battle 3 FFMQ",
        artist: "Cover by UltraBolt",
        instruments: [0x05, 0x7c],
        isOverworld: false,
        isBattle: false,
        isBoss: true,
    },
    {
        title: "Pictionary",
        artist: "Cover by UltraBolt",
        instruments: [0x05, 0x7c],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
        title: "Lucifer's Theme",
        filename: "Lucifers_Theme",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x54],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "DBZ Legend Super Saiyan",
        artist: "Cover by Aurilliux",
        instruments: [0x05, 0x54],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
		title: "O Come All Ye Faithful",
		filename: "come_ye_faithful",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0xFF],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
		{
		title: "O Come Emmanuel",
		filename: "emmanuel",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0xFF],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
		{
		title: "O Holy Night",
		filename: "holy_night",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0x59],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
		{
		title: "Joy to the World",
		filename: "joy",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0x2F],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
		{
		title: "Patapan",
		filename: "patapan",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0x2F],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
		{
		title: "Riu Riu Chiu",
		filename: "riu_riu_chiu",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0x2F],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
		{
		title: "Silent Night",
		filename: "silent_night",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0x2F],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
		{
		title: "What Child Is This",
		filename: "what_child_is_this",
		artist: "Cover by Aurilliux",
		instruments: [0x05, 0x2F],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isChristmas: true,
	},
    {
        title: "Saltarello",
        artist: "Cover by frogmary",
        instruments: [0x05, 0x3c],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
        title: "AnimorphsBGM05",
        artist: "Cover by frogmary",
        instruments: [0x05, 0x59],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "People are the Heroes",
	filename: "heroesv1",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x18],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isUnsafe: true,
    },
    {
	title: "Home Sweet Home",
	filename: "homesweethome",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x18],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "Valentina's Theme",
	filename: "Valentinas Theme",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x18],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "World Map - Where's Waldo",
	filename: "waldo_world_map",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0xFF],
        isOverworld: true,
        isBattle: true,
        isBoss: false,
    },
    {
	title: "Elegant Summer - Melty Blood",
	filename: "elegant_summer",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x18],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "yes.ebm",
	filename: "yes",
	artist: "Comp by Neerrm and Aurilliux",
	instruments: [0x05, 0x21],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "A CYBER'S WORLD? - Deltarune",
	filename: "A_CYBERS_WORLD",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x59],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "The Unknown - Dragon's Trap",
	filename: "The_Unknown",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x32],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "Instant Crush - Daft Punk",
	filename: "instant_crush",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x08],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "Reverse Dance",
	filename: "reverse_dance",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x36],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "Boss Battle - CBSUaJG",
	filename: "boss_battle_CBSUaJG",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x18],
        isOverworld: true,
        isBattle: true,
        isBoss: true,
    },
    {
	title: "Castle Room - Shadowgate",
	filename: "castle_room",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0xFF],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
    },
    {
	title: "Heard It Thru The Receiver Phone",
	filename: "heard_it_through_the_receiver_phone",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x54],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isUnsafe: true,
    },
    {
	title: "Fresco Theme - Sweet Home",
	filename: "fresco",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0xFF],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isUnsafe: false,
    },
    {
	title: "Kass's Theme - LoZ BotW",
	filename: "kass_theme",
	artist: "Cover by Aurilliux",
	instruments: [0x05, 0x36],
        isOverworld: true,
        isBattle: false,
        isBoss: false,
        isUnsafe: false,
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
    let url = urls[`./music/${song.filename || song.title.replace(/ /g, '_')}.ebm.bin`];
    if(!url) {
        url = urls[`./music/${song.title}.ebm.bin`];
    }
    if(!url) {
        throw new Error(`Could not find music ebm file for ${song.title}.`);
    }
    let response = await fetch(url.default || url);
    let buffer = await response.arrayBuffer();
    let data = new Uint8Array(buffer);

    if(data.length < 4) {
        throw new Error(`Invalid song data length.`);
    }
    const songAddress = data.slice(2, 4);
    return Object.assign({ data, songAddress }, song);
}
