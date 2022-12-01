const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function findMaxCalories() {
  let elfCalories = 0;
  let maxElfCalories = 0;

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (calories) => {
    if (calories === '') {
      if (elfCalories > maxElfCalories) {
        maxElfCalories = elfCalories;
      }
      elfCalories = 0;
    } else {
      elfCalories += Number(calories);
    }
  });

  await events.once(reader, 'close');

  console.log(maxElfCalories);
})();