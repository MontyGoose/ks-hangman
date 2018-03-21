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
            this.check(letter);
            this.setGuess(letter);
            let guess_word = this.word.raw_word;
            _.each(this.getGuesses(), function (item) {
                guess_word = guess_word.replace(new RegExp(item.letter + "|.", "gi"), c => {
                    return c === item.letter ? c.toUpperCase() : c;
                });
            });
            // updates
            this.word.guess_word = this.obfusicate(guess_word);
            this.status.lives--;
        }
        catch (err) {
            throw err;
        }
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
    setGuess(letter) {
        _.find(this.letters, { "letter": letter }).guessed = true;
    }
    getGuesses() {
        return _.filter(this.letters, { "guessed": true });
    }
    initWord() {
        const pickedWord = ks1_1.default[Math.floor(Math.random() * ks1_1.default.length)];
        return { "raw_word": pickedWord, "guess_word": this.obfusicate(pickedWord) };
    }
    obfusicate(word) {
        return word.replace(/[a-z-]/g, "-").toLowerCase();
    }
    buildAlphabet() {
        for (const char of a) {
            this.letters.push({ "letter": char, "guessed": false, "inWord": false });
        }
    }
}
exports.Hangman = Hangman;
//# sourceMappingURL=index.js.map