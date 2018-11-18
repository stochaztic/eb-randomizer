import { TableObject } from 'randomtools-js';

const firstWords = ["aahed","added","adder","adhan","adore","adorn","adrad","adred","ahead","ahent","ahuru","anana","anata","andro","anear","anent","annat","anode","antae","antar","anted","antra","antre","aorta","ardor","aread","areae","arear","aredd","arede","arena","arene","arere","arete","arett","arhat","arnut","aroha","arrah","arret","aruhe","atone","attar","audad","aurae","aurar","dadah","dared","darer","darre","dated","dater","datto","daunt","deare","dearn","death","deere","denar","denet","derat","dered","derro","derth","deter","doeth","donah","donee","doner","donna","donne","donor","donut","doona","doorn","dorad","doree","doted","doter","douar","doura","drant","dread","drear","dreed","drent","drere","drone","duded","duett","dunno","dured","durra","eaned","eared","earth","eaten","eater","eathe","enate","ended","ender","endue","enter","enure","enurn","erned","erode","erred","error","ether","etude","haded","hared","hated","hater","hatha","haunt","haute","heard","heare","heart","heath","heder","henna","heron","hoaed","hoard","hodad","hohed","honan","honda","honed","honer","honor","hoord","horah","horde","hoten","hound","hudna","hudud","hurra","nandu","nanna","nanua","narre","naunt","neath","nonet","north","noted","noter","nuder","oared","oaten","oater","odder","odeon","odour","ohone","onned","oohed","orant","orate","order","oread","ortho","other","ottar","otter","outdo","outed","outer","outre","outro","radar","radon","rahed","ranee","rared","raree","rarer","ratan","rated","rater","ratha","rathe","ratoo","readd","reata","reate","redan","reded","redon","reede","renne","rente","reran","rerun","retro","rhone","roate","roded","rodeo","ronde","rondo","roneo","ronne","ronte","rotan","roted","roton","rotor","rotte","rouen","round","route","routh","ruana","ruder","rueda","runed","taata","tanna","tanto","tardo","tared","tarot","tarre","tatar","tater","tatou","taunt","tauon","teade","teaed","teend","teene","teeth","tendu","tenet","tenne","tenno","tenon","tenor","tenth","tenue","terne","terra","tetra","thana","thane","theed","there","theta","thete","thorn","thoro","thrae","three","throe","todde","tondo","toned","toner","tonne","tooth","torah","toran","torot","torta","torte","toted","toter","trade","trant","tratt","tread","treat","treed","treen","trend","troad","troat","trode","trona","trone","troth","trout","trued","truer","truth","tuart","tuath","tuned","tuner","tutee","tutor","udder","uhuru","undee","under","undue","uneth","unhat","unred","urare","urate","urdee","uredo","urena","urent","urned","utter","turnt"];
const secondWords = ["baaed","bahut","banda","bandh","baned","bantu","barde","bardo","bared","barer","baron","barra","barre","barro","bated","bathe","baton","batta","battu","beard","beare","beath","beaut","bedad","benet","benne","bento","beret","berth","beted","beton","betta","bhoot","bhuna","board","boart","boded","bohea","boned","boner","bonne","booed","boord","booth","borde","bored","boree","borer","borna","borne","boron","botte","bound","bourd","bourn","brand","brane","brant","bread","brede","breed","breer","brent","brere","broad","brond","brood","broth","brunt","brute","bunde","bundh","bundt","bundu","buran","buret","burnt","buroo","burro","buteo","butte","butut"];
const oldWord = "earthound";

class TitleScreenCharacterObject extends TableObject {
    static shouldRandomize() {
        return true;
    }
    
    static mutateAll() {
        const newWord = this.context.random.choice(firstWords) + this.context.random.choice(secondWords).substring(1);
        this.every.forEach((o, i) => {
            const newLetter = newWord[i];
            const oldIndex = oldWord.indexOf(newLetter);
            o.data.address = this.get(oldIndex).oldData.address;
        });
    }

    static fullCleanup() {
        super.fullCleanup();

        // Rare Seed Generation
        if(!this.context.specs.totalGenerated || this.context.specs.flags.t) {
            return;
        }

        if(this.context.random.random() < 0.03) {
            const chosen = this.context.random.choice(this.every.map(o => o.oldData.address));
            this.every.forEach(o => {
                o.data.address = chosen;
            });
            this.context.rom.set([0x50, 0x00, 0xF0, 0x0C, 0xAD, 0xA7, 0x00, 0x29, 0x7F, 0x00, 0xEA, 0xEA], 0x10D33);
        }
    }
}

TitleScreenCharacterObject.tableSpecs = {
    text: ["address,2"],
    count: 9,
    pointer: 0x21CF9D,
};

TitleScreenCharacterObject._displayName = "title screen";
export default TitleScreenCharacterObject;
