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

  guess(letter: string) { // should turn boolean if the guess was in word or not
    try {
      this.check(letter);  // are we OK to proceed will throw error if not
    } catch (err) {
      throw err;
    }
    this.updateLetters(letter); // update letters with guess
    this.updateWord(); // update word interface uses letters array (so ensure it's updated first)
    const goodGuess = this.updateStatus(letter);
    return goodGuess;
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

  /* UPDATE FUNCTIONS */
  private updateLetters(letter: string) { // update letters to show letters guessed
    _.find(this.letters, { "letter": letter }).guessed = true;
  }

  private updateStatus(letter: string) { // update status
    if (!this.word.raw_word.includes(letter)) {
      this.status.lives--; // only loose a life if letter NOT found
      return false;
    }
    return true;
  }

  private updateWord() { // update word
    let guess_word = this.word.raw_word;
    _.each(_.filter(this.letters, { "guessed": true }), function(item) {
      guess_word = guess_word.replace(new RegExp(item.letter + "|.", "gi"), c => {
        return c === item.letter ? c.toUpperCase() : c;
      });
    });
    this.word.guess_word = this.obfusicate(guess_word);
  }

  /* HELPER FUNCTIONS */
  private obfusicate(word) {
    return word.replace(/[a-z-]/g, "-").toLowerCase();
  }

  /* INIT / RESET FUNCTIONs */
  private initWord() {
    const pickedWord = ks1Words[Math.floor(Math.random() * ks1Words.length)];
    return { "raw_word": pickedWord, "guess_word": this.obfusicate(pickedWord) };
  }

  private buildAlphabet() {
    for (const char of a) {
      this.letters.push({ "letter": char, "guessed": false, "inWord": false });
    }
  }
}
