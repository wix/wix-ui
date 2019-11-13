const [/* execPath */, /* path */, ...args] = process.argv;

const gatherAll = require('./src/gather-all');

gatherAll(args[0])
  .then(parsed => console.log(JSON.stringify(parsed, null, 2)))
  .catch(console.log);
