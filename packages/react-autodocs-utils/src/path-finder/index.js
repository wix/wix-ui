/* global Promise */

const types = require('@babel/types');

const parse = require('../parser/parse');
const visit = require('../parser/visit');
const get = require('../get');

const extractKeyFromObject = objectExpression => key =>
  objectExpression.properties.find(({ key: { name } }) => name === key);

const pathFinder = (source = '') => {
  const ast = parse(source);

  return new Promise((resolve, reject) => {
    const extractComponentPath = (path, node) => {
      if (types.isObjectExpression(node)) {
        const getValue = key => extractKeyFromObject(node)(key);
        const componentPath = getValue('componentPath');

        if (componentPath) {
          return resolve(componentPath.value.value);
        } else {
          const componentReference = get(getValue('component'))('value.name');

          if (!componentReference) {
            return resolve(null);
          }

          visit(ast)({
            ImportDeclaration(path) {
              const componentPath = get(path)('node.specifiers').find(
                ({ local: { name } }) => name === componentReference
              );

              if (componentPath) {
                resolve(get(path)('node.source.value'));
                return false;
              }
            },
          });

          resolve(componentReference);
        }
      }

      if (types.isIdentifier(node)) {
        const binding = path.scope.bindings[node.name];

        if (binding) {
          visit(ast)({
            VariableDeclarator(path) {
              if (types.isIdentifier(binding.identifier, { name: binding.identifier.name })) {
                const componentPath = extractKeyFromObject(path.node.init)('componentPath').value.value;
                resolve(componentPath);
              }
            },
          });
        }
      }
    };

    visit(ast)({
      ExportDefaultDeclaration(path) {
        extractComponentPath(path, path.node.declaration);
      },

      ExpressionStatement(path) {
        const isModuleExports = [
          types.isMemberExpression(path.node.expression.left),
          get(path)('node.expression.left.object.name') === 'module',
          get(path)('node.expression.left.property.name') === 'exports',
        ].every(Boolean);

        if (isModuleExports) {
          extractComponentPath(path, path.node.expression.right);
        }
      },
    });

    reject(new Error('ERROR: Unable to resolve path to component'));
  });
};

module.exports = pathFinder;
