import patchText from './tables/expand_save_patch.txt';
import { utils } from 'randomtools-js';

const ExpandSavePatch = {
    name: "Expand save",
    entries: utils.standardPatchLoader(patchText),
};

export default ExpandSavePatch;