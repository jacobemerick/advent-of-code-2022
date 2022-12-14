const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function navigateDirectory() {
  const terminal = [];

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (line) => {
    terminal.push(line);
  });

  await events.once(reader, 'close');

  let cwd = [];
  const fileSpaceMap = new Map();

  for (let i = 0; i < terminal.length; i++) {
    const parsedCommand = terminal[i].match(/^\$ ([a-z]{2})\s?(.*)?$/);
    if (parsedCommand !== null)  {
      if (parsedCommand[1] === 'cd') {
        if (parsedCommand[2] === '..') {
          cwd.shift();
        } else {
          cwd.unshift(parsedCommand[2]);
          fileSpaceMap.set(cwd.join('_'), 0);
        }
      } else if (parsedCommand[1] === 'ls') {
        while (true) {
          if (i >= terminal.length - 1) break;

          const parsedOutput = terminal[i + 1].match(/^([dir\d]+)\s(.*)$/);
          if (parsedOutput === null) break;

          i++;

          if (parsedOutput[1] === 'dir') continue;
          const filesize = Number(parsedOutput[1]);

          for (let j = 0; j < cwd.length; j++) {
            const key = cwd.slice(j).join('_');
            fileSpaceMap.set(key, fileSpaceMap.get(key) + filesize);
          }
        }
      }
    }
  }

  let totalSize = 0;
  fileSpaceMap.forEach(fileSpace => {
    if (fileSpace < 100000) totalSize += fileSpace;
  });
  console.log(totalSize);
})();