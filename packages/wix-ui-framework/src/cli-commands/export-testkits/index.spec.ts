import * as fs from 'fs';
import * as path from 'path';
import * as cista from 'cista';

import { exportTestkits, warningBanner } from '.';

describe('exportTestkits', () => {
  describe('when .wuf/testkits/definitions.js is not found', () => {
    it('should reject with error', () => {
      const fakeFs = cista({
        output: '',
      });
      return expect(
        exportTestkits({
          output: fakeFs.output,
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrowError('missing --output parameter, it must be defined');
    });
  });

  describe('when output option is not found', () => {
    it('should reject with error', () => {
      const fakeFs = cista({
        output: '',
      });
      return expect(
        exportTestkits({
          output: fakeFs.output,
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow();
    });
  });

  describe('given definitions option', () => {
    it('should reject with error when file not found', () => {
      const fakeFs = cista({
        '.wuf/testkit/definitions.js': ';',
      });

      return expect(
        exportTestkits({
          definitions: 'non/existing/path/to/definitions.js',
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow();
    });
  });

  describe('given template option', () => {
    it('should reject with error when file not found', () => {
      const fakeFs = cista({
        '.wuf/testkits/template.js': ';',
        '.wuf/testkits/definitions.js': ';',
        '.wuf/components.json': '{}',
      });

      return expect(
        exportTestkits({
          template: 'non/existing/path/to/template.js',
          output: 'anywhere',
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow(
        `Template file not found at "${fakeFs.dir}/non/existing/path/to/template.js". It is required for \`wuf export-testkits\`.`,
      );
    });
  });

  describe('given components option', () => {
    it('should reject with error when file not found', () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': ';',
        '.wuf/output': '',
      });

      return expect(
        exportTestkits({
          components: 'non/existing/path/to/components.json',
          output: `${fakeFs.dir}/output`,
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow(
        `Components file not found at "${fakeFs.dir}/non/existing/path/to/components.json". It is required for \`wuf export-testkits\`. Create one with \`wuf update\`.`,
      );
    });

    it('should resolve and write output correctly when file is found', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': ';',
        '.wuf/testkits/template.js': ';',
        '.wuf/testkits/output.js': ';',
        '.wuf/awesome-components.json': '{ "Thingy": {} }',
      });

      await exportTestkits({
        components: '.wuf/awesome-components.json',
        output: `.wuf/testkits/output.js`,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, '.wuf', 'testkits', 'output.js'),
        'utf8',
      );

      expect(output).toMatch(
        /.*export const thingyTestkitFactory = testkitFactoryCreator\(load\(require\('..\/src\/Thingy\/Thingy.driver'\)\)\)\.*/,
      );
    });

    it('should resolve and write output correctly with given exportSuffix', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': ';',
        '.wuf/testkits/template.js': ';',
        '.wuf/testkits/output.js': ';',
        '.wuf/awesome-components.json': '{ "Thingy": {} }',
      });

      await exportTestkits({
        components: '.wuf/awesome-components.json',
        output: `.wuf/testkits/output.js`,
        exportSuffix: 'YoWhatsUp',
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, '.wuf', 'testkits', 'output.js'),
        'utf8',
      );

      expect(output).toMatch(
        /.*export const thingyYoWhatsUp = testkitFactoryCreator\(load\(require\('..\/src\/Thingy\/Thingy.driver'\)\)\)\.*/,
      );
    });
  });

  describe('given ejs template', () => {
    it('should run ejs and write output', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': ';',
        '.wuf/testkits/template.ejs': `<% components.map(c => { %><%= c.name %>\n<% }) %>`,
        '.wuf/testkits/output.js': ';',
        '.wuf/components.json': '{ "First": {}, "Second": {} }',
      });

      await exportTestkits({
        template: '.wuf/testkits/template.ejs',
        components: '.wuf/components.json',
        output: `.wuf/testkits/output.js`,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, '.wuf', 'testkits', 'output.js'),
        'utf8',
      );

      expect(output).toEqual(
        [
          warningBanner(`${fakeFs.dir}/.wuf/testkits/template.ejs`),
          'First',
          'Second',
          '',
        ].join('\n'),
      );
    });

    it('should run ejs and write output', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': `module.exports = {
        First: {
          unidriver: true,
          testkitPath: "custom/path"
        }
      }`,
        '.wuf/testkits/template.ejs': fs.readFileSync(
          path.resolve(__dirname, '__fixtures__', 'template.ejs'),
          'utf8',
        ),
        '.wuf/testkits/output.js': ';',
        '.wuf/components.json': '{ "First": {}, "Second": {} }',
      });

      await exportTestkits({
        template: '.wuf/testkits/template.ejs',
        components: '.wuf/components.json',
        output: `.wuf/testkits/output.js`,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, '.wuf', 'testkits', 'output.js'),
        'utf8',
      );

      expect(output).toEqual(
        [
          warningBanner(`${fakeFs.dir}/.wuf/testkits/template.ejs`),
          fs.readFileSync(
            path.resolve(__dirname, '__fixtures__', 'template.output.ts'),
            'utf8',
          ),
        ].join('\n'),
      );
    });

    it('should run throw error for erroneous ejs', () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': ';',
        '.wuf/testkits/template.ejs': `<% components.map(c => { %><%= c.name %>\n<% ) %>`,
        '.wuf/testkits/output.js': ';',
        '.wuf/components.json': '{ "First": {}, "Second": {} }',
      });

      return expect(
        exportTestkits({
          template: '.wuf/testkits/template.ejs',
          components: '.wuf/components.json',
          output: `.wuf/testkits/output.js`,
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow();
    });
  });

  describe('given caseStyle option', () => {
    it('should write output correctly with PascalCase', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': ';',
        '.wuf/testkits/template.js': ';',
        '.wuf/testkits/output.js': ';',
        '.wuf/awesome-components.json': '{ "Thingy": {} }',
      });

      await exportTestkits({
        components: '.wuf/awesome-components.json',
        output: `.wuf/testkits/output.js`,
        exportCaseStyle: 'PascalCase',
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, '.wuf', 'testkits', 'output.js'),
        'utf8',
      );

      expect(output).toMatch(
        /.*export const ThingyTestkitFactory = testkitFactoryCreator\(load\(require\('..\/src\/Thingy\/Thingy.driver'\)\)\)\.*/,
      );
    });

    it('should write output correctly with camelCase', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.js': ';',
        '.wuf/testkits/template.js': ';',
        '.wuf/testkits/output.js': ';',
        '.wuf/awesome-components.json': '{ "Thingy": {} }',
      });

      await exportTestkits({
        components: '.wuf/awesome-components.json',
        output: `.wuf/testkits/output.js`,
        exportCaseStyle: 'camelCase',
        exportSuffix: 'CamelCase',
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, '.wuf', 'testkits', 'output.js'),
        'utf8',
      );

      expect(output).toMatch(
        /.*export const thingyCamelCase = testkitFactoryCreator\(load\(require\('..\/src\/Thingy\/Thingy.driver'\)\)\)\.*/,
      );
    });
  });
});
