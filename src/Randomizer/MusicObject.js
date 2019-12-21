/* eslint import/no-webpack-loader-syntax: off */
import { TableObject, utils } from 'randomtools-js';
import tableText from '!array-loader!./tables/music_table.txt';
import ebutils from './ebutils.js';

import { customSongs, prepareCustomSong } from '../music.js';
import EnemyObject from './EnemyObject.js';


class MusicObject extends TableObject {

    static ancientCaveCustomSongCount = 2;

    static serialize() {
        // TODO
    }

    static get ancientCaveMusics() {
        if(this._ancientCaveMusics !== undefined) return this._ancientCaveMusics;

        const arr = this.context.random.sample(Array.from(MusicObject.overworldMusics), 9);

        if(this.context.specs.flags.w >= 3) {
            const entriesToReplace = this.context.random.sample(utils.range(arr.length), this.ancientCaveCustomSongCount);
            entriesToReplace.forEach((entry, i) => {
                arr[entry] = this.insertSong(i);
            });
        }

        this._ancientCaveMusics = arr;
        return this.ancientCaveMusics;
    }

    static async prepare() {
        if(this.context.specs.flags.w >= 3) {
            const songs = this.context.random.sample(customSongs, this.ancientCaveCustomSongCount);
            for(const song of songs) {
                const newSong = await prepareCustomSong(song);
                this.preparedSongs.push(newSong);
            }
        }
    }
    
    static get overworldMusics() {
        if(this._overworldMusics !== undefined) return this._overworldMusics;
        this._overworldMusics = new Set([2, 3, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 76, 77, 78, 80, 81, 82, 83, 84, 86, 87, 90, 91, 92, 106, 107, 108, 112, 114, 116, 117, 118, 119, 120, 121, 122, 125, 128, 129, 130, 131, 132, 136, 140, 142, 144, 146, 147, 149, 150, 151, 152, 153, 154, 159, 169, 170, 171, 173, 178, 187, 188]);
        if(this.context.specs.flags.w >= 4) {
            EnemyObject.every.forEach(e => this._overworldMusics.add(e.oldData.music));
        }
        return this.overworldMusics;
    }

    static get battleMusics() {
        if(this._battleMusics !== undefined) return this._battleMusics;
        if(this.context.specs.flags.w >= 4) return this.overworldMusics;
        this._battleMusics = new Set(EnemyObject.every.map(e => e.oldData.music));
        return this.battleMusics;
    }

    static insertSong(preparedSongIndex) {
        if(this.donorSongs.length < 1) {
            throw new Error(`List of donor songs exhausted.`);
        }
        const donorIndex = this.donorSongs.pop();
        const donor = this.get(donorIndex - 1);

        if(this.preparedSongs.length <= preparedSongIndex) {
            throw new Error(`Invalid prepared song index.`);
        }
        const newSong = this.preparedSongs[preparedSongIndex];
        donor.data.instrument_pack_1 = newSong.instruments[0];
        donor.data.instrument_pack_2 = newSong.instruments[1];

        const songAddressLoc = this.songAddresses.pointerTable + (donor.index * 2);
        this.context.rom.set(newSong.songAddress, songAddressLoc);

        const writeData = ebutils.writeToFreespace(newSong.data, this.context);
        
        const spcPointerLoc = this.spcPacks.pointerTable + (donor.data.spc_pack * 3);
        this.context.rom[spcPointerLoc] = writeData.snesBank;
        utils.writeMulti(this.context.rom, spcPointerLoc + 1, writeData.bankAddress, 2);
        
        donor.newSong = newSong;

        return donorIndex;
    }

    static songInfo(musicIndex) { // 1-indexed
        return this.get(musicIndex - 1).songInfo;
    }

    get songInfo() {
        if(this.newSong) {
            return {
                artist: this.newSong.artist,
                title: this.newSong.title,
            }
        }
        return {
            artist: "Original Staff",
            title: this.constructor.originalNames[this.index].split(" (")[0],
        }
    }
}

MusicObject.preparedSongs = [];

// 0-indexed, unlike in-game and in EbMusEd
MusicObject.originalNames = [
	"Gas Station (Part 1, Changes cause SPC stall?)",
	"Naming screen",
	"File Select screen",
	"None",
	"You Win! (Version 1)",
	"Level Up",
	"You Lose",
	"Battle Swirl (Boss)",
	"Battle Swirl (Ambushed)",
	"(Unused)",
	"Fanfare",
	"You Win! (Version 2)",
	"Teleport, Departing",
	"Teleport, Failure",
	"Falling Underground",
	"Doctor Andonuts' Lab",
	"Monotoli Building",
	"Sloppy House",
	"Neighbor's House",
	"Arcade",
	"Pokey's House",
	"Hospital",
	"Ness' House (Pollyanna)",
	"Paula's Theme",
	"Chaos Theater",
	"Hotel",
	"Good Morning, Eagleland",
	"Department Store",
	"Onett at Night (Version 1)",
	"Your Sanctuary (Pre-recording)",
	"Your Sanctuary (Post-recording)",
	"Giant Step Melody",
	"Lilliput Steps Melody",
	"Milky Well Melody",
	"Rainy Circle Melody",
	"Magnet Hill Melody",
	"Pink Cloud Melody",
	"Lumine Hall Melody",
	"Fire Spring Melody",
	"Near a Boss",
	"Alien Investigation (Stonehenge Base)",
	"Fire Springs",
	"Belch's Base",
	"Zombie Threed",
	"Spooky Cave",
	"Onett",
	"Fourside",
	"Saturn Valley",
	"Monkey Caves",
	"Moonside",
	"Dusty Dunes Desert",
	"Peaceful Rest Valley",
	"Happy Happy Village",
	"Winters",
	"Cave Near a Boss",
	"Summers",
	"Jackie's Cafe",
	"Sailing to Scaraba (Part 1)",
	"Dalaam",
	"Mu Training",
	"Bazaar",
	"Scaraba Desert",
	"Pyramid",
	"Deep Darkness",
	"Tenda Village",
	"Welcome Home (Magicant Part 1)",
	"Dark Side of One's Mind (Magicant Part 2)",
	"Lost Underworld",
	"First Step Back (Cave of the Past)",
	"Second Step Back (Ten Years Ago)",
	"The Place",
	"Giygas Awakens",
	"Giygas Phase 2",
	"Giygas is Weakened",
	"Giygas' Death",
	"Runaway Five Concert (1)",
	"Runaway Five Tour Bus",
	"Runaway Five Concert (2)",
	"Power (Level Up at the Sea of Eden)",
	"Venus' Concert",
	"Yellow Submarine",
	"Bicycle",
	"Sky Runner",
	"Sky Runner, Falling",
	"Bulldozer",
	"Tessie",
	"City Bus",
	"Fuzzy Pickles",
	"Delivery",
	"Return to your Body",
	"Phase Distorter III",
	"Coffee Break",
	"Because I Love You",
	"Good Friends, Bad Friends",
	"Smiles and Tears",
	"Battle versus Cranky Lady",
	"Battle versus Spinning Robo",
	"Battle versus Strutting Evil Mushroom",
	"Battle versus Master Belch",
	"Battle versus New Age Retro Hippie",
	"Battle versus Runaway Dog",
	"Battle versus Cave Boy",
	"Battle versus Your Sanctuary Boss",
	"Battle versus Kraken",
	"Giygas (The Devil's Machine)",
	"Inside the Dungeon",
	"Megaton Walk",
	"The Sea of Eden (Magicant Part 3)",
	"Explosion?",
	"Sky Runner Crash",
	"Magic Cake",
	"Pokey's House (Buzz Buzz present)",
	"Buzz Buzz Swatted",
	"Onett at Night (Version 2, Buzz Buzz present)",
	"Phone Call",
	"Annoying Knock (Right)",
	"Rabbit Cave",
	"Onett at Night (Version 3, Buzzy appears; fade into 0x77)",
	"Apple of Enlightenment",
	"Hotel of the Living Dead",
	"Onett Intro",
	"Sunrise, Onett",
	"New Party Member",
	"Enter Starman Junior",
	"Snow Wood",
	"Phase Distorter (Failed Attempt)",
	"Phase Distorter II (Teleport to Lost Underworld)",
	"Boy Meets Girl (Twoson)",
	"Happy Threed",
	"Runaway Five are Freed",
	"Flying Man",
	"Cavern Theme (\"Onett at Night Version 2\")",
	"Hidden Song (\"Underground\" Track from Mother)",
	"Greeting the Sanctuary Boss",
	"Teleport, Arriving",
	"Saturn Valley Cave",
	"Elevator, Going Down",
	"Elevator, Going Up",
	"Elevator, Stopping",
	"Topolla Theater",
	"Battle versus Master Barf",
	"Teleporting to Magicant",
	"Leaving Magicant",
	"Sailing to Scaraba (Part 2)",
	"Stonehenge Shutdown",
	"Tessie Sighting",
	"Meteor Fall",
	"Battle versus Starman Junior",
	"Runaway Five defeat Clumsy Robot",
	"Annoying Knock (Left)",
	"Onett After Meteor",
	"Ness' House After Meteor",
	"Pokey's Theme",
	"Onett at Night (Version 4, Buzz Buzz present)",
	"Greeting the Sanctuary Boss (2?)",
	"Meteor Strike (Fade into 0x98)",
	"Attract Mode (Opening Credits)",
	"Are You Sure?  Yep!",
	"Peaceful Rest Valley",
	"Sound Stone's Giant Step Recording",
	"Sound Stone's Lilliput Steps Recording",
	"Sound Stone's Milky Well Recording",
	"Sound Stone's Rainy Circle Recording",
	"Sound Stone's Magnet Hill Recording",
	"Sound Stone's Pink Cloud Recording",
	"Sound Stone's Lumine Hall Recording",
	"Sound Stone's Fire Spring Recording",
	"Sound Stone Background Noise",
	"Eight Melodies",
	"Dalaam Intro",
	"Winters Intro",
	"Pokey Escapes",
	"Good Morning, Moonside",
	"Gas Station (Part 2)",
	"Title Screen",
	"Battle Swirl (Normal)",
	"Pokey Springs Into Action",
	"Good Morning, Scaraba",
	"Robotomy",
	"Helicopter Warming Up",
	"The War Is Over",
	"Giygas Static",
	"Instant Victory",
	"You Win! (Version 3, versus Boss)",
	"Giygas Phase 3",
	"Giygas Phase 1",
	"Give Us Strength",
	"Good Morning, Winters",
	"Sound Stone Background Noise",
	"Giygas Dying",
	"Giygas Weakened",
]

// 1-indexed
MusicObject.donorSongs = [0x3c, 0x4f, 0x55, 0x6f, 0x7c, 0xb3, 0x8e, 0x8f];

MusicObject.spcPacks = {
    pointerTable: 0x4F947,
    count: 0xA9,
}

MusicObject.songAddresses = {
    pointerTable: 0x26298C,
}

MusicObject.tableSpecs = {
    text: tableText,
    count: 0xBF,
    pointer: 0x4F70A,
};

MusicObject._displayName = "music";
export default MusicObject;