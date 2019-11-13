/* global describe it expect jest */

const cista = require('cista');

const readFile = require('./');

describe('readFile', () => {
  describe('given existing path', () => {
    it('should resolve with file content', () => {
      const content = 'hello file content';
      const fakeFs = cista({
        'test.file': content,
      });

      return expect(readFile(fakeFs.dir + '/test.file')).resolves.toEqual({
        source: content,
        path: fakeFs.dir + '/test.file',
        isTypescript: false,
      });
    });

    it('should resolve with correct isTypescript flag', () => {
      const jsFiles = ['index.js', 'index.jsx'];
      const tsFiles = ['index.ts', 'index.tsx', 'index.d.ts'];
      const allFiles = [...jsFiles, ...tsFiles];

      const fakeFs = cista(allFiles.reduce((acc, path) => ({ ...acc, [path]: ' ' }), {}));

      const expectFlag = isTypescript => files => files.map(() => expect.objectContaining({ isTypescript }));

      return expect(Promise.all(allFiles.map(files => readFile(fakeFs.dir + '/' + files)))).resolves.toEqual([
        ...expectFlag(false)(jsFiles),
        ...expectFlag(true)(tsFiles),
      ]);
    });
  });

  describe('given non existing path', () => {
    it('should reject with error', () => expect(readFile('you-dont-exist')).rejects.toBeDefined());
  });

  describe('given dotted suffix without extension', () => {
    it('should resolve with file content', () => {
      const content = 'hello file content';
      const fakeFs = cista({
        'test.file.js': content,
      });

      return expect(readFile(fakeFs.dir + '/test.file')).resolves.toEqual({
        source: content,
        path: fakeFs.dir + '/test.file.js',
        isTypescript: false,
      });
    });
  });
});
