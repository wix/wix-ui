const types = require('@babel/types');

const findIdentifierNode = require('./utils/find-identifier-node');
const getComments = require('./get-comments');
const flatten = require('./utils/flatten');
const getReturnValue = require('./utils/get-return-value');
const reduceToObject = require('./utils/reduce-to-object');

const getArgument = param => {
  if (types.isObjectPattern(param)) {
    const keys = param.properties.map(({ key: { name } }) => name);
    return { name: `{${keys.join(', ')}}` };
  }

  if (types.isIdentifier(param)) {
    return { name: param.name };
  }

  if (types.isAssignmentPattern(param)) {
    return { name: param.left.name };
  }

  if (types.isRestElement(param)) {
    return { name: `...${param.argument.name}` };
  }

  throw `not supported: getArgument ${param.type}`;
};

const isFunction = node =>
  [types.isArrowFunctionExpression, types.isFunctionDeclaration, types.isFunctionExpression, types.isObjectMethod].some(
    checker => checker(node)
  );

const isValue = node => [types.isBooleanLiteral, types.isNumericLiteral].some(checker => checker(node));

const getObjectProperties = async ({ node, ast, cwd }) => {
  const properties = await Promise.all(
    node.properties.map(async property => {
      if (property.type === 'SpreadElement') {
        const object = await reduceToObject({
          ast: node.ast || ast,
          cwd: node.cwd || cwd,
          node: property.argument,
        });

        return object.properties;
      }

      return property;
    })
  );

  return flatten(properties);
};

const getMemberProperty = async ({ node, ast, cwd }) => {
  const object = await reduceToObject({ node: node.object, ast, cwd });
  const properties = await getObjectProperties({ node: object, ast, cwd });
  const property = properties.find(property => property.key.name === node.property.name);
  return property.value;
};

const createDescriptor = async ({ node, ast, cwd }) => {
  switch (true) {
    case isFunction(node):
      return {
        args: node.params.map(getArgument),
        type: 'function',
      };

    case types.isIdentifier(node):
      try {
        return createDescriptor({
          node: await findIdentifierNode({ name: node.name, ast, cwd }),
          ast,
          cwd,
        });
      } catch (e) {
        if (e instanceof ReferenceError) {
          // identifier is not declared - probably a function argument
          return {
            type: 'unknown',
          };
        }

        throw e;
      }

    case types.isObjectExpression(node):
      return {
        type: 'object',
        props: await getObjectDescriptor({ node, ast, cwd }),
      };

    case isValue(node):
      return { type: 'value' };

    case types.isCallExpression(node):
      return createDescriptor({
        node: await getReturnValue({ node: node.callee, ast, cwd }),
        ast,
        cwd,
      });

    case types.isMemberExpression(node):
      return createDescriptor({
        node: await getMemberProperty({ node: node, ast, cwd }),
        ast,
        cwd,
      });

    case types.isLogicalExpression(node):
      return await createDescriptor({ node: node.right, ast, cwd });
  }

  throw `Cannot resolve arguments for ${node.type}`;
};

const getPropertyDescriptor = async ({ node, ast, cwd }) => {
  const valueNode = types.isObjectMethod(node) ? node : node.value;
  const descriptor = await createDescriptor({ node: valueNode, ast, cwd });
  const comments = getComments(node);
  const name = node.key.name;

  return { name, ...descriptor, ...comments };
};

const getSpreadDescriptor = async ({ node, ast, cwd }) => {
  if (types.isObjectExpression(node)) {
    return getObjectDescriptor({ node: node, ast, cwd });
  }

  switch (true) {
    case types.isIdentifier(node):
      try {
        return await getObjectDescriptor({
          node: await reduceToObject({ node, ast, cwd }),
          ast,
          cwd,
        });
      } catch (e) {
        return {
          name: node.name,
          type: 'error',
        };
      }

    case types.isCallExpression(node):
      return getObjectDescriptor({
        node: await reduceToObject({ node: node, ast, cwd }),
        ast,
        cwd,
      });

    case types.isMemberExpression(node):
      const propertyDescriptor = await createDescriptor({
        node: await getMemberProperty({ node: node, ast, cwd }),
        ast,
        cwd,
      });

      return propertyDescriptor.props;

    default:
      throw Error(`Unsupported spread for type ${node.type}`);
  }
};

const getObjectDescriptor = async ({ node, ast, cwd }) => {
  const scopedAst = node.ast || ast;
  const scopedCwd = node.cwd || cwd;
  const methodPromises = node.properties.map(node =>
    types.isSpreadElement(node)
      ? getSpreadDescriptor({ node: node.argument, ast: scopedAst, cwd: scopedCwd })
      : getPropertyDescriptor({ node: node, ast: scopedAst, cwd: scopedCwd })
  );

  return flatten(await Promise.all(methodPromises));
};

module.exports = getObjectDescriptor;
