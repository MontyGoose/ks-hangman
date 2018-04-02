"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const hangman_1 = require("../hangman");
const styles = require("../css/letters.css");
const hangman = new hangman_1.Hangman();
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Letters extends React.Component {
    LetterList() {
        const letters = hangman.getLetters().map((letter) => React.createElement("li", { key: letter.letter }, letter.letter));
        return letters;
    }
    render() {
        return React.createElement("ul", { className: styles.alphabet }, this.LetterList());
    }
}
exports.Letters = Letters;
//# sourceMappingURL=Letters.js.map