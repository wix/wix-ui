import * as path from 'path';
import { exec } from 'child_process';

import * as packageJson from '../package.json';

function cli({
  args = '',
  cwd = process.cwd(),
}): Promise<{ stdout: string; stderr: string; error: any }> {
  const entryPath = path.resolve(__dirname, '..', 'bin', 'wuf.js');

  return new Promise((resolve, reject) => {
    exec(`node ${entryPath} ${args}`, { cwd }, (error, stdout, stderr) =>
      error
        ? reject({ code: error.code, error, stderr })
        : resolve({
            stdout: stdout.trim(),
            stderr,
            error,
          }),
    );
  });
}

describe('wuf', () => {
  describe('-v, --version', () => {
    it('should echo version from package.json', async () => {
      const { stdout } = await cli({ args: '-v' });
      expect(stdout).toEqual(packageJson.version);
    });
  });

  describe('given no argument', () => {
    it('should display help', async () => {
      const help = (await cli({ args: '--help' })).stdout;
      const noArg = (await cli({ args: '' })).stdout;
      expect(noArg).toEqual(help);
    });
  });
});
