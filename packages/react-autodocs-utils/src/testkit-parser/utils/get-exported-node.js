const visit = require('../../parser/visit');
const reduceToObject = require('./reduce-to-object');
const followImport = require('./follow-import');

const DEFAULT_EXPORT = 'default';

const byName = name => ({ node }) => node.name === name;

const byPattern = regex => ({ node }) => regex.test(node.name);

const findNamedExportDeclaration = (nodes, predicate) => {
  const exportedNode = nodes.find(predicate);
  if (exportedNode) {
    return exportedNode.init || exportedNode;
  }
};

const getFirstExportIfOnlyOneExists = nodes => nodes.length === 1 && nodes[0];

const isCommonJsExport = node =>
  node.type === 'MemberExpression' && node.object.name === 'module' && node.property.name === 'exports';

const isCommonJsImport = node => node.type === 'CallExpression' && node.callee.name === 'require';

module.exports = async ({ ast, exportName = DEFAULT_EXPORT, cwd }) => {
  let exportedNode;
  let exportDefaultNode;
  let exportNamedNodes = [];

  visit(ast)({
    ExportDefaultDeclaration(path) {
      exportDefaultNode = path.node.declaration;
    },

    ExportNamedDeclaration(path) {
      const isSpecifierDefault = path.node.specifiers.some(({ exported }) => exported.name === 'default');
      if (isSpecifierDefault) {
        exportDefaultNode = {
          source: path.node.source.value,
          local: { name: exportName },
        };
      } else {
        const exportSource = path.node.source && path.node.source.value;
        path.traverse({
          VariableDeclarator(path) {
            exportNamedNodes.push({ node: path.node.id });
          },
          ExportSpecifier(path) {
            exportNamedNodes.push({
              node: exportSource ? path.node.exported : path.node.local,
              local: path.node.local,
              source: exportSource,
            });
          },
        });
      }
    },

    AssignmentExpression({ node }) {
      if (isCommonJsExport(node.left) && isCommonJsImport(node.right)) {
        const source = node.right.arguments[0].value;
        exportNamedNodes.push({
          source,
          local: { name: exportName },
          node: { name: exportName },
        });
      }
    },
  });

  if (exportName === DEFAULT_EXPORT) {
    exportedNode =
      exportDefaultNode ||
      findNamedExportDeclaration(exportNamedNodes, byPattern(/DriverFactory$/i)) ||
      getFirstExportIfOnlyOneExists(exportNamedNodes);
  } else {
    exportedNode = findNamedExportDeclaration(exportNamedNodes, byName(exportName));
  }

  if (exportedNode.source) {
    exportedNode = await followImport({ cwd, sourcePath: exportedNode.source, exportName: exportedNode.local.name });
  } else if (exportedNode.node) {
    exportedNode = exportedNode.node;
  }

  if (!exportedNode) {
    throw Error(`export "${exportName}" not found`);
  }

  return await reduceToObject({ node: exportedNode, ast: exportedNode.ast || ast, cwd });
};
