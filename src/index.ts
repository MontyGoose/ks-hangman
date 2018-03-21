import * as _ from "lodash";

import ks1Words from "./words/ks1";

interface ILetter {
  letter: string;
  guessed: boolean;
  inWord: boolean;
}

interface IStatus {
  lives: number;
  status?: string;
  err?: string;
}

interface IWord {
  guess_word: string;
  raw_word: string;
}

const a = "abcdefghijklmnopqrstuvwxyz";

export class Hangman {

  status: IStatus = {} as IStatus;
  letters = [] as Array<ILetter>;
  word = {} as IWord;

  constructor() {
    this.reset();
  }

  reset() { // will ideally of course be driven from options
    this.status = {"err": undefined, "lives": 9};
    this.buildAlphabet();
    this.word = this.initWord();
  }

  guess(letter: string) {
    try {
      this.check(letter);
      this.setGuess(letter);
      let guess_word = this.word.raw_word;
      _.each(this.getGuesses(), function(item) {
        guess_word = guess_word.replace(new RegExp(item.letter + "|.", "gi"), c => {
          return c === item.letter ? c.toUpperCase() : c;
        });
      });
      // updates
      this.word.guess_word = this.obfusicate(guess_word);
      this.status.lives--;
    } catch (err) {
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

  private check(letter: string) {
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

  private setGuess(letter: String) {
    _.find(this.letters, { "letter": letter }).guessed = true;
  }

  private getGuesses() {
    return _.filter(this.letters, { "guessed": true });
  }


  private initWord() {
    const pickedWord = ks1Words[Math.floor(Math.random() * ks1Words.length)];
    return { "raw_word": pickedWord, "guess_word": this.obfusicate(pickedWord) };
  }

  private obfusicate(word) {
    return word.replace(/[a-z-]/g, "-").toLowerCase();
  }

  private buildAlphabet() {
    for (const char of a) {
      this.letters.push({ "letter": char, "guessed": false, "inWord": false });
    }
  }
}
