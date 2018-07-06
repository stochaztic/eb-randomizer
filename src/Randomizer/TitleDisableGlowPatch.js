/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/title_disable_glow_patch.txt';
import { utils } from 'randomtools-js';

const TitleDisableGlowPatch = {
    name: "Title disable glow",
    entries: utils.standardPatchLoader(patchText),
};

export default TitleDisableGlowPatch;