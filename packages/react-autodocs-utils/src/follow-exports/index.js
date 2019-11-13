/* global Promise */

const namedTypes = require('recast').types.namedTypes;

const parse = require('../parser/parse');
const visit = require('../parser/visit');
const readFile = require('../read-file');
const get = require('../get');
const resolvePath = require('../resolve-path');

/**
 * extractPath is used to take exported path from source
 */
// extractPath : (source: string, path: string) -> Promise<path>
const extractPath = source =>
  new Promise(resolve => {
    const ast = parse(source);

    const exportDeclarations = ast.program.body.filter(node =>
      ['ExportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration', 'ExportDefaultDeclaration'].some(
        checker => namedTypes[checker].check(node)
      )
    );

    if (exportDeclarations.length === 1) {
      const [node] = exportDeclarations;

      // node without source is not a simple export, we handle those elsewhere
      if (node.source) {
        resolve(node.source.value);
        return;
      }
    }

    visit(ast)({
      // export {default} from 'path';
      ExportNamedDeclaration(path) {
        const isSpecifierDefault = path.node.specifiers.some(({ exported }) => exported.name === 'default');

        if (isSpecifierDefault) {
          resolve(path.node.source.value);
          return false;
        }

        // export const Component = withStylable(Component)
        // export const Component = createHOC(Component)
        path.traverse({
          CallExpression(path) {
            const isWithHOC = ['withStylable', 'createHOC', 'withFocusable'].some(name =>
              path.get('callee').isIdentifier({ name })
            );

            if (isWithHOC) {
              const componentName = path.get('arguments')[0].node.name;

              visit(ast)({
                ImportDeclaration(path) {
                  const componentImportSpecifier = path.node.specifiers.find(
                    ({ local: { name } }) => name === componentName
                  );

                  if (componentImportSpecifier) {
                    resolve(path.node.source.value);
                    return false;
                  }
                },
              });
            }
          },
        });
      },

      // module.exports = require('path')
      AssignmentExpression(path) {
        const isDefaultExport = [
          path.get('left.object').isIdentifier({ name: 'module' }),
          path.get('left.property').isIdentifier({ name: 'exports' }),
          path.get('right.callee').isIdentifier({ name: 'require' }),
        ].every(i => i);

        if (isDefaultExport) {
          resolve(path.node.right.arguments[0].value);
        }
      },

      // export default withClasses(Component);
      ExportDefaultDeclaration(path) {
        const getter = get(path.node);

        // TODO: refactor multiple into generic HOC resolution
        const isWithClasses = [
          path.get('declaration').isCallExpression(),
          path.get('declaration.callee').isIdentifier({ name: 'withClasses' }),
        ].every(i => i);

        const componentName = isWithClasses ? getter('declaration.arguments.0.name') : getter('declaration.name');

        visit(ast)({
          ImportDeclaration(path) {
            const componentImport = path.node.specifiers.find(specifier => specifier.local.name === componentName);

            if (componentImport) {
              resolve(path.node.source.value);
            }
          },
        });
      },
    });

    // when unable to extract path, we assume that there's no more export and
    // current source is what we should parse for props
    resolve(null);
  });

// followExports (source: string, path: string) => Promise<{source: String, path: String}>
const followExports = (source, path = '') =>
  extractPath(source, path).then(extractedPath =>
    extractedPath
      ? resolvePath(path, extractedPath).then(resolvedPath =>
          readFile(resolvedPath)
            .then(({ source, path }) => followExports(source, path))
            .catch(e => console.log(`ERROR: unable to read ${resolvedPath}`, e))
        )
      : { source, path }
  );

module.exports = followExports;
