/* global jest, Promise */

const pathSep = require('path').sep;
const fs = jest.genMockFromModule('fs');

let mockFS = {};

fs.__setFS = tree => (mockFS = tree);

fs.lstat = (path, callback) =>
  getNodeInTree(mockFS)(path)
    .then(source => typeof source !== 'string')
    .catch(() => Promise.resolve(false))
    .then(isDir =>
      callback(null, {
        isDirectory: () => isDir,
      })
    );

const getNodeInTree = tree => path =>
  new Promise((resolve, reject) => {
    const [contents] = path
      .split(pathSep)
      .reduce(
        ([, /* contents */ cwd], pathPart) =>
          cwd
            ? cwd && cwd[pathPart]
              ? [cwd[pathPart], cwd[pathPart]]
              : [null, cwd[pathPart]]
            : reject(new Error(`ERROR: Trying to read non existing path "${path}" in mocked files`)),
        [null, tree]
      );

    return contents ? resolve(contents) : reject(new Error(`Can't read path "${path}" from mocked files`));
  });

fs.readFile = (path, encoding, callback) =>
  getNodeInTree(mockFS)(path)
    .then(source => callback(null, source))
    .catch(e => callback(e, null));

fs.readdir = (path, encoding, callback) =>
  path === '.'
    ? callback(null, Object.keys(mockFS))
    : getNodeInTree(mockFS)(path)
        .then(folder => callback(null, Object.keys(folder)))
        .catch(e => callback(e, null));

module.exports = fs;
