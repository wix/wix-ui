const pathExtname = require('path').extname;

const tsExtensions = ['.ts', '.tsx'];

const ensureString = a => (typeof a === 'string' ? a : '');

const isTypescriptPath = path => tsExtensions.includes(pathExtname(ensureString(path)));

module.exports = isTypescriptPath;
