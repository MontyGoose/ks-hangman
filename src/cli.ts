import { Hangman } from "./hangman";
import chalk from "chalk";
import inquirer from "inquirer";
import _ from "lodash";

const figlet: any = require("figlet");
const clear: any = require("clear");
const CLI: any = require("clui"),
  Spinner = CLI.Spinner;
const hangman = new Hangman();


// let's ask for a name
// ask for KS1 or KS2?
// be friendly - pretent to think, get a hard word, suggest that they're getting warm, close, need to think harder. .. etc
// put in pauses (thinking time)

let GAnswers: { first_name: string, word_list: [string] };

function startGame() {
  clear(); // clear the screen
  asciiPrint("Hangman");
  console.log(chalk.blueBright("Welcome to hangman."));
  getUserDetails();
  //
  // console.log(JSON.stringify(GAnswers, undefined, "  "));
  //

}

startGame();

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
      validate: function(answer) {
        if (answer.length < 1) {
          return "You must choose at least one topping.";
        }
        return true;
      }
    }
  ];
  inquirer.prompt(questions).then(answers => {
    GAnswers = Object.assign({}, answers, GAnswers);
    console.log("\nOK, " + GAnswers.first_name + " let's begin..");
    initialiseGame();
  });
}


function playGame() {
  clear();
  asciiPrint(hangman.getWord().guess_word);
  console.log("You have " + hangman.getStatus().lives + " lives ... choose wisely");
  inquirer.prompt({
    type: "list",
    name: "letter_guess",
    message: "Pick a letter...",
    choices: lettersList()
  }).then(answers => {
    const guess = hangman.guess((answers as any).letter_guess);
    if (guess) {
      asciiPrint("YES");
    } else {
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
  inquirer.prompt(
    {
      type: "confirm",
      name: "anykey",
      message: "Press any key to continue ... .... ",
    }).then(() => {
      playGame();
    });
}


async function doSomeThinking(words) {
  const thinking = new Spinner(words, ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"]);
  thinking.start();
  const snooze = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), 2000);
  });
  await snooze;
  thinking.stop();
}

function asciiPrint(word: string) {
  console.log(chalk.blue(figlet.textSync(word)));
}
function lettersList() {
  return _.map(_.filter(hangman.getLetters(), { "guessed": false }), "letter");
}
