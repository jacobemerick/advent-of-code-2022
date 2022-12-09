const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function rearrangeCrates() {
  let stackedCrates = [];

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  let initialStack = false;
  const tempHolder = [];
  reader.on('line', (line) => {
    if (!initialStack) {
      if (line !== '') {
        tempHolder.push(line);
        return;
      }

      const crateStackCount = tempHolder.pop().split('   ').length;
      for (let i = 0; i < crateStackCount; i++) {
        stackedCrates.push([]);
      }

      tempHolder.forEach((level) => {
        level.match(/.{3,4}/g).forEach((col, stack) => {
          const matchCrate = col.match(/[A-Z]{1}/);
          if (!matchCrate) return;

          stackedCrates[stack].push(matchCrate.shift());
        });
      });

      initialStack = true;
      return;
    }

    const parsedCommand = line.match(/move (\d*) from (\d*) to (\d*)/);
    const moveCount = Number(parsedCommand[1]);
    const fromCol = Number(parsedCommand[2]) - 1;
    const toCol = Number(parsedCommand[3]) - 1;

    for (let i = 0; i < moveCount; i++) {
      stackedCrates[toCol].unshift(stackedCrates[fromCol].shift());
    }
  });

  await events.once(reader, 'close');

  console.log(`${stackedCrates.map((stack) => stack[0]).join('')}`);
})();