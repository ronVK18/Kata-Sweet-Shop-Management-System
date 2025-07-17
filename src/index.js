const Sweet = require("./Sweets");
const Inventory = require("./Inventory");
const readline = require('readline');

// Create interface for reading input from CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Enter sweet names (type "quit" to exit):');

// Function to prompt continuously
function askInput() {
  rl.question('> ', (input) => {
    if (input.toLowerCase() === 'quit') {
      console.log('Exiting... 🧁');
      rl.close();
    } else {
      console.log(`You entered: ${input}`);
      askInput(); // Ask again
    }
  });
}

askInput();
