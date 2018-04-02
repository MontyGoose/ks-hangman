import * as React from "react";

const styles = require("../css/word.css");

export interface WordProps {word: string}

export class Word extends React.Component<WordProps, {}> {

    render() {
        return <span className={styles.guess_word}>{this.props.word}</span>;
    }

}
