# EarthBound Randomizer ([earthbound.app](https://earthbound.app))

The EarthBound Randomizer is a program that randomizes a ROM for the Super Nintendo game EarthBound, providing endless unique gameplay experiences with many distinct modes. This randomizer runs entirely in your browser, no download required.

To use the randomizer, visit https://earthbound.app. You will need to provide a ROM file of EarthBound; we will not provide this file.

The site will provide a random integer as a seed. Leave this as is, or enter a specific integer if you want to play the same generated game as a friend. Any ROMs generated with the same version, seed, and flags will be identical.

Next, the site will ask you which primary mode you would like to play, as well as what flags you would like to set. You can pick and choose which features of the randomizer you want enabled. Dangerous features that may lead to an incompletable game are marked.

After all options are selected, press the 'Generate ROM' button to create the game. After the creation process you will see a button to download the new ROM, as well as one for a `.spoiler.json` file. If you get stuck during the game, you can use this file at https://map.earthbound.app to get a visual map of where doors lead to, what chest contents are, and other spoiler information.

By using `Help!` on the ATM card, you will be able to get details on the version of the randomizer used, the flags selected, and the seed of the particular game.

Most flags are self-explanatory, but additional details for some modes are included below.

## Ancient Cave mode – `a`

Ancient Cave mode completely changes how the game is played. It is the recommended mode for playing this randomizer. Check the website, as well as the tips document, for more details.

## Keysanity mode – `k`

Keysanity mode also radically changes how the game is played. 15 different key items have been shuffled around throughout the world; Mayor Pirkle may give you the Bicycle, while the Bike Shop guy may give you the Carrot key. To help you on this more complicated quest, however, Ness already knows PSI Teleport, and all available teleport locations are unlocked at the start of the game (including bonus teleports to South Winters and North Onett). Your goal is to beat the game as normal, but getting to all 8 Your Sanctuary locations will be more of a challenge.

Keysanity mode has been currently disabled from selection on the user interface due to softlock issues. If you still want to play this mode, you can manually add the `k` flag to a custom game URL.

The list of items that have had their locations shuffled in this mode is as follows:
- Franklin badge
- Shyness book
- King banana
- Key to the shack
- Hawk eye
- Bicycle
- Wad of bills
- Diamond
- Signed banana
- Pencil eraser
- Key to the tower
- Town map
- Carrot key
- Tendakraut - but the Tendakraut has been transformed into a Jar of Fly Honey
- Suporma - but the Suporma has been transformed into a Meteorite piece

Because you can get a Jar of Fly Honey through one of these 15 locations, it is not necessary to do the Jeff-alone-in-Winters part of the storyline. However, you can still do so if you wish, as the Boogey Tent will still contain a Jar of Fly Honey as well.

Be careful with how you proceed through storyline events! If you take a very unusual order, it is possible you may lock yourself out of having a character available until you complete Magicant. Since you can teleport anywhere instantly, you can get the game into very unusual states; this is expected and encouraged to take advantage of to get a lower time.

A few events have been made more lenient with regards to in-game triggers; notably, Venus will always give you her item right away, you can access the Pyramid without fighting Kraken (but you still must see the hieroglyphs), and Montague should always appear. It is also possible to get the game into a "spawns-off" condition. This is expected, but note if you game over in a spawns-off condition, you may softlock and have to reset the game, so be sure to save if necessary!

## Gift box contents – `g`

Randomizing gift box contents works differently in Ancient Cave mode and in non-Ancient Cave mode. In Ancient Cave mode, gift boxes will generally increase in value as you proceed deeper into the cave. About 60% of the gift boxes will be equipment. In early levels of the cave, you may get "skip-enabling" items such as the Pencil Eraser that could allow you to skip around in the cave.

In non-Ancient Cave mode, gift boxes will be replaced with an item that is similar in value to their contents in the normal game. However, every gift box has a 20% chance of being replaced by an item of any value, so there is a chance you could get a very good item very early.

## NPC and PC sprites – `n` and character selector

A special note should be made when playing with these options in non-Ancient-Cave modes, either Open, Keysanity, or "normal" EarthBound: There are a few scripted events that are bugged when these options are used. It will appear that the game is softlocked, but usually it will proceed after waiting 5-10 minutes. (Usually an NPC is walking all the way across the entire world map after spawning at an incorrect location.)

At this time, we believe we have patched all scripted events to be safe for all modes not marked unsafe. If you do encounter one of these situations, let us know where it is, as we would like to eventually fix all of them.

## Backgrounds – `b`

Our method of randomizing the battle backgrounds often leads to extremely good-looking results, but rarely, there will be a bright flashing palette used. If you are sensitive to bright flashing lights causing epilepsy or seizures, you may not want to enable this mode.

## Contact and Credits

There is a discussion channel for this randomizer at the [EarthBound Speedrunning Discord](https://discord.gg/WWVYwkE).

Custom sprite contributions by: stochaztic, Artheau, Quatropus, the salvation phoenix, Zephram, Aurilliux, Mouser, TheKubliest, Bacon, Zephram, and EBrent.

Custom music contributions by: Ari3s, avolience, Blazephlozard, D-Man, Triple-Q, vince94, and Xarlable.

This randomizer thanks greatly the Starmen.Net, PK Hack, and EarthBound Speedrunning communities for their contributions to making it possible, as well as the two predecessor EarthBound randomizers that very much inspired this project.

This version of the EarthBound Randomizer was originally based on and ported from [Bizarre Dimension](https://github.com/abyssonym/bizarre_dimension), created by Abyssonym; you can find him at [Twitter](https://www.twitter.com/abyssonym) or [his website](http://www.abyssonym.com/).

Some features were originally developed for the [EarthBound Reshuffler](https://earthboundcentral.com/reshuffler/), version 1.5 by [Tomato](https://twitter.com/ClydeMandelin) and version 2.1 by [Rydel](https://forum.starmen.net/forum/Community/PKHack/EarthBound-Reshuffler-2-0). 

Current development of this randomizer is being led by stochaztic; you can contact him either via the Issue Tracker on this repo, [Twitter](https://www.twitter.com/stochaztic), or on the [EarthBound Speedrunning Discord](https://discord.gg/WWVYwkE).
