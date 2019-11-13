const generate = require('@babel/generator').default;

const print = ast => generate(ast).code;

module.exports = print;
