import fs from 'fs';
import path from 'path';

import camelCase from 'lodash.camelcase';
import * as builders from './index';

const cwd = path.resolve(__dirname, 'renderers');
const renderersFileNames = fs.readdirSync(cwd);
const fileToMethodName = f => camelCase(path.parse(f).name);

describe('Sections', () => {
  it('should be exported in renderers', () => {
    renderersFileNames.map(file => {
      try {
        const renderer = require(path.resolve(cwd, file));
        expect(typeof renderer[fileToMethodName(file)]).toBe('function');
      } catch (e) {
        throw new Error(`unable to import ${file} renderer! ERROR: ${e}`);
      }
    });
  });

  it('should have corresponding builder', () => {
    renderersFileNames
      .map(fileToMethodName)
      .map(methodName => expect(typeof builders[methodName]).toBe('function'));
  });
});
