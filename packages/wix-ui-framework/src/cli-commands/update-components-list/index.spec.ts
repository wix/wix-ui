import * as cista from 'cista';
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
          missingFiles: ['docs', 'docs/index.story.js'],
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

    // TODO: intentionally skipped, feature not implemented
    it.skip('should support regex in file names', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{
          "index.js": "",
          "test": { ".*\.driver\.(uni\.)?(js|ts)": "" }
        }`,
        'src/components/test-component/index.js': '',
        'src/components/test-component/test/thing.driver.js': '',
        'src/components/test-component/test/thing.driver.ts': '',
        'src/components/test-component/test/thing.driver.uni.js': '',
        'src/components/test-component/test/non-matched': '',
        '.wuf/components.json': '',
      });

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
          missingFiles: ['src/components/test-components/test/non-matched'],
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

    // TODO: intentionally skipped, feature not implemented
    it.skip('should support regex in file names', async () => {
      const fakeFs = cista({
        '.wuf/required-component-files.json': `{
          "index.js": "",
          "test": { ".*\.driver\.(uni\.)?(js|ts)": "" }
        }`,
        'src/components/test-component/index.js': '',
        'src/components/test-component/test/thing.driver.js': '',
        'src/components/test-component/test/thing.driver.ts': '',
        'src/components/test-component/test/thing.driver.uni.js': '',
        'src/components/test-component/test/non-matched': '',
        '.wuf/components.json': '',
      });

      const expectedOutput = {
        'test-component': {
          path: 'src/components/test-component',
          missingFiles: ['src/components/test-components/test/non-matched'],
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
});
