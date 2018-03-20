import {Hangman} from "../dist/index"


beforeEach(() => {
  let hangman = new Hangman();
});

test('something works', () => {
  expect(hangman.getStatus()).toBe(100);
});
