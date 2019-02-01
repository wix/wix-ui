/**
 * @fileoverview Fail if importing all of WSR
 * @author YairH
 */

const { matchesVersion, isVersionGreater } = require('../utils');

const LIB_NAME = 'wix-style-react';
const ERROR =
  "Wix-Style-React is imported in a way that does not support tree shaking. Use a direct import, for example: `import Button from 'wix-style-react/Button';` or update WSR to at least 5.9.0 version";
const MAX_VERSION = '5.8.1';

module.exports = {
  meta: {
    docs: {
      description: 'Fail if importing all of WSR',
      category: '',
      recommended: true
    },
    fixable: 'code',
    schema: []
  },

  create(context) {
    const shouldIgnoreNamedImports = isVersionGreater(LIB_NAME, MAX_VERSION);

    return {
      ImportDeclaration(node) {
        if (!shouldIgnoreNamedImports && isDestructuredImportStatement(node)) {
          context.report({
            node,
            message: ERROR,
            fix(fixer) {
              const specifiers = node.specifiers.map(specifier => specifier.imported.name);
              const imports = specifiers.map(specifier => composeImportStatement(specifier));
              return fixer.replaceText(node, imports.join('\n'));
            }
          });
        }
      },
      VariableDeclaration(node) {
        // iterate list since we can have more than one variable declared in a single declaration
        node.declarations.forEach(variableDeclarator => {
          if (isRequireWithPropertyAccess(variableDeclarator)) {
            context.report({
              node,
              message: ERROR,
              fix(fixer) {
                const importedLabel = variableDeclarator.id.name;
                const importedObject = variableDeclarator.init.property.name;
                const fixString = composeImportStatement(importedLabel, importedObject);
                return fixer.replaceText(node, fixString);
              }
            });
          } else if (isRequiringWSR(variableDeclarator)) {
            if (isDestructured(variableDeclarator)) {
              context.report({
                node,
                message: ERROR,
                fix(fixer) {
                  const specifiers = variableDeclarator.id.properties
                    .filter(
                      specifier =>
                        // can only fix when destructured object isnt aliased
                        specifier.value.name === specifier.key.name
                    )
                    .map(specifier => specifier.key.name);

                  if (specifiers.length !== variableDeclarator.id.properties.length) {
                    // do not fix if we have destructured aliased properties
                    // Example: const {Button: Button2} = require('wix-style-react');
                    return;
                  }

                  const imports = specifiers.map(specifier => composeImportStatement(specifier));
                  return fixer.replaceText(node, imports.join('\n'));
                }
              });
            } else if (isRequiringAllWSR(variableDeclarator)) {
              context.report({
                node,
                message: ERROR
              });
            }
          }
        });
      }
    };
  }
};

function composeImportStatement(importLabel, importObject = importLabel) {
  return `import ${importLabel} from '${LIB_NAME}/${importObject}';`;
}

// EXAMPLE: const WSR = require('wix-style-react');
function isRequiringAllWSR(variableDeclarator) {
  return variableDeclarator.id && variableDeclarator.id.type === 'Identifier';
}

// EXAMPLE: const {Button4, Button2} = require('wix-style-react');
function isDestructured(variableDeclarator) {
  return variableDeclarator.id && variableDeclarator.id.type === 'ObjectPattern';
}

// EXAMPLE: require('wix-style-react')
function isRequiringWSR(variableDeclarator) {
  return (
    variableDeclarator.init &&
    variableDeclarator.init.type === 'CallExpression' &&
    variableDeclarator.init.callee &&
    variableDeclarator.init.callee.name === 'require' &&
    variableDeclarator.init.arguments &&
    variableDeclarator.init.arguments.length &&
    variableDeclarator.init.arguments[0].value === LIB_NAME
  );
}

// EXAMPLE: const Button = require('wix-style-react').Button;
function isRequireWithPropertyAccess(variableDeclarator) {
  return (
    variableDeclarator.init &&
    variableDeclarator.init.type === 'MemberExpression' &&
    variableDeclarator.init.object &&
    variableDeclarator.init.object.callee &&
    variableDeclarator.init.object.callee.name === 'require' &&
    variableDeclarator.init.object.arguments &&
    variableDeclarator.init.object.arguments.length &&
    variableDeclarator.init.object.arguments[0].value === LIB_NAME
  );
}

// EXAMPLE: import { Button3, Frame, Panel } from 'wix-style-react';
function isDestructuredImportStatement(node) {
  return (
    node.source.value === LIB_NAME &&
    node.specifiers &&
    node.specifiers.length &&
    node.specifiers[0].type === 'ImportSpecifier'
  );
}
