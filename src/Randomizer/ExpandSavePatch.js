/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/expand_save_patch.txt';
import { utils } from 'randomtools-js';

const ExpandSavePatch = {
    name: "Expand save",
    entries: utils.standardPatchLoader(patchText),
};

export default ExpandSavePatch;