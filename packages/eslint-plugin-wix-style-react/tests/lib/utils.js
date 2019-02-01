const path = require('path');
const assert = require('assert');
const { detectVersion, isVersionGreater } = require('../../lib/utils');

describe('Version', () => {
  const base = path.resolve(__dirname, '..', 'fixtures', 'version');
  const pkgName = 'wix-style-react'; // 5.1.2;
  const uninstalledPkgName = 'some-uninstalled-package'; // null
  let cwd;

  beforeEach(() => {
    cwd = process.cwd();
    process.chdir(base);
  });

  afterEach(() => {
    process.chdir(cwd);
  });

  describe('detect', () => {
    it('matches wsr version', () => {
      assert.equal(detectVersion(pkgName), '5.1.2');
    });

    it('returns null for uninstalled version', () => {
      assert.equal(detectVersion(uninstalledPkgName), null);
    });
  });

  describe('is greater check', () => {
    it('works for lower version', () => {
      assert.equal(isVersionGreater(pkgName, '5.1.0'), true);
    });

    it('works for greater version', () => {
      assert.equal(isVersionGreater(pkgName, '7.0.0'), false);
    });

    it('works for same version', () => {
      assert.equal(isVersionGreater(pkgName, '5.1.2'), false);
    });

    it('works for uninstalled package', () => {
      assert.equal(isVersionGreater(uninstalledPkgName, '2.0.0'), false);
    });
  });
});
