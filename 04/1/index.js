const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function getTotalPriority() {
  let overlappingAssignments = 0;

  const reader = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    crlfDelay: Infinity,
  });

  reader.on('line', (assignments) => {
    const [firstElf, secondElf] = assignments.split(',');
    const firstElfBounds = firstElf.split('-').map(Number);
    const secondElfBounds = secondElf.split('-').map(Number);

    if (
      firstElfBounds[0] >= secondElfBounds[0] && firstElfBounds[0] <= secondElfBounds[1] &&
      firstElfBounds[1] >= secondElfBounds[0] && firstElfBounds[1] <= secondElfBounds[1]
    ) {
      overlappingAssignments++;
      return;
    }

    if (
      secondElfBounds[0] >= firstElfBounds[0] && secondElfBounds[0] <= firstElfBounds[1] &&
      secondElfBounds[1] >= firstElfBounds[0] && secondElfBounds[1] <= firstElfBounds[1]
    ) {
      overlappingAssignments++;
      return;
    }
  });

  await events.once(reader, 'close');

  console.log(overlappingAssignments);
})();