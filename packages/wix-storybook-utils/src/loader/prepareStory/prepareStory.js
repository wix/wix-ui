const types = require('@babel/types');
const pathLib = require('path');
const visit = require('react-autodocs-utils/src/parser/visit');
const parse = require('react-autodocs-utils/src/parser/parse');
const print = require('react-autodocs-utils/src/parser/print');
const get = require('react-autodocs-utils/src/get');

const prepareStory = (storyConfig, sourcePath) => source =>
  new Promise((resolve, reject) => {
    const isError = !source && !storyConfig && !sourcePath
    return isError
    ? reject('ERROR: unable to prepare story, both `storyConfig` and `source` must be provided')
    : resolve(source)
  })

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
        ast.program.body.unshift(parse('const { storiesOf } = require("@storybook/react")'));
        ast.program.body.unshift(parse('const story = require("wix-storybook-utils/Story").default'));
      } else {
        // add imports
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

          if(storyConfig.playgroundComponentsPath) {
            const playgroundComponentsPath = pathLib.relative(sourcePath, storyConfig.playgroundComponentsPath);
            const playgroundComponentsProperty = types.objectProperty(types.identifier('playgroundComponents'), parse(`require('${playgroundComponentsPath}').default`));
            path.node.properties.push(playgroundComponentsProperty);
          }
      
          path.node.properties.push(storiesOfProperty);
       
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
