"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.word.guess_word = this.guess("");
    }
    guess(letter) {
        return this.word.raw_word.replace(new RegExp(letter + "|.", "gi"), c => {
            return c === letter ? c : "*";
        });
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