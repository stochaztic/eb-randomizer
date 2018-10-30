import RandomTools from 'randomtools-js';

import AncientCave from './AncientCave.js';
import BattleEntryObject from './BattleEntryObject.js';
import BgDataObect from './BgDataObject.js';
import Credits from './Credits.js';
import Dialog from './Dialog.js';
import EnemyObject from './EnemyObject.js';
import EnemyPlaceObject from './EnemyPlaceObject.js';
import EventObject from './EventObject.js';
import ExperienceObject from './ExperienceObject.js';
import InitialStatsObject from './InitialStatsObject.js';
import ItemObject from './ItemObject.js';
import MapEnemyObject from './MapEnemyObject.js';
import MapEventObject from './MapEventObject.js';
import MapMusicObject from './MapMusicObject.js';
import MapPaletteObject from './MapPaletteObject.js';
import MapSpriteObject from './MapSpriteObject.js';
import PcGfxObject from './PcGfxObject.js';
import PsiAbilityObject from './PsiAbilityObject.js';
import PsiTeleportObject from './PsiTeleportObject.js';
import ShopObject from './ShopObject.js';
import SpriteGroupObject from './SpriteGroupObject.js';
import StatGrowthObject from './StatGrowthObject.js';
import TeleportObject from './TeleportObject.js';
import TitleScreenCharacterObject from './TitleScreenCharacterObject.js';
import TPTObject from './TPTObject.js';
import ZoneEventObject from './ZoneEventObject.js';
import ZoneSpriteObject from './ZoneSpriteObject.js';
import LudicrousSpeedPatch from './LudicrousSpeedPatch.js';
import CreditsPatch from './CreditsPatch.js';
import DevmodePatch from './DevmodePatch.js';
import ExpandSavePatch from './ExpandSavePatch.js';
import RunButtonPatch from './RunButtonPatch.js';
import ShortenPrayerPatch from './ShortenPrayerPatch.js';
import ShowSpritesNoIntroPatch from './ShowSpritesNoIntroPatch.js';
import TitleDisableGlowPatch from './TitleDisableGlowPatch.js';
import TrackDoorsPatch from './TrackDoorsPatch.js';
import TrackStatsPatch from './TrackStatsPatch.js';
import ebutils from './ebutils.js';
import Cluster from './Cluster.js';

export function execute(romfile, specs, hooks) {
  const readWriteObjects = [
    AncientCave,
    BattleEntryObject,
    BgDataObect,
    Credits,
    Dialog,
    EnemyObject,
    EnemyPlaceObject,
    EventObject,
    ExperienceObject,
    InitialStatsObject,
    ItemObject,
    MapEnemyObject,
    MapEventObject,
    MapMusicObject,
    MapPaletteObject,
    MapSpriteObject,
    PcGfxObject,
    PsiAbilityObject,
    PsiTeleportObject,
    ShopObject,
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
  Credits.afterOrder = [AncientCave];
  Dialog.afterOrder = [PsiTeleportObject];
  EnemyPlaceObject.afterOrder = [BattleEntryObject];
  MapEnemyObject.afterOrder = [AncientCave];
  MapSpriteObject.afterOrder = [PsiTeleportObject, AncientCave];

  hooks = hooks || {};
  if(hooks.message === undefined) hooks.message = text => {
    postMessage({type: "info", text: text});
    console.log(text);
  };
  if(hooks.error === undefined) hooks.error = text => {
    postMessage({type: "error", text: `ERROR: ${text}`});
    console.error(text);
  };

  try {
    const patches = [ExpandSavePatch, CreditsPatch, TrackStatsPatch];
    
    if(specs.flags.a) patches.push(ShowSpritesNoIntroPatch);
    if(specs.flags.a) patches.push(TrackDoorsPatch);
    if(specs.flags.a) patches.push(TitleDisableGlowPatch);
    if(specs.flags.u >= 1) patches.push(RunButtonPatch);
    if(specs.flags.u >= 2) patches.push(LudicrousSpeedPatch);
    if(specs.flags.d >= 3) patches.push(ShortenPrayerPatch);
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
    if(context.specs.flags.t) {
      hooks.prePatch = c => {
        readWriteObjects.forEach(rwo => {
          rwo._displayName += " (tournament mode)";
        });
      };
    }

    const newROM = RandomTools.execute(context);

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
    if(specs.flags.devmode >= 2) debugger;
    return {rom: newROM, spoiler: spoiler};
  }
  catch(e) {
    hooks.error(e.message);
  }
}