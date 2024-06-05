import patchText from './tables/track_doors_patch.txt';
import { utils } from 'randomtools-js';

const TrackDoorsPatch = {
    name: "Track doors",
    entries: utils.standardPatchLoader(patchText),
};

export default TrackDoorsPatch;