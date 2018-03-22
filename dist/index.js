"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const ks1_1 = __importDefault(require("./words/ks1"));
const a = "abcdefghijklmnopqrstuvwxyz";
class Hangman {
    constructor() {
        this.status = {};
        this.letters = [];
        this.word = {};
        this.reset();
    }
    reset() {
        this.status = { "err": undefined, "lives": 9 };
        this.buildAlphabet();
        this.word = this.initWord();
    }
    guess(letter) {
        try {
            this.check(letter); // are we OK to proceed will throw error if not
        }
        catch (err) {
            throw err;
        }
        this.updateLetters(letter); // update letters with guess
        this.updateWord(letter); // update word interface with guess
        this.updateStatus(letter);
    }
    getStatus() {
        return this.status;
    }
    getWord() {
        return this.word;
    }
    getLetters() {
        return this.letters;
    }
    check(letter) {
        // only allow guess if we have enought lives
        // not game over
        // character is in alphabet (a)
        this.status.err = undefined;
        if (this.status.lives == 0) {
            this.status.err = "No lives left";
        }
        if (this.status.err == "Game Over") {
            this.status.err = "Game Over";
        }
        if (!a.includes(letter)) {
            this.status.err = "Guess letter " + letter + "; is not in the chosen alphabet";
        }
        if (this.status.err) {
            throw new Error(this.status.err);
        }
    }
    /* UPDATE FUNCTIONS */
    updateLetters(letter) {
        _.find(this.letters, { "letter": letter }).guessed = true;
    }
    updateStatus(letter) {
        if (!this.word.raw_word.includes(letter)) {
            this.status.lives--; // only loose a life if letter NOT found
            return false;
        }
        return true;
    }
    updateWord(letter) {
        let guess_word = this.word.raw_word;
        _.each(_.filter(this.letters, { "guessed": true }), function (item) {
            guess_word = guess_word.replace(new RegExp(item.letter + "|.", "gi"), c => {
                return c === item.letter ? c.toUpperCase() : c;
            });
        });
        this.word.guess_word = this.obfusicate(guess_word);
    }
    /* HELPER FUNCTIONS */
    obfusicate(word) {
        return word.replace(/[a-z-]/g, "-").toLowerCase();
    }
    /* INIT / RESET FUNCTION */
    initWord() {
        const pickedWord = ks1_1.default[Math.floor(Math.random() * ks1_1.default.length)];
        return { "raw_word": pickedWord, "guess_word": this.obfusicate(pickedWord) };
    }
    buildAlphabet() {
        for (const char of a) {
            this.letters.push({ "letter": char, "guessed": false, "inWord": false });
        }
    }
}
exports.Hangman = Hangman;
//# sourceMappingURL=index.js.map