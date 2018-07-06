import { TableObject } from 'randomtools-js';

class TitleScreenCharacterObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.d >= 3;
    }
}

TitleScreenCharacterObject.intershuffleAttributes = [
    "address",
];

TitleScreenCharacterObject.tableSpecs = {
    text: ["address,2"],
    count: 9,
    pointer: 0x21CF9D,
};

TitleScreenCharacterObject._displayName = "title screen";
export default TitleScreenCharacterObject;


// BG
// $e1aefd? anim color palettes