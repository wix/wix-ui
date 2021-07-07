/* global Promise */

const { readdir } = require('fs').promises;
const path = require('path');
const dirname = require('../dirname');

const defaultOptions = {
  recursive: false,
};

const readFolder = (rootPath, options = defaultOptions) => {
  const dirnameOfRoot = dirname(rootPath);
  const recursion = async (folderPath) => {
    const pathToRead = path.join(dirnameOfRoot, folderPath);
    const entries = await readdir(pathToRead, { encoding: 'utf8', withFileTypes: true });

    if (options.recursive) {
      const files = await Promise.all(
        entries.map((entry) => {
          const resolvedPath = path.join(folderPath, entry.name);
          return entry.isDirectory() ? recursion(resolvedPath, { ...options, recursive: true }) : resolvedPath;
        })
      );
      return files.flat();
    }

    return entries.map((entry) => entry.name);
  };

  return recursion('.');
};

module.exports = readFolder;
