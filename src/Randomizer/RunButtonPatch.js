/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/run_button_patch.txt';
import { utils } from 'randomtools-js';

const RunButtonPatch = {
    name: "Run button",
    entries: utils.standardPatchLoader(patchText),
};

export default RunButtonPatch;