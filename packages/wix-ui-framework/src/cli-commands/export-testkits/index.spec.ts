import fs from 'fs';
import path from 'path';
import cista from 'cista';

import { exportTestkits, warningBanner } from '.';

describe('exportTestkits', () => {
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
        '.wuf/testkits/definitions.js': ';',
        '.wuf/testkits/templates/components.json': '{}',
        '.wuf/components.json': '{}',
        output: '',
      });

      return expect(
        exportTestkits({
          output: 'output',
          definitions: 'non/existing/path/to/definitions.js',
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow(
        /Unable to load definitions file at "non\/existing\/path\/to\/definitions.js"/,
      );
    });

    it('should work with json file', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.json':
          '{ "Thingy": { "specialName": "DudeWheresMyCar" } }',
        '.wuf/testkits/template.ejs':
          '<%= components.map(c => c.specialName || c.name).join("\\n") %>',
        'output.weird-extension': ';',
        '.wuf/awesome-components.json': '{ "Thingy": {}, "Thongy": {} }',
      });

      await exportTestkits({
        components: '.wuf/awesome-components.json',
        definitions: '.wuf/testkits/definitions.json',
        output: `output.weird-extension`,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, 'output.weird-extension'),
        'utf8',
      );

      expect(output).toEqual(
        [
          warningBanner(`.wuf/testkits/template.ejs`),
          'DudeWheresMyCar',
          'Thongy',
        ].join('\n'),
      );
    });

    it('should include all definitions file entries in components array', async () => {
      const fakeFs = cista({
        '.wuf/testkits/definitions.json':
          '{ "NotInComponents": { "specialName": "CubicsRube" } }',
        '.wuf/testkits/template.ejs':
          '<%= components.map(c => c.specialName || c.name).join("\\n") %>',
        '.wuf/components.json': '{ "Thingy": {}, "Thongy": {} }',
        output: ';',
      });

      await exportTestkits({
        definitions: '.wuf/testkits/definitions.json',
        output: 'output',
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, 'output'),
        'utf8',
      );

      expect(output).toEqual(
        [
          warningBanner(`.wuf/testkits/template.ejs`),
          'Thingy',
          'Thongy',
          'CubicsRube',
        ].join('\n'),
      );
    });

    describe('when definitions returns a promise', () => {
      it('should resolve promise with components and inject result into `data` of ejs', async () => {
        const fakeFs = cista({
          '.wuf/testkits/definitions.js': `
            const path = require("path");
            module.exports = ({ components, cwd }) =>
              new Promise((resolve) => {
                setTimeout(() =>
                  resolve({
                    ...components,
                    whodis: "new phone",
                    location: path.dirname(cwd)
                  }), 500)
              })`,
          '.wuf/testkits/template.ejs':
            '<%= data.whodis %> <%= data.bat %> <%= data.location %>',
          '.wuf/components.json': '{ "bat": "man" }',
        });

        await exportTestkits({
          definitions: '.wuf/testkits/definitions.js',
          output: 'output',
          _process: { cwd: fakeFs.dir },
        });

        const output = fs.readFileSync(
          path.resolve(fakeFs.dir, 'output'),
          'utf8',
        );

        expect(output).toEqual(
          [
            warningBanner(`.wuf/testkits/template.ejs`),
            'new phone man /tmp',
          ].join('\n'),
        );
      });
    });
  });

  describe('when definitions option missing', () => {
    it('should work without definitions file', async () => {
      const fakeFs = cista({
        '.wuf/testkits/template.ejs': 'hello template',
        '.wuf/components.json': '{}',
        output: '',
      });

      await exportTestkits({
        output: 'output',
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        path.resolve(fakeFs.dir, 'output'),
        'utf8',
      );

      expect(output).toEqual(
        [warningBanner(`.wuf/testkits/template.ejs`), 'hello template'].join(
          '\n',
        ),
      );
    });
  });

  describe('given template option', () => {
    it('should reject with error when file not found', () => {
      const fakeFs = cista({
        '.wuf/testkits/template.ejs': ';',
        '.wuf/testkits/definitions.js': ';',
        '.wuf/components.json': '{}',
      });

      return expect(
        exportTestkits({
          template: 'non/existing/path/to/template.ejs',
          output: 'anywhere',
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow(
        `Template file not found at "${fakeFs.dir}/non/existing/path/to/template.ejs". It is required for \`wuf export-testkits\`.`,
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
        '.wuf/testkits/template.ejs':
          '<%= components.map(c => c.name).join("\\n") %>',
        '.wuf/testkits/output.js': ';',
        '.wuf/awesome-components.json': '{ "Thingy": {}, "Thongy": {} }',
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

      expect(output).toEqual(
        [warningBanner(`.wuf/testkits/template.ejs`), 'Thingy', 'Thongy'].join(
          '\n',
        ),
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
          warningBanner(`.wuf/testkits/template.ejs`),
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
        definitions: `.wuf/testkits/definitions.js`,
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
          warningBanner(`.wuf/testkits/template.ejs`),
          fs.readFileSync(
            path.resolve(__dirname, '__fixtures__', 'template.output'),
            'utf8',
          ),
        ].join('\n'),
      );
    });

    it('should include global utils variable', async () => {
      const fakeFs = cista({
        '.wuf/testkits/template.ejs': fs.readFileSync(
          path.resolve(__dirname, '__fixtures__', 'utils-template.ejs'),
          'utf8',
        ),
        '.wuf/components.json': '{}',
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
          warningBanner(`.wuf/testkits/template.ejs`),
          fs.readFileSync(
            path.resolve(__dirname, '__fixtures__', 'utils-template.output'),
            'utf8',
          ),
        ].join('\n'),
      );
    });

    it('should throw error for erroneous ejs', () => {
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
});
