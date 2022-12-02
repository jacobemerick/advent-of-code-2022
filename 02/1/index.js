const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function findScore() {
  let totalScore = 0;

  const scoreMap = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  const playWeightMap = {
    A: 0,
    B: 1,
    C: 2,
  };

  const responseWeightMap = {
    X: 0,
    Y: 1,
    Z: 2,
  };

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (round) => {
    const [ play, response ] = round.split(' ');

    const playWeight = playWeightMap[play];
    const responseWeight = responseWeightMap[response];

    const roundScore = (() => {
      if (playWeight === responseWeight) {
        return 3;
      }

      if (playWeight === 2 && responseWeight === 0) {
        return 6;
      }

      if (playWeight === 0 && responseWeight === 2) {
        return 0;
      }

      if (playWeight > responseWeight) {
        return 0;
      }

      return 6;
    })();

    totalScore += (roundScore + scoreMap[response]);
  });

  await events.once(reader, 'close');

  console.log(totalScore);
})();