import * as cista from 'cista';
import * as path from 'path';
import * as fs from 'fs';

import { updateComponentsList } from '.';

describe('updateComponentsList', () => {
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
        maxMismatch: 1,
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

    it('should write compound components under `compound` object to .wuf/components.json', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{ "index.js": "", "docs": {"index.story.js": "" } }`,
        'src/components/test-component/index.js': '',
        'src/components/test-component/docs/index.story.js': 'content',
        'src/components/test-component/child/index.js': '',
        'src/components/test-component/child/docs/index.story.js': '',
        '.wuf/components.json': '',
      });

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
          compound: {
            child: {
              path: 'src/components/test-component/child',
            },
          },
        },
      };

      await updateComponentsList({
        maxMismatch: 0,
        _process: { cwd: fakeFs.dir },
      });

      const output = fs.readFileSync(
        `${fakeFs.dir}/.wuf/components.json`,
        'utf8',
      );

      expect(JSON.parse(output)).toEqual(expectedOutput);
    });
  });
});
