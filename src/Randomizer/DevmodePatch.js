import patchText from './tables/devmode_patch.txt';
import { utils } from 'randomtools-js';

const DevmodePatch = {
    name: "Devmode patch",
    entries: utils.standardPatchLoader(patchText),
};

export default DevmodePatch;