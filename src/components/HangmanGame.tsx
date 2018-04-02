import * as React from "react";

import { Hangman } from "../hangman";

import { Hello } from "./Hello";
import { Letters } from "./Letters";
import { Word } from "./Word";

const styles = require("../css/main.css");
const hangman = new Hangman();

export interface WordProps {word: string}

export class HangmanGame extends React.Component<WordProps, {}> {

  render() {
    return <div className="wrapper">
      <Hello who="Isabel" />
      <Letters letters={hangman.getLetters()} />
      <Word word={hangman.getWord().guess_word} />
    </div>;
  }

}
