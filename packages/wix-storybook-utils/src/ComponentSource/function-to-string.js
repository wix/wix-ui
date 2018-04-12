import recast from 'recast';

const builders = recast.types.builders;
const namedTypes = recast.types.namedTypes;

const ensureShorthandProperties = ast =>
  recast.visit(ast, {
    visitProperty(path) {
      const {key, value} = path.node;
      if (key.test === value.test) {
        path.node.shorthand = true;
      }
      this.traverse(path);
    }
  });

const functionToString = prop => {
  if (typeof prop !== 'function') {
    return prop;
  }

  const ast = recast.parse('(' + prop.toString() + ')');
  const program = ast.program.body[0];

  if (namedTypes.ArrowFunctionExpression.check(program.expression)) {
    return prop;
  }

  const {params, body} = program.expression;

  const arrowFuncExpr = builders.arrowFunctionExpression(
    params,
    ensureShorthandProperties(
      body.body.length === 1 && namedTypes.ReturnStatement.check(body.body[0]) ?
        body.body[0].argument :
        body
    )
  );

  const result = recast.prettyPrint(arrowFuncExpr, {tabWidth: 2}).code;

  return result.replace(/;$/, '');
};

export default functionToString;
