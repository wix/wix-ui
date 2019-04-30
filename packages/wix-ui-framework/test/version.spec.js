const path = require('path');
const { exec } = require('child_process');

const packageJson = require('../package.json');

function cli({ args = '', cwd = process.cwd() }) {
  const entryPath = path.resolve(__dirname, '..', 'bin', 'start');

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

  describe('--help', () => {
    it('should echo help with all commands', async () => {
      const { stdout } = await cli({ args: '--help' });
      expect(stdout).toEqual(
        `
Usage: start [options] [command]

Options:
  -v, --version       output the version number
  -h, --help          output usage information

Commands:
  generate [options]  Generate a UI component
      `.trim(),
      );
    });
  });
});
