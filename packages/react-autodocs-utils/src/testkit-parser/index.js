const path = require('path');

const getExport = require('./get-export');
const readFile = require('../read-file');

async function testkitParser(filePath) {
  const { source } = await readFile(filePath);
  const file = path.basename(filePath);

  return getExport(source, undefined, filePath).then(
    descriptor => ({ file, descriptor }),
    error => ({ file, error: error.stack ? error.stack.toString() : error })
  );
}

module.exports = testkitParser;
