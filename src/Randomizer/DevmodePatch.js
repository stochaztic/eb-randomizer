/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/devmode_patch.txt';
import { utils } from 'randomtools-js';

const DevmodePatch = {
    name: "Devmode patch",
    entries: utils.standardPatchLoader(patchText),
};

export default DevmodePatch;