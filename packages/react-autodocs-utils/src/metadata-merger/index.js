/* global Promise */

const recast = require('recast');
const types = require('@babel/types');

const get = require('../get');
const parse = require('../parser/parse');
const visit = require('../parser/visit');
const print = require('../parser/print');
const builders = recast.types.builders;

const metadataMerger = source => metadata =>
  new Promise((resolve, reject) =>
    source && metadata
      ? resolve(parse(source))
      : reject('ERROR: unable to merge `metadata` into exported story config, ensure `source` & `metadata` are defined')
  ).then(ast => {
    metadata = Object.keys(metadata).length ? metadata : { props: {} };
    const metadataAST = parse(`(${JSON.stringify(metadata)})`);

    let metadataProperties;

    visit(metadataAST)({
      ObjectExpression(path) {
        metadataProperties = path.node.properties;
        path.skip();
      },
    });

    if (!metadataProperties) {
      return Promise.reject('ERROR: Unable to merge metadata with source');
    }

    const handleExportObject = (path, node) => {
      const { configNode } = [
        {
          pattern: types.isObjectExpression(node),
          configNode: node,
        },
        {
          pattern: types.isIdentifier(node),
          configNode: get(path)(`scope.bindings.${node.name}.path.node.init`),
        },
      ].find(({ pattern }) => pattern);

      if (configNode) {
        configNode.properties.push(
          builders.objectProperty(builders.identifier('_metadata'), builders.objectExpression(metadataProperties))
        );
      }
    };

    visit(ast)({
      ExportDefaultDeclaration(path) {
        handleExportObject(path, path.node.declaration);
      },

      ExpressionStatement(path) {
        const isModuleExports = [
          types.isMemberExpression(path.node.expression.left),
          get(path)('node.expression.left.object.name') === 'module',
          get(path)('node.expression.left.property.name') === 'exports',
        ].every(Boolean);

        if (isModuleExports) {
          handleExportObject(path, path.node.expression.right);
        }
      },
    });

    return print(ast);
  });

module.exports = metadataMerger;
