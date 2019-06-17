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
      '--components <string>',
      'Path to components.json file. Default is ".wuf/components.json"',
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
      '--exportSuffix <string>',
      'String to suffix each exported testkit. Default is "TestkitFactory"',
    )

    .option(
      '--exportCaseStyle <string>',
      'Set exported testkit case style. Possible values are "camelCase", "PascalCase". Default is "camelCase".',
    )

    .option(
      '--template <string>',
      'Path to template. Default is ".wuf/testkits/template.js"',
    );
