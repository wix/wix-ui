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
});
