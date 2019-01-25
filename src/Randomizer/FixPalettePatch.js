/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/fix_palette_patch.txt';
import { utils } from 'randomtools-js';

const FixPalettePatch = {
    name: "Fix palette",
    entries: utils.standardPatchLoader(patchText),
};

export default FixPalettePatch;