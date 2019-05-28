import * as program from 'commander';
import { generate } from './cli-commands/generate';
import { exportTestkits } from './cli-commands/export-testkits';
import { updateComponentsList } from './cli-commands/update-components-list';

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

program
  .command('update')
  .description('Update components list file')
  .option(
    '--shape <string>',
    'Path to json file describing folder structure of required files. Default is `.wuf/required-component-files.json`',
  )
  .option(
    '--components <string>',
    'Path to folder where components reside. Default is `src/components`',
  )
  .option(
    '--output <string>',
    'Path to output file. Default is `.wuf/components.json`',
  )
  .option(
    '--exclude <string>',
    'Regular expression of known paths to exclude. For example --exclude (Button|Table). Default is undefined',
  )
  .option(
    '--max-mismatch <number>',
    'Optional number of maximum mismatches between shape defined in required-component-files.json and component. Default is 0',
  )
  .action(run(updateComponentsList));

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
