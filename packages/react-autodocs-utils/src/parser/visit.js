const traverse = require('@babel/traverse').default;

const visit = ast => visitor => traverse(ast, visitor);

module.exports = visit;
