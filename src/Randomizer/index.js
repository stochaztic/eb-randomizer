import RandomTools from 'randomtools-js';

import AncientCave from './AncientCave.js';
import BattleEntryObject from './BattleEntryObject.js';
import BgDataObject from './BgDataObject.js';
import BgPaletteObject from './BgPaletteObject.js';
import Credits from './Credits.js';
import Dialog from './Dialog.js';
import EnemyObject from './EnemyObject.js';
import EnemyPaletteObject from './EnemyPaletteObject.js';
import EnemyPlaceObject from './EnemyPlaceObject.js';
import EventObject from './EventObject.js';
import ExperienceObject from './ExperienceObject.js';
import FlavorObject from './FlavorObject.js';
import InitialStatsObject from './InitialStatsObject.js';
import ItemObject from './ItemObject.js';
import MapEnemyObject from './MapEnemyObject.js';
import MapEventObject from './MapEventObject.js';
import MapMusicObject from './MapMusicObject.js';
import MapPaletteObject from './MapPaletteObject.js';
import MapPaletteDataObject from './MapPaletteDataObject.js';
import MapSpriteObject from './MapSpriteObject.js';
import MusicObject from './MusicObject.js';
import PcGfxObject from './PcGfxObject.js';
import PhoneObject from './PhoneObject.js';
import PsiAbilityObject from './PsiAbilityObject.js';
import PsiTeleportObject from './PsiTeleportObject.js';
import ShopObject from './ShopObject.js';
import SpecialAbilities from './SpecialAbilities.js';
import SpriteGroupObject from './SpriteGroupObject.js';
import StatGrowthObject from './StatGrowthObject.js';
import TeleportObject from './TeleportObject.js';
import TitleScreenCharacterObject from './TitleScreenCharacterObject.js';
import TPTObject from './TPTObject.js';
import ZoneEventObject from './ZoneEventObject.js';
import ZoneSpriteObject from './ZoneSpriteObject.js';
import LudicrousSpeedPatch from './LudicrousSpeedPatch.js';
import CaseyNoInstantPatch from './CaseyNoInstantPatch.js';
import CreditsPatch from './CreditsPatch.js';
import DeadWithHpPatch from './DeadWithHpPatch.js';
import DevmodePatch from './DevmodePatch.js';
import DropMostRecentPatch from './DropMostRecentPatch.js';
import ExpandSavePatch from './ExpandSavePatch.js';
import FixPalettePatch from './FixPalettePatch.js';
import InstantRolldownPatch from './InstantRolldownPatch.js';
import LongPartyPatch from './LongPartyPatch.js';
import RunButtonPatch from './RunButtonPatch.js';
import ShortenPrayerPatch from './ShortenPrayerPatch.js';
import ShowSpritesNoIntroPatch from './ShowSpritesNoIntroPatch.js';
import SpyImprovePatch from './SpyImprovePatch.js';
import TitleDisableGlowPatch from './TitleDisableGlowPatch.js';
import TrackDoorsPatch from './TrackDoorsPatch.js';
import TrackStatsPatch from './TrackStatsPatch.js';
import ebutils from './ebutils.js';
import Cluster from './Cluster.js';

export async function execute(romfile, specs, hooks) {
  const readWriteObjects = [
    AncientCave,
    BattleEntryObject,
    BgDataObject,
    BgPaletteObject,
    Credits,
    Dialog,
    EnemyObject,
    EnemyPaletteObject,
    EnemyPlaceObject,
    EventObject,
    ExperienceObject,
    FlavorObject,
    InitialStatsObject,
    ItemObject,
    MapEnemyObject,
    MapEventObject,
    MapMusicObject,
    MapPaletteObject,
    MapPaletteDataObject,
    MapSpriteObject,
    MusicObject,
    PcGfxObject,
    PhoneObject,
    PsiAbilityObject,
    PsiTeleportObject,
    ShopObject,
    SpecialAbilities,
    SpriteGroupObject,
    StatGrowthObject,
    TeleportObject,
    TitleScreenCharacterObject,
    TPTObject,
    ZoneEventObject,
    ZoneSpriteObject,
  ];

  AncientCave.afterOrder = [PsiTeleportObject];
  BattleEntryObject.afterOrder = [EnemyObject];
  BgPaletteObject.afterOrder = [BgDataObject];
  Credits.afterOrder = [AncientCave];
  Dialog.afterOrder = [PsiTeleportObject];
  EnemyPlaceObject.afterOrder = [BattleEntryObject];
  MapEnemyObject.afterOrder = [AncientCave];
  MapMusicObject.afterOrder = [AncientCave, EnemyObject];
  MapSpriteObject.afterOrder = [PsiTeleportObject, AncientCave];

  try {
    const patches = [ExpandSavePatch, TitleDisableGlowPatch, FixPalettePatch, DeadWithHpPatch];
    if(!specs.special) {
      patches.push(CreditsPatch);
      patches.push(TrackStatsPatch);
    }
    
    if(specs.flags.a) patches.push(ShowSpritesNoIntroPatch);
    if(specs.flags.a) patches.push(TrackDoorsPatch);
    if(specs.flags.g >= 1 || specs.flags.s >= 1) patches.push(CaseyNoInstantPatch);
    if(specs.flags.c >= 2) patches.push(SpyImprovePatch);
    if(specs.flags.u.discardButton) patches.push(DropMostRecentPatch);
    if(specs.flags.u.runButton) patches.push(RunButtonPatch);
    if(specs.flags.u.ludicrousSpeed) patches.push(LudicrousSpeedPatch);
    if(specs.flags.u.shortPrayers) patches.push(ShortenPrayerPatch);
    if(specs.flags.z.instantRolldown) patches.push(InstantRolldownPatch);
    if(specs.flags.z.longParty) patches.push(LongPartyPatch);
    if(specs.flags.devmode) patches.push(DevmodePatch);


    const context = {
      rom: romfile, 
      specs: specs,
      patches: patches,
      objects: readWriteObjects,
      hooks: hooks,
    }

    if(context.specs.flags.a && context.specs.flags.k) {
      throw new Error("Ancient Cave and Keysanity modes are incompatible.");
    }
    if(context.specs.flags.a && context.specs.flags.o) {
      throw new Error("Ancient Cave and Open modes are incompatible.");
    }
    if(context.specs.flags.k && context.specs.flags.o) {
      throw new Error("Keysanity and Open modes are incompatible.");
    }
    if(context.specs.flags.t) {
      hooks.prePatch = c => {
        readWriteObjects.forEach(rwo => {
          rwo._displayName += " (tournament mode)";
        });
      };
    }

    MapSpriteObject.randomDegree = 0.8;

    context.specs.preparedSongs = [];


    if(context.rom.length < 0x400000) {
      const expandedROM = new Uint8Array(context.rom.length + 0x100000);
      expandedROM.set(context.rom);
      context.rom = expandedROM;
    }
    
    const newROM = await RandomTools.execute(context);

    let spoiler = undefined;
    if(!specs.flags.t) {
      hooks.message("Preparing spoiler file...");
      spoiler = {
        specs: specs,
        timestamp: Date.now(),
        chests: MapSpriteObject.every.filter(m => m.isChest).map(o => o.serialize())
      };
      if(specs.flags.k) {
        spoiler.keysanity = PsiTeleportObject.serialize();
      }
      if(specs.flags.a) {
        Cluster.markShortestPath();
      }
      if(specs.flags.a || specs.flags.devmode) {
        spoiler.clusters = Cluster.every.map(o => o.serialize(context));
        spoiler.bosses = MapSpriteObject.every.filter(o => ebutils.SANCTUARY_BOSS_INDEXES.includes(o.index)).map(o => o.serialize());
      }
      if(specs.flags.devmode) {
        spoiler.enemies = MapEnemyObject.every.map(o => o.serialize());
      }
    }

    hooks.message("DONE");
    if(specs.flags.devmode >= 2) {
      const extract = index => {
        const sgo = SpriteGroupObject.every[index];
        const spriteMult = 32;
        const spriteSize = spriteMult * sgo.oldData.height * (sgo.oldData.width >> 4);
        let ptrs = sgo.spriteCount > 8 ? [...sgo.oldData.sprites_cardinal, ...sgo.oldData.sprites_diagonal] : sgo.oldData.sprites_cardinal;
        ptrs = ptrs.map(ptr => (sgo.oldData.bank << 16) | ptr);
        const usedSet = {};
        let currentOffset = 0;
        const offsets = [];
        const data = new Uint8Array(spriteSize * ptrs.length);
        ptrs.forEach(ptr => {
            const isFlip = ptr & 1;
            const truePtr = (ptr - isFlip) & 0x3fffff;
            if(usedSet[truePtr] !== undefined) {
                offsets.push(usedSet[truePtr] + isFlip);
                return;
            }
            data.set(newROM.slice(truePtr, truePtr + spriteSize), currentOffset);
            usedSet[truePtr] = currentOffset;
            offsets.push(currentOffset + isFlip);
            currentOffset += spriteSize;
        });
        console.log(offsets);

        const content = {
          name: `${index.toString().padStart(3,'0')}.bin`,
          data: data.slice(0, currentOffset),
        };
        hooks.download(content);
        return JSON.stringify(offsets);
      };
      const encode = x => ebutils.encodeText(x);
      console.log(`extract: ${extract.name}`);
      console.log(`encode: ${encode.name}`);
      debugger;
    }
    return {rom: newROM, spoiler: spoiler};
  }
  catch(e) {
    hooks.error(e.message);
  }
}