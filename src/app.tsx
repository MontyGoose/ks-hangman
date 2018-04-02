import * as React from "react";
import * as ReactDOM from "react-dom";

import { HangmanGame } from "./components/HangmanGame";


ReactDOM.render(
  <HangmanGame word="hello" />,
  document.getElementById("root")
);
