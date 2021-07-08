/* global describe it expect jest */

const cista = require('cista');
const path = require('path');

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

  describe('given `recursive: true` setting', () => {
    it('should return list of files including nested files', () => {
      const fakeFs = cista({
        'file.extension': '',
        'file.js': '',
        'folder/file': '',
        'folder/deeper/file': '',
        'folder/deeper/deeper/file': '',
        'sibling/file': '',
      });

      const expectedFiles = [
        'file.extension',
        'file.js',
        'folder/deeper/deeper/file',
        'folder/deeper/file',
        'folder/file',
        'sibling/file',
      ];

      return expect(readFolder(fakeFs.dir, { recursive: true })).resolves.toEqual(expectedFiles);
    });
  });
});
