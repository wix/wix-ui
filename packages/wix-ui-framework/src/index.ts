import * as program from 'commander';
import { generate } from './cli-commands/generate';

// the following must be `require`
// otherwise `dist` would contain extraneous `src` folder
const { version } = require('../package.json');

program.name('wuf').version(version, '-v, --version');

program
  .command('generate')
  .description('Scaffold file structure from templates')
  .option('--component-name <ComponentName>', 'Component name')
  .option('--description <description>', 'Component description')
  .option(
    '--templates <templatesPath>',
    'Path to templates. Default is "/generator/templates/"',
  )
  .option(
    '--codemods <codemodsPath>',
    'Path to codemods. Default is "/generator/codemods/"',
  )
  .option('-f, --force', 'Force component generation in a non clean git repo.')
  .action(options => generate(options).catch(e => console.error(e)));

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
