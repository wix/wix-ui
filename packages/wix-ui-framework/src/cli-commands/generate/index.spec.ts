import * as fs from 'fs';
import * as cista from 'cista';

import { generate } from '.';

describe('generate', () => {
  describe('when output option is undefined', () => {
    it('should save files to root directory of --template', async () => {
      const fakeFs = cista({
        'templates/src/index.js': '{%ComponentName%}',
        'package.json': '{}',
      });

      await generate({
        templates: `${fakeFs.dir}/templates`,
        ComponentName: 'Test',
        componentName: 'test',
        description: '',
        force: true,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(`${fakeFs.dir}/src/index.js`, 'utf8');
      expect(output).toEqual('Test');
    });
  });

  describe('when output option is defined', () => {
    it('should save files to that path', async () => {
      const fakeFs = cista({
        'templates/src/index.js': '{%ComponentName%}',
        'package.json': '{}',
      });

      await generate({
        templates: `${fakeFs.dir}/templates`,
        output: 'custom',
        ComponentName: 'Test',
        componentName: 'test',
        description: '',
        force: true,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/custom/src/index.js`,
        'utf8',
      );
      expect(output).toEqual('Test');
    });
  });

  describe('when codemods option is defined', () => {
    it('should run codemods of specified path', async () => {
      const fakeFs = cista({
        'templates/src/index.js': '{%ComponentName%}',
        'assert-file': 'hello world',
        'custom/codemods/codemods.js':
          'module.exports = [ { codemod: "../../codemods/deep/path/codemod.js", dist: "", description: "do the test codemod" } ]',
        'codemods/deep/path/codemod.js': 'fake codemod',
        'package.json': '{}',
        'node_modules/.bin/jscodeshift':
          '#!/usr/bin/env node\nconst fs = require("fs");\nfs.writeFileSync(__dirname + "/../../assert-file", "hello mars");',
      });

      // set permissions for fake jscodeshift so that we're able to execute and write to file
      fs.chmodSync(`${fakeFs.dir}/node_modules/.bin/jscodeshift`, 0o500); // read & execute
      fs.chmodSync(`${fakeFs.dir}/assert-file`, 0o600); // read & write

      await generate({
        templates: `${fakeFs.dir}/templates`,
        ComponentName: 'Test',
        componentName: 'test',
        codemods: 'custom/codemods/codemods.js',
        description: '',
        force: true,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(`${fakeFs.dir}/assert-file`, 'utf8');

      expect(output).toEqual('hello mars');
    });
  });
});
