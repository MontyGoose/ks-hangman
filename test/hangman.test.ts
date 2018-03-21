import {Hangman} from "../dist/index"

  let hangman = new Hangman();

test('something works', () => {
  expect(hangman.getStatus()).toBe(100);
});
