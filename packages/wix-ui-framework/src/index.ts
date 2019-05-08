import * as program from 'commander';
import { generate } from './cli-commands/generate';
import { fsToJson } from './fs-to-json';
import * as fs from 'fs';

// the following must be `require`
// otherwise `dist` would contain extraneous `src` folder
const { version } = require('../package.json');

program.name('wuf').version(version, '-v, --version');

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

program
  .command('jsonify')
  .option('--path <path>', 'shit')
  .action(async options => {
    const json = await fsToJson({
      cwd: options.path,
      path: '.',
      options: { withContent: true },
    });

    fs.writeFileSync('./output.json', JSON.stringify(json, null, 2), 'utf8');
  });

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
