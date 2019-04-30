#!/usr/bin/env node
const program = require('commander');
const generate = require('../generate');

const { version } = require('../package.json');

program
  .version(version, '-v, --version')

  .command('generate')
  .description('Generate a UI component')
  .option('-f, --force', 'Skip some pre-run checks')
  .option('--component-name <componentName>', 'Component name')
  .option('--description <description>', 'Component description')
  .option(
    '--templates <templatesPath>',
    'Templates location. Default is /generator/templates/',
  )
  .option(
    '--codemods <codemodsPath>',
    'Codemods location. Default is /generator/codemods/',
  )
  .action(generate);

program.parse(process.argv);
