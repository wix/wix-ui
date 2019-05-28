export const cli = program =>
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
      '--factoryName <string>',
      'Name of a testkit factory creator. Default is "testkitFactoryCreator"',
    )

    .option(
      '--uniFactoryName <string>',
      'Name of a unidriver testkit factory creator. Default is "uniTestkitFactoryCreator"',
    )

    .option(
      '--template <string>',
      'Path to template. Default is ".wuf/testkits/template.js"',
    );
