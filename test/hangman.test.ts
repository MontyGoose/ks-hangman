import { Hangman } from "../dist/index"

let hangman = new Hangman();

test('Initialised Hangman to be set correctly', () => {
  expect(hangman.getStatus()).toEqual({"err": undefined, "lives": 9 });
  expect(hangman.getLetters()).toHaveLength(26);
  expect(typeof hangman.getWord().raw_word).toBe('string');
  expect(hangman.getWord().guess_word).toHaveLength(hangman.getWord().raw_word.length);
});

test('Guessing character not in alphabet', () => {
  const init_word = JSON.parse(JSON.stringify(hangman.getWord())); // deep clone
  expect(() => {
    hangman.guess("@");
  }).toThrow();
  expect(() => {
    hangman.getStatus().toEqual({ "err": "Guess letter @; is not in the chosen alphabet", "lives": 9 });
  })
});



test('Guessing character that does\'t exsit', () => {
  const init_word = JSON.parse(JSON.stringify(hangman.getWord())); // deep clone
  hangman.guess("z");
  expect(hangman.getStatus()).toEqual({"err": undefined, "lives": 8});
  const new_word = hangman.getWord();
  expect(new_word).toEqual(init_word);
});


test('Guessing character that does exsit', () => {
  const init_word = JSON.parse(JSON.stringify(hangman.getWord())); // deep clone
  const raw_word = init_word.raw_word;
  hangman.guess(raw_word.substr(0,1));
  const new_word = hangman.getWord();

  expect(hangman.getStatus()).toEqual({"err": undefined,"lives": 7});
  expect(new_word).not.toEqual(init_word);
  expect(new_word.raw_word).toEqual(init_word.raw_word);
  expect(new_word.guess_word).not.toEqual(init_word.guess_word);


});
