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
        fakeFs.dir + '/.wuf/components.json',
        'utf8',
      );

      expect(JSON.parse(output)).toEqual(expectedOutput);
    });
  });
});
