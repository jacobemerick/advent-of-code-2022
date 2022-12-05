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

  reader.on('line', (rucksack) => {
    const rucksackContents = rucksack.split('');
    const secondCompartmentContents = rucksackContents.splice(rucksackContents.length / 2);
    const repeatItem = rucksackContents.find((item) => secondCompartmentContents.includes(item));
    totalPriority += getPriority(repeatItem);
  });

  await events.once(reader, 'close');

  console.log(totalPriority);
})();