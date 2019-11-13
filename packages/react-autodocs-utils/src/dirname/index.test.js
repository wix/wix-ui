/* global describe it expect */

const dirname = require('./');

describe('dirname', () => {
  const pathsAndDirnames = [
    ['', ''],
    ['folder', 'folder'],
    ['folder/index.js', 'folder'],
    ['folder/deeper', 'folder/deeper'],
    ['folder/deeper', 'folder/deeper'],
  ];
  pathsAndDirnames.map(([path, expectedDirname]) =>
    it(`should return '${expectedDirname}' when given '${path}'`, () => expect(dirname(path)).toBe(expectedDirname))
  );
});
