import * as types from '@babel/types';
import * as parser from '@babel/parser';
import generator from '@babel/generator';
import traverse from '@babel/traverse';

const ensureShorthandProperties = ({ ast, parentPath, scope }) =>
  traverse(
    ast,
    {
      Property(path) {
        const { key, value } = path.node;
        if (key.test === value.test) {
          path.node.shorthand = true;
        }
      },
    },
    scope,
    parentPath,
  );

const functionToString = prop => {
  if (typeof prop !== 'function') {
    return prop;
  }

  const asString = prop.toString();
  let ast;

  try {
    ast = parser.parseExpression(asString);
  } catch (e) {
    return asString;
  }

  if (types.isArrowFunctionExpression(ast)) {
    return prop.toString();
  }

  const arrowFunctionBody =
    ast.body.body.length === 1 && types.isReturnStatement(ast.body.body[0])
      ? ast.body.body[0].argument
      : ast.body;

  ensureShorthandProperties({
    ast: arrowFunctionBody,
    parentPath: ast,
    scope: ast,
  });

  const arrowFuncExpr = types.arrowFunctionExpression(
    ast.params,
    arrowFunctionBody,
  );

  return generator(arrowFuncExpr, { tabWidth: 2 }).code;
};

export default functionToString;
