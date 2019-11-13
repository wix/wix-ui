const recast = require('recast');
const { utils } = require('react-docgen');

const {
  isExportsOrModuleAssignment,
  isReactComponentClass,
  isReactCreateClassCall,
  isStatelessComponent,
  normalizeClassDefinition,
  resolveExportDeclaration,
  resolveToValue,
} = utils;

const n = recast.types.namedTypes;

const ERROR_MULTIPLE_DEFINITIONS = 'Multiple exported component definitions found.';

const isReactComponentExtendedClass = path => {
  const node = path.node;

  if (!n.ClassDeclaration.check(node) && !n.ClassExpression.check(node)) {
    return false;
  }

  if (!node.superClass) {
    return false;
  }

  return true;
};

const isAnnotatedComponent = path => {
  const leadingComments = path.node.leadingComments;
  if (!leadingComments) {
    return false;
  }

  // Search for the @autodocs-component in identifier comment
  return leadingComments.some(comment => comment.value.includes('@autodocs-component'));
};

const isComponentDefinition = path =>
  [
    isReactCreateClassCall,
    isReactComponentClass,
    isReactComponentExtendedClass,
    isStatelessComponent,
    isAnnotatedComponent,
  ].some(fn => fn(path));

const resolveHOC = path => {
  const node = path.node;

  if (n.CallExpression.check(node) && !isReactCreateClassCall(path)) {
    if (node.arguments.length) {
      return resolveHOC(path.get('arguments', node.arguments.length - 1));
    }
  }

  return path;
};

const resolveDefinition = definition => {
  if (isReactCreateClassCall(definition)) {
    // return argument
    const resolvedPath = resolveToValue(definition.get('arguments', 0));
    if (n.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath;
    }
  } else if (isReactComponentClass(definition) || isReactComponentExtendedClass(definition)) {
    normalizeClassDefinition(definition);
    return definition;
  } else if (isStatelessComponent(definition)) {
    return definition;
  } else if (isAnnotatedComponent) {
    return definition;
  }

  return null;
};

const componentResolver = (ast, recast) => {
  let definition;

  const exportDeclaration = path => {
    const definitions = resolveExportDeclaration(path).reduce((acc, definition) => {
      if (isComponentDefinition(definition)) {
        acc.push(definition);
      } else {
        const resolved = resolveToValue(resolveHOC(definition));
        if (isComponentDefinition(resolved)) {
          acc.push(resolved);
        }
      }

      return acc;
    }, []);

    if (definitions.length === 0) {
      return false;
    }

    if (definitions.length > 1 || definition) {
      // If a file exports multiple components, ... complain!
      throw new Error(ERROR_MULTIPLE_DEFINITIONS);
    }

    definition = resolveDefinition(definitions[0]);
    return false;
  };

  recast.visit(ast, {
    visitExportDeclaration: exportDeclaration,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,

    visitAssignmentExpression: path => {
      // Ignore anything that is not `exports.X = ...;` or
      // `module.exports = ...;`
      if (!isExportsOrModuleAssignment(path)) {
        return false;
      }

      // Resolve the value of the right hand side. It should resolve to a call
      // expression, something like React.createClass
      path = resolveToValue(path.get('right'));

      if (!isComponentDefinition(path)) {
        path = resolveToValue(resolveHOC(path));
        if (!isComponentDefinition(path)) {
          return false;
        }
      }

      if (definition) {
        // If a file exports multiple components, ... complain!
        throw new Error(ERROR_MULTIPLE_DEFINITIONS);
      }

      definition = resolveDefinition(path);

      return false;
    },
  });

  return definition;
};

module.exports = componentResolver;
