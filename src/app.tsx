import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Letters } from "./components/Letters";

const styles = require("./css/main.css");


ReactDOM.render(
    <Hello who="Isabel" />,
    document.getElementById("example")
);
ReactDOM.render(
  <Letters />,
  document.getElementById("buttons")
);
