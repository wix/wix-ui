const readFile = require('../../read-file');
const parseDriver = require('./parse-driver');
const resolvePath = require('../../resolve-path');
const path = require('path');
const getExportedNode = data => {
  // Wrapper prevents circular dependency
  // 1) utils/follow-import.js > utils/get-exported-node.js
  // 2) utils/find-identifier-node.js > utils/follow-import.js > utils/get-exported-node.js > utils/reduce-to-object.js
  return require('./get-exported-node')(data);
};

const followImport = async ({ cwd = '', sourcePath, exportName }) => {
  const finalPath = await resolvePath(cwd, sourcePath);
  const { source } = await readFile(finalPath);
  const ast = parseDriver(source);
  const scopedCwd = path.dirname(finalPath);
  const exportedNode = await getExportedNode({ ast, exportName, cwd: scopedCwd });
  const scopedAst = exportedNode.ast || ast;
  return Object.assign(exportedNode, { ast: scopedAst, cwd: scopedCwd });
};

module.exports = followImport;
