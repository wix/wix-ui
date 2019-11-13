const types = require('@babel/types');
const resolveIdentifier = require('./find-identifier-node');

const visitors = {
  ArrowFunctionExpression: ({ node }) => node.body,
  FunctionDeclaration: ({ node }) => node.body,
  CallExpression: ({ node }) => node.callee,
  BlockStatement: ({ node }) => (Array.isArray(node.body) ? node.body.find(types.isReturnStatement) : node.body),
  ReturnStatement: ({ node }) => node.argument,
  Identifier: ({ node, ast, cwd }) => resolveIdentifier({ name: node.name, ast, cwd }),
};

const reduceToObject = async ({ ast, node, cwd }) => {
  if (types.isObjectExpression(node)) {
    return node;
  }
  const visitor = visitors[node.type];
  if (!visitor) {
    throw Error(`reduceToObject: not implemented for ${node.type}`);
  }

  return await reduceToObject({
    ast,
    node: await visitor({ node, ast, cwd }),
    cwd,
  });
};

module.exports = reduceToObject;
