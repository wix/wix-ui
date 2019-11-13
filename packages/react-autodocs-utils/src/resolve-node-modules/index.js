/* global Promise */

const readFolder = require('../read-folder');
const path = require('path');

const resolveNodeModulesPath = (cwd, modulePath) => {
  const checkPath = path.dirname(cwd);

  return readFolder(path.join(checkPath, 'node_modules'))
    .then(nodeModulesFiles => {
      const candidate = nodeModulesFiles.find(f => modulePath.match(f));

      return candidate
        ? path.join(checkPath, 'node_modules', modulePath)
        : checkPath !== '.'
        ? resolveNodeModulesPath(checkPath, modulePath)
        : Promise.reject(`ERROR: Unable to resolve node_modules path in "${modulePath}"`);
    })

    .catch(e =>
      checkPath !== '.'
        ? resolveNodeModulesPath(checkPath, modulePath)
        : Promise.reject(`ERROR: Unable to resolve node_modules path in "${modulePath}, ${e}"`)
    );
};

module.exports = resolveNodeModulesPath;
