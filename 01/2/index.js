const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function findMaxCalories() {
  let elfNumber = 0;
  let elfCalorieTracker = [];
  elfCalorieTracker.push(0);

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (calories) => {
    if (calories === '') {
      elfNumber++;
      elfCalorieTracker.push(0);
    } else {
      elfCalorieTracker[elfNumber] += Number(calories);
    }
  });

  await events.once(reader, 'close');

  const sumOfTopThreeElves = elfCalorieTracker
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, a) => sum + a);
  
  console.log(sumOfTopThreeElves);
})();