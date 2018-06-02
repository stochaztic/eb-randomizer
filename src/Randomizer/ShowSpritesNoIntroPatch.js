/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/show_sprites_no_intro.txt';
import { utils } from 'randomtools-js';

const ShowSpritesNoIntroPatch = {
    name: "Show sprites no intro",
    entries: utils.standardPatchLoader(patchText),
};

export default ShowSpritesNoIntroPatch;