import importAll from 'import-all.macro';
import PNGReader from 'png.js';
const urls = importAll.sync('./sprites/**/*.png');

export const unusedSprites = [31, 32, 38, 42, 43, 250, 251, 275, 321, 338, 339, 340, 341, 342, 345, 351, 354, 355, 358, 379, 380, 383, 400, 445, 452, 453, 454];

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
        label: "Arrow Lizard",
        value: "ArrowLizard",
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
        label: "Ninten",
        value: "Ninten",
        creator: "plastics enjoyer",
    },
    {
        label: "Ana",
        value: "Ana",
        creator: "plastics enjoyer",
    },
    {
        label: "Lloyd",
        value: "Lloyd",
        creator: "plastics enjoyer",
    },
    {
        label: "Teddy",
        value: "Teddy",
        creator: "plastics enjoyer",
    },
    {
        label: "Pippi",
        value: "Pippi",
        creator: "plastics enjoyer",
    },
    {
        label: "Exit Mouse",
        value: "ExitMouse",
        creator: "Defqon1",
    },
    {
        label: "Coil Snake",
        value: "CoilSnake",
        creator: "Defqon1",
    },
    {
        label: "Giygas",
        value: "Giygas",
        creator: "plastics enjoyer",
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
        label: "Crono",
        value: "Crono",
        creator: "Defqon1",
    },
    {
        label: "Lucca",
        value: "Lucca",
        creator: "Defqon1",
    },
    {
        label: "Frog",
        value: "Frog",
        creator: "Defqon1",
    },
    {
        label: "Ayla",
        value: "Ayla",
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
        label: "Locke",
        value: "Locke",
        creator: "Defqon1",
    },
    {
        label: "Gogo",
        value: "Gogo",
        creator: "Defqon1",
    },
    {
        label: "Cyan",
        value: "Cyan",
        creator: "Defqon1",
    },
    {
        label: "Setzer",
        value: "Setzer",
        creator: "Defqon1",
    },
    {
        label: "Gau",
        value: "Gau",
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
        label: "Umaro",
        value: "Umaro",
        creator: "Defqon1",
    },
    {
        label: "Relm",
        value: "Relm",
        creator: "Defqon1",
    },
    {
        label: "Strago",
        value: "Strago",
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
        label: "Magitek Officer",
        value: "MagitekOfficer",
        creator: "Defqon1",
    },
    {
        label: "Imp",
        value: "Imp",
        creator: "Defqon1",
    },
    {
        label: "Sonic the Hedgehog",
        value: "SonicHedgehog",
        creator: "plastics enjoyer",
    },
    {
        label: "Miles 'Tails' Prower",
        value: "MilesPrower",
        creator: "plastics enjoyer",
    },
    {
        label: "Knuckles the Echidna",
        value: "KnucklesEchidna",
        creator: "plastics enjoyer",
    },
    {
        label: "Amy Rose",
        value: "AmyRose",
        creator: "plastics enjoyer",
    },
    {
        label: "Shadow the Hedgehog",
        value: "ShadowHedgehog",
        creator: "plastics enjoyer",
    },
    {
        label: "Rouge the Bat",
        value: "RougeBat",
        creator: "plastics enjoyer",
    },
    {
        label: "Metal Sonic",
        value: "MetalSonic",
        creator: "plastics enjoyer",
    },
    {
        label: "Doctor Eggman",
        value: "DoctorEggman",
        creator: "plastics enjoyer",
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
        label: "Koopa Troopa",
        value: "KoopaTroopa",
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
        label: "Pit",
        value: "Pit",
        creator: "Defqon1",
    },
    {
        label: "Kirby",
        value: "Kirby",
        creator: "Defqon1",
    },
    {
        label: "Dark Pit",
        value: "DarkPit",
        creator: "Defqon1",
    },
    {
        label: "Lolo",
        value: "Lolo",
        creator: "Defqon1",
    },
    {
        label: "Lala",
        value: "Lala",
        creator: "Defqon1",
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
        label: "Arus",
        value: "Arus",
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
        label: "Veronica",
        value: "Veronica",
        creator: "Defqon1",
    },
    {
        label: "Serena",
        value: "Serena",
        creator: "Defqon1",
    },
    {
        label: "Slime",
        value: "Slime",
        creator: "Defqon1",
    },
    {
        label: "Ryu",
        value: "Ryu",
        creator: "plastics enjoyer",
    },
    {
        label: "E. Honda",
        value: "EHonda",
        creator: "plastics enjoyer",
    },
    {
        label: "Blanka",
        value: "Blanka",
        creator: "plastics enjoyer",
    },
    {
        label: "Guile",
        value: "Guile",
        creator: "plastics enjoyer",
    },
    {
        label: "Ken",
        value: "Ken",
        creator: "plastics enjoyer",
    },
    {
        label: "Chun-Li",
        value: "ChunLi",
        creator: "plastics enjoyer",
    },
    {
        label: "Zangief",
        value: "Zangief",
        creator: "plastics enjoyer",
    },
    {
        label: "Dhalsim",
        value: "Dhalsim",
        creator: "plastics enjoyer",
    },
    {
        label: "Balrog",
        value: "Balrog",
        creator: "plastics enjoyer",
    },
    {
        label: "Vega",
        value: "Vega",
        creator: "plastics enjoyer",
    },
    {
        label: "Sagat",
        value: "Sagat",
        creator: "plastics enjoyer",
    },
    {
        label: "M. Bison",
        value: "MBison",
        creator: "plastics enjoyer",
    },
    {
        label: "T. Hawk",
        value: "THawk",
        creator: "plastics enjoyer",
    },
    {
        label: "Fei Long",
        value: "FeiLong",
        creator: "plastics enjoyer",
    },
    {
        label: "Dee Jay",
        value: "DeeJay",
        creator: "plastics enjoyer",
    },
    {
        label: "Cammy",
        value: "Cammy",
        creator: "plastics enjoyer",
    },
    {
        label: "Akuma",
        value: "Akuma",
        creator: "plastics enjoyer",
    },
    {
        label: "Marth",
        value: "Marth",
        creator: "plastics enjoyer",
    },
    {
        label: "Alm",
        value: "Alm",
        creator: "plastics enjoyer",
    },
    {
        label: "Celica",
        value: "Celica",
        creator: "plastics enjoyer",
    },
    {
        label: "Sigurd",
        value: "Sigurd",
        creator: "plastics enjoyer",
    },
    {
        label: "Seliph",
        value: "Seliph",
        creator: "plastics enjoyer",
    },
    {
        label: "Shulk",
        value: "Shulk",
        creator: "plastics enjoyer",
    },
    {
        label: "Reyn",
        value: "Reyn",
        creator: "plastics enjoyer",
    },
    {
        label: "Sharla",
        value: "Sharla",
        creator: "plastics enjoyer",
    },
    {
        label: "Dunban",
        value: "Dunban",
        creator: "plastics enjoyer",
    },
    {
        label: "Melia",
        value: "Melia",
        creator: "plastics enjoyer",
    },
    {
        label: "Riki",
        value: "Riki",
        creator: "plastics enjoyer",
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
        label: "Mike",
        value: "Mike",
        creator: "Defqon1",
    },
    {
        label: "Guy",
        value: "Guy",
        creator: "Defqon1",
    },
    {
        label: "Scout",
        value: "Scout",
        creator: "Flubby",
    },
    {
        label: "Gordon Freeman",
        value: "Gordon",
        creator: "plastics enjoyer",
    },
    {
        label: "Alyx Vance",
        value: "AlyxVance",
        creator: "plastics enjoyer",
    },
    {
        label: "Barney Calhoun",
        value: "BarneyCalhoun",
        creator: "plastics enjoyer",
    },
    {
        label: "Isaac Kleiner",
        value: "IsaacKleiner",
        creator: "plastics enjoyer",
    },
    {
        label: "Yu Narukami",
        value: "YuNarukami",
        creator: "plastics enjoyer",
    },
    {
        label: "Yosuke Hanamura",
        value: "YosukeHanamura",
        creator: "plastics enjoyer",
    },
    {
        label: "Chie Satonaka",
        value: "ChieSatonaka",
        creator: "plastics enjoyer",
    },
    {
        label: "Yukiko Amagi",
        value: "YukikoAmagi",
        creator: "plastics enjoyer",
    },
    {
        label: "Kanji Tatsumi",
        value: "KanjiTatsumi",
        creator: "plastics enjoyer",
    },
    {
        label: "Rise Kujikawa",
        value: "RiseKujikawa",
        creator: "plastics enjoyer",
    },
    {
        label: "Naoto Shirogane",
        value: "NaotoShirogane",
        creator: "plastics enjoyer",
    },
    {
        label: "Teddie",
        value: "Teddie",
        creator: "plastics enjoyer",
    },
    {
        label: "Tohru Adachi",
        value: "TohruAdachi",
        creator: "plastics enjoyer",
    },
    {
        label: "Fleet",
        value: "Fleet",
        creator: "Levthelion",
    },
    {
        label: "Slade",
        value: "Slade",
        creator: "Levthelion",
    },
    {
        label: "Hamir",
        value: "Hamir",
        creator: "Levthelion",
    },
    {
        label: "Artemis",
        value: "Artemis",
        creator: "Levthelion",
    },
    {
        label: "Alex",
        value: "Alex",
        creator: "Flubby",
    },
    {
        label: "Zombie Alex",
        value: "ZombieAlex",
        creator: "plastics enjoyer",
    },
    {
        label: "American Ness",
        value: "AmericanNess",
        creator: "plastics enjoyer",
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
        label: "Ness's Hat",
        value: "NessHat",
        creator: "stochaztic",
    },
    {
        label: "Alinivar",
        value: "Alinivar",
        creator: "plastics enjoyer",
    },
    {
        label: "Col. Saturn",
        value: "ColSaturn",
        creator: "plastics enjoyer",
    },
    {
        label: "Larice",
        value: "Larice",
        creator: "plastics enjoyer",
    },
    {
        label: "Zarbol",
        value: "Zarbol",
        creator: "plastics enjoyer",
    },
    {
        label: "Niiue",
        value: "Niiue",
        creator: "plastics enjoyer",
    },
    {
        label: "Niko",
        value: "Niko",
        creator: "plastics enjoyer",
    },
    {
        label: "Mira",
        value: "Mira",
        creator: "plastics enjoyer",
    },
    {
        label: "The Batter",
        value: "TheBatter",
        creator: "Bacon",
    },
    {
        label: "Kris (Deltarune)",
        value: "KrisDeltarune",
        creator: "plastics enjoyer",
    },
    {
        label: "Susie",
        value: "Susie",
        creator: "plastics enjoyer",
    },
    {
        label: "Ralsei",
        value: "Ralsei",
        creator: "plastics enjoyer",
    },
    {
        label: "Lancer",
        value: "Lancer",
        creator: "plastics enjoyer",
    },
    {
        label: "Noelle",
        value: "Noelle",
        creator: "Flubby",
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
        label: "Zombie Ness",
        value: "ZombieNess",
        creator: "plastics enjoyer",
    },
    {
        label: "Zombie Paula",
        value: "ZombiePaula",
        creator: "plastics enjoyer",
    },
    {
        label: "Zombie Jeff",
        value: "ZombieJeff",
        creator: "plastics enjoyer",
    },
    {
        label: "Zombie Poo",
        value: "ZombiePoo",
        creator: "plastics enjoyer",
    },
    {
        label: "Flying Ness",
        value: "FlyingNess",
        creator: "plastics enjoyer",
    },
    {
        label: "Flying Paula",
        value: "FlyingPaula",
        creator: "plastics enjoyer",
    },
    {
        label: "Flying Jeff",
        value: "FlyingJeff",
        creator: "plastics enjoyer",
    },
    {
        label: "Flying Poo",
        value: "FlyingPoo",
        creator: "plastics enjoyer",
    },
    {
        label: "Finn",
        value: "Finn",
        creator: "Flubby",
    },
    {
        label: "Jake",
        value: "Jake",
        creator: "Flubby",
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
        label: "Blanche",
        value: "Blanche",
        creator: "Defqon1",
    },
    {
        label: "Rose",
        value: "Rose",
        creator: "Defqon1",
    },
    {
        label: "Thomas",
        value: "Thomas",
        creator: "plastics enjoyer",
    },
    {
        label: "Guy-Manuel",
        value: "GuyManuel",
        creator: "plastics enjoyer",
    },
    {
        label: "Saul Goodman",
        value: "SaulGoodman",
        creator: "plastics enjoyer",
    },
    {
        label: "Walter White",
        value: "WalterWhite",
        creator: "plastics enjoyer",
    },
    {
        label: "Mike Ehrmantraut",
        value: "MikeEhrmantraut",
        creator: "plastics enjoyer",
    },
    {
        label: "Gustavo Fring",
        value: "GustavoFring",
        creator: "plastics enjoyer",
    },
    {
        label: "Jesse Pinkman",
        value: "JessePinkman",
        creator: "plastics enjoyer",
    },
    {
        label: "Kim Wexler",
        value: "KimWexler",
        creator: "plastics enjoyer",
    },
    {
        label: "Hank Schrader",
        value: "HankSchrader",
        creator: "plastics enjoyer",
    },
    {
        label: "First Doctor",
        value: "FirstDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Second Doctor",
        value: "SecondDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Third Doctor",
        value: "ThirdDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Fourth Doctor",
        value: "FourthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Fifth Doctor",
        value: "FifthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Sixth Doctor",
        value: "SixthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Seventh Doctor",
        value: "SeventhDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Eighth Doctor",
        value: "EighthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Ninth Doctor",
        value: "NinthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Tenth Doctor",
        value: "TenthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Eleventh Doctor",
        value: "EleventhDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Twelfth Doctor",
        value: "TwelfthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Thirteenth Doctor",
        value: "ThirteenthDoctor",
        creator: "plastics enjoyer",
    },
    {
        label: "Madotsuki",
        value: "Madotsuki",
        creator: "plastics enjoyer",
    },
    {
        label: "Urotsuki",
        value: "Urotsuki",
        creator: "plastics enjoyer",
    },
    {
        label: "Sabitsuki",
        value: "Sabitsuki",
        creator: "plastics enjoyer",
    },
    {
        label: "Usotsuki",
        value: "Usotsuki",
        creator: "plastics enjoyer",
    },
    {
        label: "Wayne",
        value: "Wayne",
        creator: "plastics enjoyer",
    },
    {
        label: "Somsnosa",
        value: "Somsnosa",
        creator: "plastics enjoyer",
    },
    {
        label: "Dedusmuln",
        value: "Dedusmuln",
        creator: "plastics enjoyer",
    },
    {
        label: "Pongorma",
        value: "Pongorma",
        creator: "plastics enjoyer",
    },
    {
        label: "Gibby",
        value: "Gibby",
        creator: "plastics enjoyer",
    },
    {
        label: "Murdoc",
        value: "Murdoc",
        creator: "plastics enjoyer",
    },
    {
        label: "2-D",
        value: "2D",
        creator: "plastics enjoyer",
    },
    {
        label: "Noodle",
        value: "Noodle",
        creator: "plastics enjoyer",
    },
    {
        label: "Russel",
        value: "Russel",
        creator: "plastics enjoyer",
    },
    {
        label: "Happy Easter Bunny",
        value: "HappyEasterBunny",
        creator: "Defqon1",
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
        label: "Andro",
        value: "Andro",
        creator: "Levthelion",
    },
    {
        label: "Maz",
        value: "Maz",
        creator: "Levthelion",
    },
    {
        label: "Nero",
        value: "Nero",
        creator: "Levthelion",
    },
    {
        label: "Dirk",
        value: "Dirk",
        creator: "Levthelion",
    },
    {
        label: "Zane",
        value: "Zane",
        creator: "Kayne",
    },
    {
        label: "Protogen",
        value: "Protogen",
        creator: "Purple Peak",
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

const customVanillaNames = [
    "Ness",
    "Paula",
    "Jeff",
    "Poo",
    "Gorgeous", // Red Singer - determined from script source files
    "Lucky", // Green Singer
    "Nice", // Drums
    "Okay", // Bass
    "Groovy", // Saxaphone
    "Thank You", // Keyboard
    "Aloysius Minch",
    "Annoying Old Party Man",
    "Apple Kid",
    "Armored Frog",
    "Arms Dealer",
    "Bag Lady",
    "Baseball Cap",
    "Beach Lady",
    "Bellboy",
    "Betty",
    "Black Rabbit",
    "Blue Suit Guy",
    "Bowler Hat",
    "Brick Road",
    "Bubble Monkey",
    "Bubble Monkey's Gal",
    "Burger Vendor",
    "Bus Driver",
    "Buzz Buzz",
    "Capsule",
    "Captain Strong",
    "Carpainter",
    "Charlie",
    "Chef",
    "Chick",
    "Clock",
    "Clumsy Robot",
    "Cop",
    "Cranky Lady",
    "Criminal Caterpillar",
    "Crooked Cop",
    "Crow",
    "Dalaam Girl",
    "Dalaam Servant",
    "Dalaam Woman",
    "Desert Monkey",
    "Detective",
    "Diamond",
    "Diamondized",
    "Doctor",
    "Donna",
    "Dr Andonuts",
    "Dreads Guy",
    "Drunk",
    "Duck",
    "Electra",
    "Electro Swoosh",
    "Elevator Lady",
    "Enrich Flavor",
    "Entertainer",
    "Escargo Express",
    "Everdred",
    "Exit Mouse Parent",
    "Fire",
    "Flower",
    "Flying Man",
    "Foppy",
    "Frank",
    "George Montague",
    "Gerardo Montague",
    "Ghost",
    "Gigantic Ant",
    "Grandma",
    "Grandpa",
    "Green Suit Guy",
    "Guardian Hieroglyph",
    "Handsome Puppet",
    "Hat And Mustache Man",
    "Healer",
    "Hint Man",
    "Hippie Enemy",
    "Hippie",
    "Holly",
    "ILove Guy",
    "Insane Cultist",
    "Jackie",
    "King Puppy",
    "Lardna Minch",
    "Lethal Asp Hieroglyph",
    "Liar X. Agerate",
    "Librarian",
    "Magic Butterfly",
    "Magic Cake Lady",
    "Manly Fish",
    "Marcy",
    "Master Criminal Worm",
    "Maxwell",
    "Mayor Pirkle",
    "Mini Ghost",
    "Miss Fake",
    "Mobile Sprout",
    "Mole Playing Rough",
    "Mole",
    "Mom",
    "Monotoli",
    "Mouse",
    "Mr Batty",
    "Mr. Fork",
    "Mr. Poochyfud",
    "Mr. Saturn",
    "Mr. Spoon",
    "Mr. T",
    "Mullet Guy",
    "Mummy",
    "Mushroom Girl",
    "Mushroom",
    "Ness Robot",
    "Nico",
    "Noose Man",
    "Nurse",
    "Old Cowboy",
    "Orange Guy",
    "Orange Kid",
    "Overzealous Cop",
    "Pajama Ness",
    "Paula's Dad",
    "Paula's Mom",
    "Phone Man",
    "Photo Man",
    "Picky",
    "Pigpen",
    "Pizza Guy",
    "Pokey",
    "Pokey (Fancy)",
    "Ponytail Girl",
    "Poo's Master",
    "Prototype Cheese Man",
    "Prototype Ness",
    "Pudding Vendor",
    "Pumpkin Head",
    "Pupuka",
    "Question Mark",
    "Ranboob",
    "Red Dalaam Guy",
    "Red Snake",
    "Red Vendor",
    "Risosha Richmonde",
    "Robot",
    "Rowdy Mouse",
    "Salaryman",
    "Saxaphonist",
    "Scarabian Guy",
    "Sea Captain",
    "Security Guard",
    "Sentry Robot",
    "Shades Moonsidian",
    "Shades",
    "Shark",
    "Ship Crewmate",
    "Shopping Lady",
    "Shy Guy",
    "Skelpion",
    "Slimy Pile",
    "Slots Brothers",
    "Smilin' Sphere",
    "Snake",
    "Spark",
    "Spear Guy",
    "Star Master",
    "Starman",
    "Sunbather",
    "Swimsuit Guy",
    "Swimsuit Lady",
    "Talah Rama",
    "Teddy Bear",
    "Tenda Chieftain",
    "Tenda",
    "Tessie Watcher",
    "Ticket Master",
    "Tiny Ruby Guy",
    "Tony",
    "Tough Guy",
    "Tourist Guide",
    "Tracy",
    "Traffic Sign",
    "Trash Can",
    "Trisha",
    "Turban Guy",
    "UFO",
    "Unassuming Local Guy",
    "Veil Lady",
    "Venus' Mother",
    "Venus",
    "Zap Eel",
    "Zombie Lady",
    "Zombie",
];

export const customVanillas = customVanillaNames.map(x => {
    return {
        label: x,
        value: x.replace(/[^0-9a-z]/gi, ''),
    }
});

export const vanillaSprites = [];

export const selectData = [
    {
        label: "Random",
        options: [
            { label: "No change", value: "NoChange"},
            { label: "Random vanilla", value: "RandomVanilla"},
            { label: "Random custom", value: "RandomCustom"},
            { label: "Random any", value: "RandomAny"},
        ],
    },
    {
        label: "Custom Sprites",
        options: customCharacters,
    },
    {
        label: "Expanded Vanilla Sprites",
        options: customVanillas,
    },
];

export async function testAllSprites(skipThemes = false) {
    for (const [name, url] of Object.entries(urls)) {
        if(skipThemes && name.includes("themes/")) continue;
        console.log(`Testing image ${name}`);
        try {
            let response = await fetch(url?.default || url);
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

export function getUrl(spriteDirectory, index) {
    let url = urls[`./sprites/${spriteDirectory}/${index.toString().padStart(3, '0')}.png`];
    if(!url && index === 1) {
        url = urls[`./sprites/${spriteDirectory}.png`];
    }
    if(!url) {
        url = urls[`./sprites/${spriteDirectory}-${index.toString().padStart(3, '0')}.png`];
    }
    return url?.default || url;
}

export async function prepareTheme(name) {
    const newObj = {};
    const prepareSprite = async function(index) {
        const url = getUrl(`themes/${name}`, index);
        if(!url) {
            return undefined;
        }
        let response = await fetch(url);
        let buffer = await response.arrayBuffer();
        const png = await bufferToPng(buffer);
        const processedGroup = processSpriteGroup(png);
        return processedGroup;
    };
    for(const i of [...Array(464).keys()]) {
        newObj[i] = await prepareSprite(i);
    };
    return newObj;
}

export async function prepareNPCs(exclusions = []) {
    const newObj = {};
    for(const index of unusedSprites) {
        const choices = customCharacters.map(c => c.value).filter(v => !exclusions.includes(v));
        const chosen = choices[Math.floor(Math.random()*choices.length)];
        exclusions.push(chosen);

        // 50% normal sprite, 25% PJ sprite, 25% Magicant sprite
        let chosenIndex = Math.random() > 0.5 ? 1 : (Math.random() > 0.5 ? 6 : 437);
        let url = getUrl(chosen, chosenIndex);
        if(!url) {
            url = getUrl(chosen, 1);
        }
        if(!url) {
            throw new Error(`Could not find main sprite for ${sprite}`);
        }
        let response = await fetch(url);
        let buffer = await response.arrayBuffer();
        const png = await bufferToPng(buffer);
        const processedGroup = processSpriteGroup(png);
        processedGroup.standardize = true;
        newObj[index] = processedGroup;
    }
    return newObj;
}

export async function prepare(sprite, index, theme) {
    const newObj = {};
    if(sprite === "NoChange") {
        return newObj;
    }
    if(sprite === "RandomAny") {
        sprite = Math.random() > 0.5 ? "RandomCustom" : "RandomVanilla";
    }
    if(sprite === "RandomVanilla") {
        const allVanillas = vanillaSprites.concat(customVanillas);
        sprite = allVanillas[Math.floor(Math.random()*allVanillas.length)].value;
    }
    if(!isNaN(sprite)) {
        newObj[index + 1] = sprite;
        return newObj;
    }
    if(sprite === "RandomCustom") {
        sprite = customCharacters[Math.floor(Math.random()*customCharacters.length)].value;
    }

    const prepareSprite = async function(index) {
        let url = null;
        if(theme) {
            url = getUrl(`themes/${theme}/${sprite}`, index);
        }
        if(!url) {
            url = getUrl(sprite, index);
        }
        if(!url) {
            if(index === 1) {
                throw new Error(`Could not find main sprite for ${sprite}`);
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

    if(byteIndexes.length < 4 || byteIndexes.length > 16) {
        throw new Error(`Incorrect number of non-blank sprites found: ${byteIndexes.length}`);
    }

    return {data: byteData, indexes: byteIndexes, palette};
}
