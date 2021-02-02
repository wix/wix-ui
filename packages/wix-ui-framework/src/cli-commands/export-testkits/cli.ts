export const cli = (program) =>
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
      '--template <string>',
      'Path ejs template file. Default is ".wuf/testkits/template.ejs"',
    );
