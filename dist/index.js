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
        this.status = { lives: 0 };
        this.letters = [];
        this.word = {};
        this.reset();
    }
    reset() {
        this.status.lives = 9;
        this.buildAlphabet();
        this.word.raw_word = this.drawWord();
        this.word.guess_word = this.guess("e");
        this.word.guess_word = this.guess("o");
    }
    guess(letter) {
        this.setGuess(letter);
        let guess_word = this.word.raw_word;
        _.each(this.getGuesses(), function (item) {
            guess_word = guess_word.replace(new RegExp(item.letter + "|.", "gi"), c => {
                return c === item.letter ? c.toUpperCase() : c;
            });
        });
        return guess_word.replace(/[a-z-]/g, "-").toLowerCase(); // replace lowercase with dashes - and then lowercase result
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
    setGuess(letter) {
        _.find(this.letters, { "letter": letter }).guessed = true;
    }
    getGuesses() {
        return _.filter(this.letters, { "guessed": true });
    }
    drawWord() {
        return ks1_1.default[Math.floor(Math.random() * ks1_1.default.length)];
    }
    buildAlphabet() {
        // take letters and create structure
        for (const char of a) {
            this.letters.push({ "letter": char, "guessed": false, "inWord": false });
        }
    }
}
exports.Hangman = Hangman;
// get random work from list - private
//
// return current state of word - if no word - get word
//
// check letter in word - return T/F
//
// update current state of word
//
// reset - remove all stats and word
//
// //flow
//  - start Game
//  - reset all stats
//  - get word
//  -- get visibile state
//
//  - get guess
//    -- inform if guess in word
//    -- get visible state
//    -- if word guessed
//      - winner
//    -- if no guesses left
//      - looser
//    -- repeat
//# sourceMappingURL=index.js.map