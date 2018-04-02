import * as React from "react";

const styles = require("../css/letters.css");

interface ILetter {
  letter: string;
  guessed: boolean;
  inWord: boolean;
}

export interface LettersProps {letters: ILetter[], onGuess: any}

export class Letters extends React.Component<LettersProps, {}> {
  constructor(props) {
     super(props)
     //this.onGuess = this.handleChange.bind(this)
   }
    LetterList() {
      const letters = this.props.letters.map((letter) =>
        <li className={letter.guessed ? styles.guessed : ''} key={letter.letter} onClick={() => this.props.onGuess(letter.letter)}>{letter.letter}</li>
      );
      return letters;
    }

    render() {
        return <ul className={styles.alphabet}>{this.LetterList()}</ul>;
    }


}
