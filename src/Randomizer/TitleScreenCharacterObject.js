import { TableObject } from 'randomtools-js';

class TitleScreenCharacterObject extends TableObject {
    static shouldRandomize() {
        return this.context.specs.flags.d >= 3;
    }

    static fullCleanup() {
        super.fullCleanup();
        if(this.shouldRandomize() && this.context.random.random() < 0.05) {
            const chosen = this.context.random.choice(this.every.map(o => o.oldData.address));
            this.every.forEach(o => {
                o.data.address = chosen;
            });
        }
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