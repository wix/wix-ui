const path = require('path');
const dirname = require('../dirname');
const resolveNodeModulesPath = require('../resolve-node-modules');

/**
 * resolvePath is used to resolve relative and/or real path to
 * node_modules
 */
// resolvePath : (cwd: string, relativePath: string) -> Promise<path: string>
const resolvePath = (cwd, relativePath) => {
  const desiredPath = relativePath.replace(/(dist\/|standalone\/)/g, '');

  return relativePath.startsWith('.')
    ? Promise.resolve(path.join(dirname(cwd), desiredPath))
    : resolveNodeModulesPath(cwd, desiredPath);
};

module.exports = resolvePath;
