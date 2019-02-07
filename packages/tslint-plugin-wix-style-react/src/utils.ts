/**
 * @fileoverview Utility functions for wix-style-react version configuration.
 * @author Artem Yavorsky
 */

import * as resolve from 'resolve';
import * as semver from 'semver';

export function detectVersion(packageName: string): string {
  try {
    const pkgPath = resolve.sync(`${packageName}/package.json`, {basedir: process.cwd()});
    const pkg = require(pkgPath);
    return pkg.version;
  } catch (e) {
    return null;
  }
}

export function isVersionGreater(packageName: string, version: string | semver.SemVer) {
  const currentVersion = detectVersion(packageName);
  if (!currentVersion) return false;
  return semver.gt(currentVersion, version);
};
