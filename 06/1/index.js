const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function parseSignal() {
  let marker = '';
  let position = 4;

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (line) => {
    const chars = line.split('');
    do {
      marker = chars.slice(position - 4, position);
      if ((new Set(marker)).size === marker.length) {
        return;
      }
    } while (position++)
  });

  await events.once(reader, 'close');

  console.log(`${marker.join('')} is unique at position ${position}`);
})();