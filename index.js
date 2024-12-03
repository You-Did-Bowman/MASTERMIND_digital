/// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- MASTERMIND -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

import promptSync from 'prompt-sync';
let prompt = promptSync();

import chalk from 'chalk';

/**
 * playGame() contains the whole game
 */
const playGame = () => {
class Player {
  constructor(name) {
    this.name = name;
    this.rounds = 0;

    // Descryptor-proberties:
    this.guess = "1111";
    this.green = 0;
    this.yellow = 0;
    this.red = 0;
  }

  // Coder-methods:
  /**
   * askForCode() asks for an input and triggers validateCode() as long as it is false
   */
  askForCode() {
    do {
      gameManager.code = prompt(`${chalk.red("Please enter your code")}: `);
    } while (!this.validateCode(gameManager.code));
  }

  /**
   * validateCode() validates the coder's input
   * 1. Turns the string into an array and reduces it at the same time, so that each element is a key with the value of its appearance in the string
   * 2. checks if the code passes the conditions:
   *   2.1 checks if the value of the element-key is bigger than one
   *   2.2 checks if the key is NaN
   *   2.3 checks if the length of the code is not equal to the diff length
   * @param {string} code
   * @returns if code is true or false
   */
  validateCode(code) {
    let codeArr = code.split("").reduce((acc, num) => {
      if (!acc[num]) {
        acc[num] = 0;
      }
      acc[num] += 1;
      return acc;
    }, {});

    if (Object.entries(codeArr).some((el) => el[1] > 1)) {
      console.log("The numbers in your code have to be unique.");
      return false;
    } else if (Object.entries(codeArr).some((el) => isNaN(el[0]))) {
      console.log("All digits in your code have to be a number.");
      return false;
    } else if (code.length !== gameManager.level.codeLength) {
      console.log("Your code is too long or too short.");
      return false;
    } else {
      return true;
    }
  }

  // Descryptor-methods:
  /**
   * checkGuess() compares the guess with the code
   * -> because guess and code are strings they are changed into arrays
   * @param {string} code
   * @param {string} guess
   * @returns how many digits are on the correct index in the guess
   */
  checkGuess(code, guess) {
    let guessArr = guess.split("");
    let codeArr = code.split("");

    for (let i = 0; i < codeArr.length; i++) {
      if (codeArr.includes(guessArr[i])) {
        if (codeArr[i] === guessArr[i]) {
          this.green++;
        } else {
          this.yellow++;
        }
      } else {
        this.red++;
      }
    }
    console.log(`🟢 = ${chalk.green(this.green)}`);
    console.log(`🟡 = ${chalk.yellow(this.yellow)}`);
    console.log(`🔴 = ${chalk.red(this.red)}`);
    console.log();
    return this.green;
  }

  /**
   * countRounds() count the guesser's rounds and logs a 
   * @returns the amount of rounds and saves it inside this.rounds
   */
  countRounds(code) {
    const answersAttempts = [
      "'Your brilliant plan has failed.' - Madagscar",
      "'It won't work, Dusty. You got the right numbers in the wrong game.' - Dead Reckoning",
      "'Okey-dokey, Maurice, I admit it. The plan failed.' - Madagscar",
      "'Into exile I must go. Failed I have.' - Star Wars: Episode III",
      "'Holy heart failure!' - Batman(1966)",
      "'Congratulations. Another one of your genius plans has backfired on you.' - Megamind",
      "'Men? Men are weak. The race of Men is failing.' - The Lord of the Rings",
    ];
    
    do {
      this.green = 0;
      this.red = 0;
      this.yellow = 0;
      this.guess = prompt(`Your guess: `);
      this.checkGuess(code, this.guess);
      this.rounds++;
      if (
        this.green !== gameManager.level.codeLength &&
        this.rounds < gameManager.level.maxRounds
      ) {
        const randomAnswer =
          answersAttempts[Math.floor(Math.random() * answersAttempts.length)];
        console.log(randomAnswer);
        console.log();
      }
    } while (
      this.green !== gameManager.level.codeLength &&
      this.rounds < gameManager.level.maxRounds
    );

    if (this.green >= gameManager.level.codeLength) {
      console.log(
        `${chalk.yellow("C")}${chalk.red("O")}${chalk.magenta(
          "N"
        )}${chalk.blue("G")}${chalk.green("R")}${chalk.blue("A")}${chalk.magenta(
          "T"
        )}${chalk.red("Z")}${chalk.yellow("!")}${chalk.green("!")} ${chalk.bold(this.name)} you needed ${chalk.blue(
          this.rounds
        )} tries to decrypt the code!`
      );
    } else if (this.rounds >= gameManager.level.maxRounds) {
      console.log(`${chalk.green(this.name)} you needed ${chalk.red(
        this.rounds
      )} attemps - which is the limit for ${chalk.underline(
        gameManager.difficulty,  "mode"
      )}.
      The code was ${chalk.red(gameManager.code)}`);

      restartGame();
    }
  }
}

class GameManager {
  constructor() {
    this.diffSettings = [
      { mode: "easy",
        codeLength: 3,
        maxRounds: 15,
      },
      { mode: "normal",
        codeLength: 4,
        maxRounds: 10,
      },
      { mode: "hard",
        codeLength: 5,
        maxRounds: 5,
      }
    ];
    this.difficulty = this.chooseDifficulty();
    this.level = this.getDiffSettings();
    this.code = [];
  }

  /**
   *chooseDifficulty() saves the difficulty mode in this.level 
   * @returns value for the property this.difficulty
   */
  chooseDifficulty() {
    console.log(
`Choose your difficulty:
${chalk.green("E")} - easy    -> Code length: 3, Max Attemps: 15
${chalk.yellow("N")} - normal -> Code length: 4, Max Attemps: 10
${chalk.red("H")} - hard      -> Code length: 5, Max Attemps: 5`); 
    const diffi = prompt(`> `);
    console.log();
    if (diffi.toLowerCase() === "e") {
      return this.difficulty = "easy";
    } else if (diffi.toLowerCase() === "n") {
      return this.difficulty = "normal";
    } else if (diffi.toLowerCase() === "h") {
      return this.difficulty = "hard";
    } else {
      console.log("Invalid Input.");
      this.chooseDifficulty();
    }
  }

  /**
   * getDiffSettings() saves the settings of the difficulty mode inside this.level
   * @returns value of the property this.level
   */
  getDiffSettings() {
    return this.diffSettings.find((level) => level.mode === this.difficulty)
  }

  /**
   * generateNPCode() generates the code for the NPC (Singleplayermode)
   * @returns string and saves this in this.code
   */
  generateNPCode() {
    while (this.code.length < this.level.codeLength) {
      let num = Math.floor(Math.random() * 10);
      if (!this.code.includes(num)) {
        this.code.push(num);
      }
    }
    console.log(this.code);
  
    return this.code.join("").toString();
  };
}

// -------------------------------------------------- GAME -------------------------------------------------------


  prompt(
    `
    ${chalk.underline(
`Welcome to ${chalk.yellow.bold("M")}${chalk.red.bold("A")}${chalk.magenta.bold(
"S")}${chalk.blue.bold("T")}${chalk.green.bold("E")}${chalk.blue.bold("R")}${chalk.magenta.bold(
"M")}${chalk.red.bold("I")}${chalk.yellow.bold("N")}${chalk.green.bold("D")} - ${chalk.italic("digital")}`
)}!
        
In Mastermind, the coder creates a secret number combination that the decryptor must guess. 
After each attempt, the decryptor gets feedback with 🔴, 🟡 and 🟢.
        
  🔴 = indicates how many numbers do not exist in the solution
  🟡 = indicates how many numbers appear in the solution but are in the wrong place
  🟢 = indicates how many numbers are on their right place

The decryptor has to find out the combination in as few attempts as possible.

< press "Enter" to ${chalk.bold("choose the mode")} >
`
); 

const gameManager = new GameManager();

console.log(`Do you play alone or with a friend?
Press:
${chalk.magenta.bold("S")} - for Singleplayer-Mode 
${chalk.blue.bold("M")} - for Multiplay-Mode`);

const mode = prompt("> "); 

console.clear();

if ((!mode.toLowerCase() === "s" && !mode.toLowerCase() === "m")) {
  console.log(
    `Invalide mode. Please choose ${chalk.magenta.bold(
      "S"
    )} or ${chalk.blue.bold("M")}`
  );
  
} else if (mode.toLowerCase() === "s") {
  // ---------------------------------------------- SINGLEPLAYER-MODE -----------------------------------------------
  prompt(
  `Hello Lonesome,
nice to meet you. You think you can hack my code? 
Let's see! 😈

< press "Enter" >
`);

const player = new Player("Lonesome");

gameManager.code = gameManager.generateNPCode();

player.countRounds(gameManager.code);

restartGame();

} else if (mode.toLowerCase() === "m") {
  // ------------------------------------------------ MULTIPLAYER-MODE --------------------------------------------
  
  const player1 = new Player(
    prompt(`${chalk.yellow("Player 1")} - What is your name? `)
  );
  console.log(`The coder's name is ${chalk.yellow(player1.name)}!`);
  
  console.log();
  
  const player2 = new Player(
    prompt(`${chalk.green("Player 2")} - What is you name? `)
  );
  console.log(`The decryptor's name is ${chalk.green(player2.name)}!`);

  console.clear();

  prompt(
    `${chalk.yellow(player1.name)} now it's time to send ${chalk.green(
      player2.name
    )} in an other room. 
    
There are two simple rules for your code:
    
1. the code needs to have ${gameManager.level.codeLength} numbers
2. each number has to be unique
      
< press "Enter" >
`
  );
  
  // FIRST ROUND -------------------------------------------------
  
  player1.askForCode();
  
  console.clear();
  
  prompt(
    `Let's see how long it takes ${chalk.green(player2.name)} to hack it.
Please get they back at the PC!
    
< press "Enter" >
`
  );

  player2.countRounds(gameManager.code);
  
  // SECOND ROUND ------------------------------------------------
  console.log();
  prompt(`${chalk.green(player2.name)} now it's time to send ${chalk.yellow(
    player1.name
  )} in an other room. 
  
There are two simple rules for your code:
  
1. the code needs to have ${gameManager.level.codeLength} numbers
2. each number has to be unique

< press "Enter" >
`);

player2.askForCode();

console.clear();

console.log(
  `Now it's your turn ${chalk.yellow(player1.name)}
  `
);

player1.countRounds(gameManager.code);

console.log();

// WINNER CEREMONY ---------------------------------------------

const findTheWinner = () => {
  let winner;
    if (player1.rounds < player2.rounds) {
      winner = `This time ${chalk.yellow.bold(player1.name.toUpperCase())} has won!`;
    } else if (player2.rounds < player1.rounds) {
      winner = `This time ${chalk.green.bold(player2.name.toUpperCase())} has won!`;
    } else {
      winner = `TIE! This time ${chalk.magenta.bold("BOTH PLAYER")} have won!`
    }
    ceremony1();
    setTimeout(ceremony2, 4000);
    setTimeout(() => ceremony3(winner), 8000);
    setTimeout(ceremony4, 7000);
    setTimeout(results, 10000);
    setTimeout(restartGame, 12000)
  }
  
  const ceremony1 = () => {
    console.log("You have finished the game!");
    console.log();
  }
  
  const ceremony2 = () => {
    console.log("But who is the better decryptor?");
    console.log();
  }
  
  const ceremony3 = (winner) => {
    console.log(winner);
    console.log();
  }
  const ceremony4 = () => {
    console.log("🎊 🎊 🐂 🎊 🎊 🎊 🎊 🎊 🐄 🎊 🎊");
    console.log();
  }
  
  const results = () => {
    console.log(
`${chalk.yellow(player1.name)}'s score: ${chalk.blue(player1.rounds)}
      
${chalk.green(player2.name)} 's score: ${chalk.blue(player2.rounds)}
      `);
    }

    findTheWinner();
  }  
}

/**
 * restartGames() asks to restart the game 
 * @returns the function playGame() or the credits
 */
const restartGame = () => {
  console.log();
  console.log("Do you want to restart the game? Y or N");
  const restart = prompt("> ");

  if (restart.toLowerCase() === "y") {
    console.clear();
    return playGame();
  } else if (restart.toLowerCase() === "n") {
    console.log(
`---- THE END ----
Inventor MASTERMIND = Mordechai (Marco) Meirovitz

Creative director = Judith Bohmann

Producer = Джудіт
    

'So long, and thanks for the all the fish'
  - Douglas Adams`
    ); 
    return;
  } else {
    console.log("Invalid input");
  }
}

playGame();

