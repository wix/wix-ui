const readFile = require('../read-file');
const parse = require('../parser');

module.exports = (path = '') => readFile(path).then(parse);
