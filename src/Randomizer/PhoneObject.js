/* eslint import/no-webpack-loader-syntax: off */
import { TableObject } from 'randomtools-js';
import tableText from '!array-loader!./tables/phone_table.txt';
import ebutils from './ebutils.js';

class PhoneObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.o; // Open
    }

    get name() {
        return ebutils.listToText(this.data.name_text);
    }

    set name(str) {
        this.data.name_text = ebutils.textToList(str, this.data.name_text.length);
    }

    mutate() {
        if(this.name.length > 0) {
            this.data.flag = 0xd9; // Pyramid entrance ready (set in PsiTeleportObject cleanup)
        }
    }
}

PhoneObject.tableSpecs = {
    text: tableText,
    count: 7,
    pointer: 0x157A8F,
};

PhoneObject._displayName = "phone numbers";
export default PhoneObject;