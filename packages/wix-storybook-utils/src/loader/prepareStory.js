const types = require('@babel/types');
const path = require('path');
const visit = require('react-autodocs-utils/src/parser/visit');
const parse = require('react-autodocs-utils/src/parser/parse');
const print = require('react-autodocs-utils/src/parser/print');
const get = require('react-autodocs-utils/src/get');

const prepareStory = (storyConfig, sourcePath) => source =>
  new Promise((resolve, reject) =>
    source && !!storyConfig
      ? resolve(source)
      : reject('ERROR: unable to prepare story, both `storyConfig` and `source` must be provided')
  )

    .then(parse)

    .then(ast => {
      let isES5 = true;

      visit(ast)({
        ExportDefaultDeclaration() {
          isES5 = false;
          return false;
        },
      });

      if (isES5) {
        // add requires
        if(storyConfig.playgroundComponentsPath) {
          const playgroundComponentsPath = path.relative(sourcePath, storyConfig.playgroundComponentsPath);
          storyConfig.playgroundast.program.body.unshift(parse(`const playgroundComponents = require("${playgroundComponentsPath}")`));
        }
        ast.program.body.unshift(parse('const { storiesOf } = require("@storybook/react")'));
        ast.program.body.unshift(parse('const story = require("wix-storybook-utils/Story").default'));
      } else {
        // add imports
        if(storyConfig.playgroundComponentsPath) {
          const playgroundComponentsPath = path.relative(sourcePath, storyConfig.playgroundComponentsPath);
          ast.program.body.unshift(parse(`import playgroundComponents from "${playgroundComponentsPath}"`));
        }
        ast.program.body.unshift(parse('import { storiesOf } from "@storybook/react"'));
        ast.program.body.unshift(parse('import story from "wix-storybook-utils/Story"'));
      }

      return ast;
    })
    .then(ast => {
      // TODO: this is not too good, unfortunatelly, i cant return
      // rejected promise from within visitor, babylon complains
      let error = null;

      const configAST = parse(`(${JSON.stringify(storyConfig)})`);
      let configProperties;

      visit(configAST)({
        ObjectExpression(path) {
          const storiesOfProperty = types.objectProperty(types.identifier('storiesOf'), types.identifier('storiesOf'));
          const playgroundComponentsProperty = types.objectProperty(types.identifier('playgroundComponents'), types.identifier('playgroundComponents'));

          path.node.properties.push(storiesOfProperty);
          storyConfig.playgroundComponentsPath && path.node.properties.push(playgroundComponentsProperty);

          configProperties = path.node.properties;
          path.stop();
        },
      });

      const handleExportObject = (path, node) => {
        const exportsObject = types.isObjectExpression(node);
        const exportsIdentifier = types.isIdentifier(node);

        if (exportsIdentifier) {
          const referenceName = node.name;
          const configObject = path.scope.bindings[referenceName].path.node.init;

          if (!configObject.properties) {
            error = `ERROR: storybook config must export an object, exporting ${configObject.type} instead`;
            return false;
          }

          configObject.properties.push(
            types.objectProperty(types.identifier('_config'), types.objectExpression(configProperties))
          );

          return types.callExpression(types.identifier('story'), [node]);
        }

        if (exportsObject) {
          node.properties.push(
            types.objectProperty(types.identifier('_config'), types.objectExpression(configProperties))
          );

          // wrap exported object with `story()`
          return types.callExpression(types.identifier('story'), [node]);
        }
      };

      visit(ast)({
        ExportDefaultDeclaration(path) {
          path.node.declaration = handleExportObject(path, path.node.declaration);
          return false;
        },

        ExpressionStatement(path) {
          const isModuleExports = [
            types.isMemberExpression(path.node.expression.left),
            get(path)('node.expression.left.object.name') === 'module',
            get(path)('node.expression.left.property.name') === 'exports',
          ].every(Boolean);

          if (isModuleExports) {
            path.node.expression.right = handleExportObject(path, path.node.expression.right);
          }
        },
      });

      return error ? Promise.reject(error) : ast;
    })

    .then(print);

module.exports = prepareStory;