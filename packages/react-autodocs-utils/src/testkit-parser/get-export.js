const getNodeDescriptor = require('./get-object-descriptor');
const parseDriver = require('./utils/parse-driver');
const getExportedNode = require('./utils/get-exported-node');

module.exports = async (code, exportName, cwd) => {
  const ast = parseDriver(code);
  const node = await getExportedNode({ ast, exportName, cwd });
  return getNodeDescriptor({ node, ast: node.ast || ast, cwd });
};
