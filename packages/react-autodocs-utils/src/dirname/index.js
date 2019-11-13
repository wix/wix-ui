const { extname: pathExtname, dirname: pathDirname } = require('path');

// dirname : String -> String
const dirname = path => (pathExtname(path) ? pathDirname(path) : path);

module.exports = dirname;
