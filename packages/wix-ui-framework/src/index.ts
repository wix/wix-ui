import * as program from 'commander';
import { generate } from './cli-commands/generate';
import { exportTestkits } from './cli-commands/export-testkits';

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

program
  .command('generate')
  .description('Scaffold file structure from templates')
  .option('--component-name <ComponentName>', 'Component name')
  .option('--description <description>', 'Component description')
  .option(
    '--templates <string>',
    'Path to templates. Default is "/generator/templates/"',
  )
  .option(
    '--codemods <string>',
    'Path to codemods. Default is "/generator/codemods/"',
  )
  .option('-f, --force', 'Force component generation in a non clean git repo.')
  .action(run(generate));

program
  .command('export-testkits')
  .description('Generate testkit export file')
  .option(
    '--output <string>',
    'Mandatory option to set where to write testkit exports file',
  )
  .option(
    '--definitions <string>',
    'Path to testkit definitions. Default is ".wuf/testkit-definitions.js"',
  )
  .option(
    '--template <string>',
    'Path to template. Default is ".wuf/testkits/template.js"',
  )
  .action(run(exportTestkits));

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
