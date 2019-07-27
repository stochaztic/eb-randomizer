import { utils } from 'randomtools-js';

const InstantRolldownPatch = {
    name: "Instant Rolldown",
    entries: utils.standardPatchLoader(["3FB1F: 00 00 08 00 00 00 08 00 00 00 08 00"]),
};

export default InstantRolldownPatch;