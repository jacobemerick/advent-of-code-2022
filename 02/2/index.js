const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function findScore() {
  let totalScore = 0;

  const scoreMap = {
    A: 1,
    B: 2,
    C: 3,
  };

  const resultMap = {
    X: 0,
    Y: 3,
    Z: 6,
  };

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (round) => {
    const [ play, result ] = round.split(' ');

    const responseScore = (() => {
      switch (result) {
        case 'X':
          return (scoreMap[play] - 1 === 0) ? 3 : scoreMap[play] - 1;
        case 'Y':
          return scoreMap[play];
        case 'Z':
          return (scoreMap[play] + 1 === 4) ? 1 : scoreMap[play] + 1;
      }
    })();

    totalScore += (responseScore + resultMap[result]);
  });

  await events.once(reader, 'close');

  console.log(totalScore);
})();