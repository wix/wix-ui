const types = require('@babel/types');
const findIdentifierNode = require('./find-identifier-node');

const visitors = {
  ArrowFunctionExpression: ({ node }) => node.body,
  FunctionDeclaration: ({ node }) => node.body,
  Identifier: ({ node, ast, cwd }) => findIdentifierNode({ name: node.name, ast, cwd }),
  BlockStatement: ({ node }) => node.body.find(types.isReturnStatement),
  CallExpression: ({ node }) => node.callee,
};

const getReturnValue = async ({ node, ast, cwd }) => {
  if (types.isArrowFunctionExpression(node) && !Array.isArray(node.body)) {
    return node.body;
  }

  if (types.isReturnStatement(node.type)) {
    return node.argument;
  }

  const visitor = visitors[node.type];
  if (!visitor) {
    return node;
  }

  return await getReturnValue({
    ast,
    node: await visitor({ node, ast, cwd }),
    cwd,
  });
};

module.exports = getReturnValue;
