const parse = require('../../parser/parse');
const { optimizeSource, optimizeAST } = require('./optimizations');

module.exports = source => optimizeAST(parse(optimizeSource(source)));
