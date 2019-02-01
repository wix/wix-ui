/**
 * @fileoverview Utility functions for wix-style-react version configuration.
 * @author Artem Yavorsky
 */

const resolve = require('resolve');
const semver = require('semver');

function detectVersion(packageName) {
  try {
    const pkgPath = resolve.sync(`${packageName}/package.json`, {basedir: process.cwd()});
    const pkg = require(pkgPath);
    return pkg.version;
  } catch (e) {
    return null;
  }
}

function isVersionGreater(packageName, version) {
  const currentVersion = detectVersion(packageName);
  if (!currentVersion) return false;
  return semver.gt(currentVersion, version);
};

module.exports = {
  detectVersion,
  isVersionGreater,
};
