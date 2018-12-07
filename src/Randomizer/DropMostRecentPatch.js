/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/drop_most_recent_patch.txt';
import { utils } from 'randomtools-js';

const DropMostRecentPatch = {
    name: "Drop most recent",
    entries: utils.standardPatchLoader(patchText),
};

export default DropMostRecentPatch;