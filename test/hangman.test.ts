import {Hangman} from "../dist/index"

  let hangman = new Hangman();

test('Initialised Hangman to be set correctly', () => {
  expect(hangman.getStatus()).toEqual({"lives": 9});
  expect(hangman.getLetters()).toHaveLength(26);
  expect(hangman.getWord()).toBe({"lives": 9});
});
