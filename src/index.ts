import * as _ from "lodash";

import ks1Words from "./words/ks1";

interface ILetter {
  letter: String;
  guessed: Boolean;
  inWord: Boolean;
}

interface IStatus {
  lives: number;
}

interface IWord {
  guess_word: String;
  raw_word: String;
}

const a = "abcdefghijklmnopqrstuvwxyz";

export class Hangman {

  status: IStatus = { lives: 0 };
  letters = [] as Array<ILetter>;
  word = {} as IWord;

  constructor() {
    this.reset();
  }

  reset() { // will ideally of course be driven from options
    this.status.lives = 9;
    this.buildAlphabet();
    this.word.raw_word = this.drawWord();
    this.word.guess_word = this.guess("e");
    this.word.guess_word = this.guess("o");
  }

  guess(letter: String) {
    this.setGuess(letter);
    let guess_word = this.word.raw_word;
    _.each(this.getGuesses(), function(item) {
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

  private setGuess(letter: String) {
    _.find(this.letters, { "letter": letter }).guessed = true;
  }

  private getGuesses() {
    return _.filter(this.letters, { "guessed": true });
  }


  private drawWord() {
    return ks1Words[Math.floor(Math.random() * ks1Words.length)];
  }

  private buildAlphabet() {
    // take letters and create structure
    for (const char of a) {
      this.letters.push({ "letter": char, "guessed": false, "inWord": false });
    }
  }
}

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
