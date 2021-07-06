const readFile = require('../read-file');
const parse = require('../parser');

module.exports = (
  path = '',
  options = {
    skipPropsWithoutDoc: false,
  }
) => readFile(path).then(({ source, path }) => parse({ source, path, options }));
