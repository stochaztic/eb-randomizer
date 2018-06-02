/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/experience_table.txt';

class ExperienceObject extends TableObject {
    cleanup() {
        if(!this.context.specs.flags.a) return;
        const perCharacter = 100;
        const level = (this.index % perCharacter) - 2;
        if(level < 0) return;
        console.assert(this.data.xp);
        console.assert(level < perCharacter - 2);
        let progress = level / (perCharacter - 3);
        console.assert(progress <= 1);
        progress *= 2;
        if(progress >= 1) return;
        progress = progress ** 0.5;
        console.assert(this.data.xp === this.oldData.xp);
        this.data.xp = Math.round(this.data.xp * progress)
        this.data.xp = Math.max(this.data.xp, 1);
        const previous = ExperienceObject.get(this.index - 1);
        console.assert(previous.data.xp === 0 || previous.oldData.xp !== previous.data.xp);
        this.data.xp = Math.max(this.data.xp, previous.data.xp + 1);
    }
}

ExperienceObject.tableSpecs = {
    text: tableText,
    count: 400,
    pointer: 0x158f49,
};

ExperienceObject._displayName = "experience";
export default ExperienceObject;