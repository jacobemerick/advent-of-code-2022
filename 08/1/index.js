const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function parseTreeHeight() {
  const treeHeightMatrix = [];
  const visibleTreeMatrix = [];

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (line) => {
    treeHeightMatrix.push(line.split(''));
    visibleTreeMatrix.push(new Array(line.length).fill(0));
  });

  await events.once(reader, 'close');

  const width = treeHeightMatrix[0].length;
  const height = treeHeightMatrix.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const treeHeight = treeHeightMatrix[y][x];

      const isVisibleToTheLeft = () => {
        if (x === 0) return true;

        for (let x1 = x - 1; x1 >= 0; x1--) {
          if (treeHeightMatrix[y][x1] >= treeHeight) return false;
        }

        return true;
      }

      const isVisibleToTheRight = () => {
        if (x === width - 1) return true;

        for (let x1 = x + 1; x1 < width; x1++) {
          if (treeHeightMatrix[y][x1] >= treeHeight) return false;
        }

        return true;
      }

      const isVisibleFromAbove = () => {
        if (y === 0) return true;

        for (let y1 = y - 1; y1 >= 0; y1--) {
          if (treeHeightMatrix[y1][x] >= treeHeight) return false;
        }

        return true;
      }

      const isVisibleFromBelow = () => {
        if (y === height - 1) return true;

        for (let y1 = y + 1; y1 < height; y1++) {
          if (treeHeightMatrix[y1][x] >= treeHeight) return false;
        }

        return true;
      }

      if (
        isVisibleToTheLeft() ||
        isVisibleToTheRight() ||
        isVisibleFromAbove() ||
        isVisibleFromBelow()
      ) {
        visibleTreeMatrix[y][x] = 1;
      }
    }
  }

  let visibleTreeCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < height; x++) {
      if (visibleTreeMatrix[y][x] === 1) visibleTreeCount++;
    }
  }

  console.log(visibleTreeCount);
})();