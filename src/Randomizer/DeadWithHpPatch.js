import patchText from './tables/dead_with_hp_patch.txt';
import { utils } from 'randomtools-js';

const DeadWithHpPatch = {
    name: "Dead with HP fix",
    entries: utils.standardPatchLoader(patchText),
};

export default DeadWithHpPatch;