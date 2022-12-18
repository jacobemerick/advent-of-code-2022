const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function calculateScenicScore() {
  const treeHeightMatrix = [];
  const scenicScoreMatrix = [];

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (line) => {
    treeHeightMatrix.push(line.split(''));
    scenicScoreMatrix.push(new Array(line.length).fill(0));
  });

  await events.once(reader, 'close');

  const width = treeHeightMatrix[0].length;
  const height = treeHeightMatrix.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const treeHeight = treeHeightMatrix[y][x];

      const leftScenicScore = () => {
        let scenicScore = 0;

        for (let x1 = x - 1; x1 >= 0; x1--) {
          scenicScore++;
          if (treeHeightMatrix[y][x1] >= treeHeight) break;
        }

        return scenicScore;
      }

      const rightScenicScore = () => {
        let scenicScore = 0;

        for (let x1 = x + 1; x1 < width; x1++) {
          scenicScore++;
          if (treeHeightMatrix[y][x1] >= treeHeight) break;
        }

        return scenicScore;
      }

      const upScenicScore = () => {
        let scenicScore = 0;

        for (let y1 = y - 1; y1 >= 0; y1--) {
          scenicScore++;
          if (treeHeightMatrix[y1][x] >= treeHeight) break;
        }

        return scenicScore;
      }

      const downScenicScore = () => {
        let scenicScore = 0;

        for (let y1 = y + 1; y1 < height; y1++) {
          scenicScore++;
          if (treeHeightMatrix[y1][x] >= treeHeight) break;
        }

        return scenicScore;
      }

      const totalScenicScore = leftScenicScore() * rightScenicScore() * upScenicScore() * downScenicScore();
      scenicScoreMatrix[y][x] = totalScenicScore;
    }
  }

  let bestScenicScore = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < height; x++) {
      if (scenicScoreMatrix[y][x] > bestScenicScore) bestScenicScore = scenicScoreMatrix[y][x];
    }
  }

  console.log(bestScenicScore);
})();