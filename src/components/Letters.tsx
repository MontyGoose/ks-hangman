import * as React from "react";

const styles = require("../css/letters.css");

interface ILetter {
  letter: string;
  guessed: boolean;
  inWord: boolean;
}

export interface LettersProps {letters: ILetter[]}

export class Letters extends React.Component<LettersProps, {}> {

    LetterList() {
      const letters = this.props.letters.map((letter) =>
        <li key={letter.letter}>{letter.letter}</li>
      );
      return letters;
    }

    render() {
        return <ul className={styles.alphabet}>{this.LetterList()}</ul>;
    }


}
