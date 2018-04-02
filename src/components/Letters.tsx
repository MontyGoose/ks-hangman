import * as React from "react";
import { Hangman } from "../hangman";

const styles = require("../css/letters.css");

const hangman = new Hangman();

export interface LettersProps { }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Letters extends React.Component<LettersProps, {}> {

    LetterList() {
      const letters = hangman.getLetters().map((letter) =>
        <li key={letter.letter}>{letter.letter}</li>
      );
      return letters;
    }

    render() {
        return <ul className={styles.alphabet}>{this.LetterList()}</ul>;
    }


}
