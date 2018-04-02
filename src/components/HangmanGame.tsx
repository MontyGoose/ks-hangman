import * as React from "react";

import { Hangman } from "../hangman";

import { Hello } from "./Hello";
import { Letters } from "./Letters";
import { Word } from "./Word";
import { Status } from "./Status";


const styles = require("../css/main.css");
const hangman = new Hangman();

export interface WordProps {word: string}

export class HangmanGame extends React.Component<WordProps, {}> {
  constructor(props) {
    super(props);
    this.state = {lives: hangman.getStatus().lives};
    this.handleGuess = this.handleGuess.bind(this);
  }

  handleGuess(guess:string) {
    hangman.guess(guess);
    this.setState({
      lives: hangman.getStatus().lives
    });
  }

  render() {
    return <div className="wrapper">
      <Hello who="Isabel" />
      <Letters letters={hangman.getLetters()} onGuess={this.handleGuess}/>
      <Word word={hangman.getWord().guess_word} />
      <Status status={hangman.getStatus()} word={hangman.getWord().raw_word} />
    </div>;
  }

}
