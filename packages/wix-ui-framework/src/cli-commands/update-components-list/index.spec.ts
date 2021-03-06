import cista from 'cista';
import path from 'path';
import fs from 'fs';

import { GitTestkit } from '../../../test/git-testkit';

import { updateComponentsList } from '.';

describe('updateComponentsList', () => {
  beforeEach(() => {
    cista().cleanup();
  });

  describe('given non existing shape path', () => {
    it('should reject with error', () => {
      const fakeFs = cista();
      return expect(
        updateComponentsList({
          shape: 'non-existing',
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow(
        'Component structure file does not exist at "non-existing"',
      );
    });
  });

  describe('given non existing components path', () => {
    it('should reject with error', () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': '',
      });
      return expect(
        updateComponentsList({
          components: 'non-existing',
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow('Cannot read components folder at "non-existing"');
    });
  });

  describe('given existing shape and component folder paths', () => {
    it('should write correct object to .wuf/components.json', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{ "index.js": "", "docs": {"index.story.js": "" } }`,
        'src/components/test-component/index.js': '',
        '.wuf/components.json': '',
      });

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
          missingFiles: ['docs'],
        },
      };

      await updateComponentsList({
        maxMismatch: 2,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.json`,
        'utf8',
      );

      expect(JSON.parse(output)).toEqual(expectedOutput);
    });

    it('should keep previous entries of output json file', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{ "index.js": "", "docs": {"index.story.js": "" } }`,
        'src/components/test-component/index.js': '',
        '.wuf/components.json':
          '{ "a": {}, "z": { "hello": "world" }, "B": { "great": "scott" } }',
      });

      const expectedOutput = fs
        .readFileSync(
          path.resolve(__dirname, '__fixtures__', 'components-json-output'),
          'utf8',
        )
        .trim(); // fs.readFileSync adds new line at the end, so trimming it

      await updateComponentsList({
        maxMismatch: 2,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.json`,
        'utf8',
      );

      expect(output).toEqual(expectedOutput);
    });

    it('should support globs in file names', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{
          "index.[tj]s*": "",
          "Component.[tj]s*": "",
          "@(test|specs)": {
            "*?(.uni).driver.[tj]s*": "",
            "non-matched": "",
            "@(e2e|browser)": {
              "index.@(protractor|puppeteer).ts*": ""
            }
          }
        }`,
        'src/components/test-component/index.tsx': '',
        'src/components/test-component/test-component.tsx': '',
        'src/components/test-component/test/thing.driver.js': '',
        'src/components/test-component/test/thing.driver.ts': '',
        'src/components/test-component/test/thing.uni.driver.tsx': '',
        'src/components/test-component/specs/e2e/index.puppeteer.tsx': '',
        '.wuf/components.json': '',
      });

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
          missingFiles: [
            'specs/*?(.uni).driver.[tj]s*',
            'specs/non-matched',
            'test/non-matched',
            'test/@(e2e|browser)',
          ],
        },
      };

      await updateComponentsList({
        maxMismatch: 4,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.json`,
        'utf8',
      );

      expect(JSON.parse(output)).toEqual(expectedOutput);
    });

    it('should skip items in --exclude and not write them to .wuf/components.json', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{ "index.js": "" }`,
        'src/components/test-component/index.js': '',
        'src/components/skipped-component/index.js': '',
        'src/components/skipped-component2/index.js': '',
        '.wuf/components.json': '',
      });

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
        },
      };

      await updateComponentsList({
        maxMismatch: 0,
        exclude: '(skipped-component|skipped-component2)',
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.json`,
        'utf8',
      );

      expect(JSON.parse(output)).toEqual(expectedOutput);
    });

    it('should not add `missingFiles` if there are none', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{ "index.js": "", "docs": {"index.story.js": "" } }`,
        'src/components/test-component/index.js': '',
        'src/components/test-component/docs/index.story.js': '',
        '.wuf/components.json': '',
      });

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
        },
      };

      await updateComponentsList({
        maxMismatch: 2,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.json`,
        'utf8',
      );

      expect(JSON.parse(output)).toEqual(expectedOutput);
    });
  });

  describe('given --verbose-output option', () => {
    it('should write output to both --output and --verbose-output paths', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{ "index.js": "" }`,
        'src/components/test-component/index.js': '',
      });

      await updateComponentsList({
        verboseOutput: '.wuf/components.meta.json',
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.json`,
        'utf8',
      );

      const verboseOutput = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.meta.json`,
        'utf8',
      );

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
        },
      };

      const expectedVerboseOutput = {
        'test-component': {
          path: 'src/components/test-component',
        },
      };

      expect(JSON.parse(output)).toEqual(expectedOutput);
      expect(JSON.parse(verboseOutput)).toEqual(expectedVerboseOutput);
    });
  });

  describe('dirty flag', () => {
    it('should be added for changed components', async () => {
      const gitTestkit = new GitTestkit();
      await gitTestkit.init({
        files: {
          '.wuf': {
            'required-component-files.json': `{ "index.js": "" }`,
          },
          src: {
            A: { 'index.js': '' },
            B: { 'index.js': `require("../C")` },
            C: { 'index.js': `require("./C.js")`, 'C.js': ';' },
          },
        },
        branches: {
          feature: {
            src: {
              C: {
                'C.js': '"hello world"',
              },
            },
          },
        },
      });

      await gitTestkit.checkout('feature');

      await updateComponentsList({
        components: 'src',
        verboseOutput: '.wuf/yo.whatsup',
        _process: { cwd: gitTestkit.cwd },
      });

      const output = JSON.parse(
        fs.readFileSync(`${gitTestkit.cwd}/.wuf/yo.whatsup`, 'utf8'),
      );

      const expectedOutput = {
        A: { path: 'src/A' },
        B: { path: 'src/B', dirty: true },
        C: { path: 'src/C', dirty: true },
      };

      expect(output).toEqual(expectedOutput);
    });

    it('should be added for changed components in monorepo', async () => {
      const gitTestkit = new GitTestkit();
      await gitTestkit.init({
        files: {
          packages: {
            'wix-ui-tpa': {
              '.wuf': {
                'required-component-files.json': '{ "index.js": "" }',
              },
              src: {
                components: {
                  BigChungus: {
                    'index.js': `import * as Dep from '../SmallChungus'`,
                  },
                  SmallChungus: { 'index.js': `;` },
                },
              },
            },
          },
        },
        branches: {
          test: {
            packages: {
              'wix-ui-tpa': {
                src: {
                  components: {
                    TheChungus: {
                      'index.js': `import Dep from '../SmallChungus'`,
                    },
                    SmallChungus: {
                      'index.js': `require('./SmallChungus.js')`,
                      'SmallChungus.js': ';',
                    },
                  },
                },
              },
            },
          },
        },
      });

      await gitTestkit.checkout('test');

      await updateComponentsList({
        components: 'src/components',
        verboseOutput: '.wuf/components.meta.json',
        _process: { cwd: path.join(gitTestkit.cwd, 'packages/wix-ui-tpa') },
      });

      const output = JSON.parse(
        fs.readFileSync(
          `${gitTestkit.cwd}/packages/wix-ui-tpa/.wuf/components.meta.json`,
          'utf8',
        ),
      );

      const expectedOutput = {
        SmallChungus: { path: 'src/components/SmallChungus', dirty: true },
        BigChungus: { path: 'src/components/BigChungus', dirty: true },
        TheChungus: { path: 'src/components/TheChungus', dirty: true },
      };

      expect(output).toEqual(expectedOutput);
    });
  });
});
