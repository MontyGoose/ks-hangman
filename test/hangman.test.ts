import { Hangman } from "../dist/hangman"

let hangman = new Hangman();


describe("Initialise game", () => {

  test('Initialised Hangman to be set correctly', () => {
    expect(() => {
      hangman.getStatus().toEqual({ "err": undefined, "lives": 9 });
    })
    expect(() => {
      hangman.getLetters().toHaveLength(26);
    })
    expect(() => {
      typeof hangman.getWord().raw_word.toBe('string');
    })
    expect(() => {
      hangman.getWord().guess_word.toHaveLength(hangman.getWord().raw_word.length);
    })
  });
});

describe("Main operations of the game", () => {

  test('Guessing character not in alphabet', () => {
    const init_word = JSON.parse(JSON.stringify(hangman.getWord())); // deep clone
    expect(() => {
      hangman.guess("@");
    }).toThrowError("Guess letter @; is not in the chosen alphabet");

    const status = hangman.getStatus();
    expect(status.lives).toBe(9);
    expect(status.err).toEqual("Guess letter @; is not in the chosen alphabet");
  });

  test('Guessing character that does\'t exsit', () => {
    const init_word = JSON.parse(JSON.stringify(hangman.getWord())); // deep clone
    hangman.guess("z");
    const new_word = hangman.getWord();

    expect(() => {
      hangman.getStatus().toEqual({ "err": undefined, "lives": 8 });
    })
    expect(() => {
      new_word.toEqual(init_word);
    })
  });

  test('Guessing character that does exsit', () => {
    const init_word = JSON.parse(JSON.stringify(hangman.getWord())); // deep clone
    const raw_word = init_word.raw_word;
    hangman.guess(raw_word.substr(0, 1));
    const new_word = hangman.getWord();

    expect(() => {
      hangman.getStatus().toEqual({ "err": undefined, "lives": 8 }); // don't lose a life - got it right
    })
    expect(() => {
      new_word.not.toEqual(init_word);
    })
    expect(() => {
      new_word.raw_word.toEqual(init_word.raw_word);
    })
    expect(() => {
      new_word.guess_word.not.toEqual(init_word.guess_word);
    })

  });
});

describe("Full game", () => {

  let init_word;
  let raw_word;

  beforeEach(() => {
    hangman.reset();
    init_word = JSON.parse(JSON.stringify(hangman.getWord())); // deep clone
    raw_word = init_word.raw_word;
  });

  test("correctly guess the word", () => {
    for (let char of uniqChars(raw_word)) {
      hangman.guess(char);
    }
    const new_word = hangman.getWord();

    expect(() => {
      new_word.guess_word.toEqual(new_word.raw_word);  // should have solved it
    })
  })

  test("incorrectly guess the word", () => {
    expect(() => {
      for (let char of getLettersNotInWord(raw_word)) {
        hangman.guess(char);
      }
    }).toThrowError("No lives left");

    const status = hangman.getStatus();
    expect(status.lives).toBe(0);
    expect(status.err).toEqual("No lives left");
  })
});

function getLettersNotInWord(str) {
  const aAr = "abcdefghijklmnopqrstuvwxyz".split('');
  return aAr.reduce((lStr, a) => !str.includes(a) ? lStr + a : lStr, "");
}

function uniqChars(str) {
  return str.replace(/[\s\S](?=([\s\S]+))/g, function(c, s) {
    return s.indexOf(c) + 1 ? '' : c;
  });
}
