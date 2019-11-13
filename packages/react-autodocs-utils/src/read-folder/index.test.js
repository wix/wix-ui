/* global describe it expect jest */

const cista = require('cista');

const readFolder = require('./');

describe('readFolder', () => {
  describe('given path to folder', () => {
    it('should resolve with array of filenames', () => {
      const fakeFs = cista({
        'folder-name/file.js': '',
        'folder-name/file2.js': '',
        'folder-name/folder/file.js': '',
      });

      return expect(readFolder(fakeFs.dir + '/folder-name')).resolves.toEqual(['file.js', 'file2.js', 'folder']);
    });
  });

  describe('given path to file', () => {
    it('should resolve with array of filename', () => {
      const fakeFs = cista({
        'folder/index.js': '',
        'folder/some-file': '',
        'folder/another_folder': '',
      });

      return expect(readFolder(fakeFs.dir + '/folder/index.js')).resolves.toEqual([
        'another_folder',
        'index.js',
        'some-file',
      ]);
    });
  });

  describe('given non existing path', () => {
    it('should reject promise', () => expect(readFolder('you-dont-exist')).rejects.toBeDefined());
  });
});
