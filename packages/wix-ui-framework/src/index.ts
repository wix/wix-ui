import * as program from 'commander';
import { generate } from './generate';

program.name('wuf').version('1.2.0', '-v, --version');

program
  .command('generate')
  .description('Scaffold file structure from templates')
  .option('-f, --force', 'Force component generation in a non clean git repo.')
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
  .action(options => generate(options).catch(e => console.error(e)));

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
