const types = require('@babel/types');
const visit = require('../../parser/visit');

const mergeDriversToSpread = sourceCode => {
  const regexMergeDrivers = /mergeDrivers\(([^,\\)\s]+),\s*([^,\\)\s]+)\s*\)/g;
  return sourceCode.replace(regexMergeDrivers, '{...$1, ...$2}');
};

const optimizeSource = sourceCode => mergeDriversToSpread(sourceCode);

const isObjectAssign = node =>
  types.isMemberExpression(node) && node.object.name === 'Object' && node.property.name === 'assign';

const replaceObjectAssignWithSpread = ast => {
  visit(ast)({
    CallExpression(path) {
      if (isObjectAssign(path.node.callee)) {
        path.replaceWith(types.objectExpression(path.node.arguments.map(arg => types.spreadElement(arg))));
      }
    },
  });
  return ast;
};

const optimizeAST = ast => replaceObjectAssignWithSpread(ast);

module.exports = {
  optimizeSource,
  optimizeAST,
};
