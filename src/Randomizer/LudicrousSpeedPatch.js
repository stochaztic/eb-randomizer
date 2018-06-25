import { utils } from 'randomtools-js';

const LudicrousSpeedPatch = {
    name: "Ludicrous Text Speed",
    entries: utils.standardPatchLoader(["44058: EA", "444E6: EA", "10D4E: EA"]),
};

export default LudicrousSpeedPatch;