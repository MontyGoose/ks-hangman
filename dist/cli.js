"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const hangman_1 = require("./hangman");
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const lodash_1 = __importDefault(require("lodash"));
const figlet = require("figlet");
const clear = require("clear");
const CLI = require("clui"), Spinner = CLI.Spinner;
const hangman = new hangman_1.Hangman();
// let's ask for a name
// ask for KS1 or KS2?
// be friendly - pretent to think, get a hard word, suggest that they're getting warm, close, need to think harder. .. etc
// put in pauses (thinking time)
let GAnswers;
function startGame() {
    clear(); // clear the screen
    asciiPrint("Hangman");
    console.log(chalk_1.default.blueBright("Welcome to hangman."));
    getUserDetails();
    //
    // console.log(JSON.stringify(GAnswers, undefined, "  "));
    //
}
startGame();
/* ------------------------------------------------------- */
function getUserDetails() {
    const questions = [
        {
            type: "input",
            name: "first_name",
            message: "Hi - my name is Albert.  What's your name?"
        },
        {
            type: "checkbox",
            name: "word_list",
            message: "Do you want to play with KS1 or KS2 word?",
            choices: ["KS1", "KS2"],
            validate: function (answer) {
                if (answer.length < 1) {
                    return "You must choose at least one topping.";
                }
                return true;
            }
        }
    ];
    inquirer_1.default.prompt(questions).then(answers => {
        GAnswers = Object.assign({}, answers, GAnswers);
        console.log("\nOK, " + GAnswers.first_name + " let's begin..");
        initialiseGame();
    });
}
function playGame() {
    clear();
    asciiPrint(hangman.getWord().guess_word);
    console.log("You have " + hangman.getStatus().lives + " lives ... choose wisely");
    inquirer_1.default.prompt({
        type: "list",
        name: "letter_guess",
        message: "Pick a letter...",
        choices: lettersList()
    }).then(answers => {
        const guess = hangman.guess(answers.letter_guess);
        if (guess) {
            asciiPrint("YES");
        }
        else {
            asciiPrint("WRONG");
        }
        if (hangman.getStatus().lives > 0) {
            pressAnyKey();
        }
    });
}
function initialiseGame() {
    hangman.reset();
    // doSomeThinking("Finding a really hard word .. I'm going to win ...  ");
    console.log("Right .... - got a really though word now.. ha ha");
    asciiPrint(hangman.getWord().guess_word);
    pressAnyKey();
}
function pressAnyKey() {
    inquirer_1.default.prompt({
        type: "confirm",
        name: "anykey",
        message: "Press any key to continue ... .... ",
    }).then(() => {
        playGame();
    });
}
function doSomeThinking(words) {
    return __awaiter(this, void 0, void 0, function* () {
        const thinking = new Spinner(words, ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"]);
        thinking.start();
        const snooze = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done"), 2000);
        });
        yield snooze;
        thinking.stop();
    });
}
function asciiPrint(word) {
    console.log(chalk_1.default.blue(figlet.textSync(word)));
}
function lettersList() {
    return lodash_1.default.map(lodash_1.default.filter(hangman.getLetters(), { "guessed": false }), "letter");
}
//# sourceMappingURL=cli.js.map