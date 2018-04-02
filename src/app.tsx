import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hangman } from "./hangman";

import { Hello } from "./components/Hello";
import { Letters } from "./components/Letters";
import { Word } from "./components/Word";

const styles = require("./css/main.css");
const hangman = new Hangman();


ReactDOM.render(
    <Hello who="Isabel" />,
    document.getElementById("example")
);
ReactDOM.render(
  <Letters letters={hangman.getLetters()} />,
  document.getElementById("buttons")
);
ReactDOM.render(
  <Word word={hangman.getWord().guess_word} />,
  document.getElementById("word")
);
