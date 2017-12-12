import {utils} from 'react-docgen';

const {
  isExportsOrModuleAssignment,
  isReactComponentClass,
  isReactCreateClassCall,
  isStatelessComponent,
  normalizeClassDefinition,
  resolveExportDeclaration,
  resolveToValue
} = utils;

const ERROR_MULTIPLE_DEFINITIONS =
  'Multiple exported component definitions found.';

const isReactComponentExtendedClass = (path, types) => {
  const node = path.node;

  if (!types.ClassDeclaration.check(node) && !types.ClassExpression.check(node)) {
    return false;
  }

  if (!node.superClass) {
    return false;
  }

  console.warn(`<AutoDocs/> Warning: ${node.id.name} extends ${node.superClass.name} instead of React.Component. Auto generated documentation may be incomplete!`);
  return true;
};

const isComponentDefinition = (path, types) =>
  isReactCreateClassCall(path) ||
  isReactComponentClass(path) ||
  isReactComponentExtendedClass(path, types) ||
  isStatelessComponent(path);

const resolveHOC = (path, types) => {
  const node = path.node;

  if (types.CallExpression.check(node) && !isReactCreateClassCall(path)) {
    if (node.arguments.length) {
      return resolveHOC(path.get('arguments', node.arguments.length - 1));
    }
  }

  return path;
};

const resolveDefinition = (definition, types) => {
  if (isReactCreateClassCall(definition)) {
    // return argument
    const resolvedPath = resolveToValue(definition.get('arguments', 0));
    if (types.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath;
    }
  } else if (isReactComponentClass(definition) || isReactComponentExtendedClass(definition, types)) {
    normalizeClassDefinition(definition);
    return definition;
  } else if (isStatelessComponent(definition)) {
    return definition;
  }

  return null;
};

export default (ast, recast) => {
  const types = recast.types.namedTypes;
  let definition;

  const exportDeclaration = path => {
    const definitions = resolveExportDeclaration(path, types)
      .reduce((acc, definition) => {
        if (isComponentDefinition(definition, types)) {
          acc.push(definition);
        } else {
          const resolved = resolveToValue(resolveHOC(definition, types));
          if (isComponentDefinition(resolved, types)) {
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

    definition = resolveDefinition(definitions[0], types);
    return false;
  };

  const ignore = () => false;

  recast.visit(ast, {
    visitFunctionDeclaration: ignore,
    visitFunctionExpression: ignore,
    visitClassDeclaration: ignore,
    visitClassExpression: ignore,
    visitIfStatement: ignore,
    visitWithStatement: ignore,
    visitSwitchStatement: ignore,
    visitCatchCause: ignore,
    visitWhileStatement: ignore,
    visitDoWhileStatement: ignore,
    visitForStatement: ignore,
    visitForInStatement: ignore,

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

      definition = resolveDefinition(path, types);

      return false;
    }
  });

  return definition;
};
