import patchText from './tables/credits_patch.txt';
import { utils } from 'randomtools-js';

const CreditsPatch = {
    name: "Credits variable support",
    entries: utils.standardPatchLoader(patchText),
};

export default CreditsPatch;