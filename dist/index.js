"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = "abcdefghijklmnopqrstuvwxyz";
class Hangman {
    constructor() {
        this.status = { lives: 0 };
        this.letters = [];
        this.reset();
    }
    reset() {
        this.status.lives = 9;
        this.buildAlphabet();
        console.log(this.letters);
    }
    guess(letter) {
    }
    getStatus() {
        return this.status;
    }
    getWord() {
    }
    getLetters() {
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