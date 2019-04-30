#!/usr/bin/env node
const program = require('commander');
const generate = require('../generate');

const { version } = require('../package.json');

program.name('wuf').version(version, '-v, --version');

program
  .command('generate')
  .description('Scaffold file structure from templates')
  .option(
    '-f, --force',
    "Skip some pre-run checks. Use only if you know what you're doing",
  )
  .option('--component-name <componentName>', 'Component name')
  .option('--description <description>', 'Component description')
  .option(
    '--templates <templatesPath>',
    'Path to templates. Default is "/generator/templates/"',
  )
  .option(
    '--codemods <codemodsPath>',
    'Path to codemods. Default is "/generator/codemods/"',
  )
  .action(generate);

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);
