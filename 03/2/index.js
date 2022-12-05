const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function getTotalPriority() {
  let totalPriority = 0;

  const getPriority= (character) => {
    const charCode = character.charCodeAt(0);
    return (charCode > 96) ?
      charCode - 96 : // a-z
      charCode - 38; // A-Z
  }

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  let line = 1;
  let teams = [];

  reader.on('line', (rucksack) => {
    const rucksackContents = rucksack.split('');
    teams.push(rucksackContents);

    if (line % 3 === 0) {
      const teamBadge = teams[0].find(item => teams[1].includes(item) && teams[2].includes(item));
      totalPriority += getPriority(teamBadge);
      teams = [];
    }

    line++;
  });

  await events.once(reader, 'close');

  console.log(totalPriority);
})();