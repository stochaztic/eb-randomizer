/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/psi_ability_table.txt';

class PsiAbilityObject extends TableObject {
    cleanup() {
        if(this.context.specs.flags.k && this.data.name_index === 0x11 && this.data.greek_letter === 0x01) {
            this.data.ness_level = 1;
        }
    }
}

PsiAbilityObject.tableSpecs = {
    text: tableText,
    count: 53,
    pointer: 0x158a50,
};

PsiAbilityObject._displayName = "psi ability";
export default PsiAbilityObject;