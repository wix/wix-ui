import * as cista from 'cista';

import { exportTestkits } from '.';

describe('exportTestkits', () => {
  describe('when testkit-definitions.js is not found', () => {
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

  describe('given definitions options', () => {
    it('should reject with error when file not found', () => {
      const fakeFs = cista({
        '.wuf/testkit-definitions.js': ';',
      });

      return expect(
        exportTestkits({
          definitions: 'non/existng/path/to/definitions.js',
          _process: { cwd: fakeFs.dir },
        }),
      ).rejects.toThrow();
    });
  });
});
