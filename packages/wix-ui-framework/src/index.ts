import * as program from 'commander';

import { generate } from './cli-commands/generate';
import { cli as generateCli } from './cli-commands/generate/cli';

import { exportTestkits } from './cli-commands/export-testkits';
import { cli as exportTestkitsCli } from './cli-commands/export-testkits/cli';

import { updateComponentsList } from './cli-commands/update-components-list';
import { cli as updateComponentsListCli } from './cli-commands/update-components-list/cli';

// the following must be `require`
// otherwise `dist` would contain extraneous `src` folder
const { version } = require('../package.json');

const extendOptions = options => ({
  ...options,
  _process: {
    cwd: process.cwd(),
  },
});

const run = action => options =>
  action(extendOptions(options)).catch(console.error);

program.name('wuf').version(version, '-v, --version');

generateCli(program).action(run(generate));

exportTestkitsCli(program).action(run(exportTestkits));

updateComponentsListCli(program).action(run(updateComponentsList));

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);

intentional break
