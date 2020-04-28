/* eslint import/no-webpack-loader-syntax: off */
import patchText from '!array-loader!./tables/item_drop_pool_patch.txt';
import { utils } from 'randomtools-js';

const ItemDropPoolPatch = {
    name: "Item drop pool",
    entries: utils.standardPatchLoader(patchText),
    noVerify: true,
};

export default ItemDropPoolPatch;