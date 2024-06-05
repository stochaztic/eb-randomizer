import patchText from './tables/casey_no_instant_patch.txt';
import { utils } from 'randomtools-js';

const CaseyNoInstantPatch = {
    name: "Casey no instant",
    entries: utils.standardPatchLoader(patchText),
};

export default CaseyNoInstantPatch;