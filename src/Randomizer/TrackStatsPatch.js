import patchText from './tables/track_stats_patch.txt';
import { utils } from 'randomtools-js';

const TrackStatsPatch = {
    name: "Track stats",
    entries: utils.standardPatchLoader(patchText),
};

export default TrackStatsPatch;