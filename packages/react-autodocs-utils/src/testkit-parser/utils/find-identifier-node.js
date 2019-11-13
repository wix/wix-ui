const types = require('@babel/types');
const visit = require('../../parser/visit');
const followImport = require('./follow-import');

const findNodeOrImport = ({ ast, name }) => {
  return new Promise((resolve, reject) => {
    let found = false;
    visit(ast)({
      enter(path) {
        if (path.node.id && path.node.id.name === name) {
          path.stop();
          found = true;
          resolve({ node: path.node });
        } else if (types.isImportDeclaration(path.node)) {
          let isDefaultExport = false;
          let importedName = '';
          let isImportedIdentifier = path.node.specifiers.some(specifier => {
            const matchesName = specifier.local.name === name;
            if (matchesName) {
              isDefaultExport = types.isImportDefaultSpecifier(specifier);
              importedName = specifier.imported && specifier.imported.name;
              return true;
            }
          });
          if (isImportedIdentifier) {
            found = true;
            resolve({ isImport: true, isDefaultExport, importedName, sourcePath: path.node.source.value });
          }
        }
      },
    });

    if (!found) {
      reject(new ReferenceError(`Node with id ${name} not found`));
    }
  });
};

const findIdentifierNode = async ({ name, ast, cwd }) => {
  const { node, isImport, sourcePath, isDefaultExport, importedName } = await findNodeOrImport({ ast, name });
  if (isImport) {
    return followImport({
      sourcePath,
      cwd,
      exportName: isDefaultExport ? undefined : importedName || name,
    });
  }
  return node.init || node;
};

module.exports = findIdentifierNode;
