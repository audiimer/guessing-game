
debugger
// Import the `readline` module
const readline = require('readline');

// Define the `checkGuess` function that takes an optional `counter` parameter with a default value of 3
let checkGuess = (counter = 4) => {
  // Clear the terminal screen
  process.stdout.write("\033c");

  // Create a new instance of the `readline` interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false // Set the `terminal` property to `false` to prevent input duplication
  });

  // Prompt the user to enter the maximum number
  rl.question('Enter Max number: ', (max) => {

    // Prompt the user to enter the minimum number
    rl.question('Enter Min number: ', (min) => {
      // Generate a random integer between `min` and `max`, inclusive
      const secretNumber = Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) + parseInt(min);

      // Check if `max` is smaller than `min`
      if (parseInt(max) < parseInt(min)) {
        // If so, display an error message and wait for 2 seconds before calling `checkGuess` again
        console.log('Max is smaller than Min. Please try again.');
        setTimeout(() => {
          checkGuess(counter);
        }, 2000);
        return;
      }

      // Define the `playAgain` function, which prompts the user to play again or exit
      const playAgain = () => {
        rl.question('Would you like to play again? (yes or no): ', (answer) => {
          if (answer === 'yes') {
            // If the user wants to play again, call `checkGuess` again
            checkGuess();
          } else {
            // Otherwise, display a farewell message and close the `readline` interface
            console.log('Thanks for playing!');
            rl.close();
          }
        });
      };

      // Define the `guessNumber` function, which prompts the user to guess the secret number
      const guessNumber = () => {
        rl.question("Guess the number I'm thinking: ", (guessedNumber) => {
          // Move the cursor to the beginning of the current line and clear it
          readline.cursorTo(process.stdout, 0);
          process.stdout.clearLine(0);

          if (parseInt(guessedNumber) === secretNumber) {
            // If the user guessed the secret number correctly, display a congratulatory message and call `playAgain`
            console.log("winner");
            playAgain();
          } else {
            if (counter === 1) {
              // If the user has no more guesses left, display a game over message and call `playAgain`
              console.log("Game Over");
              playAgain();
            } else if (counter > 1 && parseInt(guessedNumber)>secretNumber) {
              // If the user's guess is too high, decrement the `counter` and display a message with the remaining number of guesses before calling `guessNumber` again
              counter--;
              console.log(`Sorry, yo went to high. You have ${counter} more ${counter > 1 ? 'chances' : 'chance'}`);
              guessNumber();
            }else if (counter > 1 && parseInt(guessedNumber)<secretNumber) {
              // If the user's guess is too low, decrement the `counter` and display a message with the remaining number of guesses before calling `guessNumber` again
              counter--;
              console.log(`Sorry,you went too low. You have ${counter} more ${counter > 1 ? 'chances' : 'chance'}`);
              guessNumber();
            }
          }
        });
      };

      guessNumber();
    });
  });
};


checkGuess();
