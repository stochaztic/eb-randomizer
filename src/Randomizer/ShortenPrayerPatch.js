import patchText from './tables/shorten_prayer_patch.txt';
import { utils } from 'randomtools-js';

const ShortenPrayerPatch = {
    name: "Shorten prayer",
    entries: utils.standardPatchLoader(patchText),
};

export default ShortenPrayerPatch;