import ks1Words from "./words/ks1";

interface ILetter {
  letter: String;
  guessed: Boolean;
  inWord: Boolean;
}

interface IStatus {
  lives: number;
}

const a = "abcdefghijklmnopqrstuvwxyz";


export class Hangman {

  status: IStatus = {lives: 0};
  letters = [] as Array<ILetter>;

  constructor() {
     this.reset();
   }

  reset() { // will idealy of course be driven from options
    this.status.lives = 9;
    this.buildAlphabet();
    console.log(this.letters);
  }

  guess(letter: String) {

  }

  getStatus() {
    return this.status;
  }

  getWord() {

  }

  getLetters() {

  }

  private buildAlphabet() {
    // take letters and create structure
    for (const char of a) {
      this.letters.push({"letter": char, "guessed": false, "inWord": false});
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
