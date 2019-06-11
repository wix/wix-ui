export const cli = program =>
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
      '--output <string>',
      'Path to output. If not set, output is determined by --templates folder structure',
    )
    .option(
      '--codemods <string>',
      'Path to codemods. Default is "/generator/codemods/"',
    )
    .option(
      '-f, --force',
      'Force component generation in a non clean git repo.',
    );
