export const cli = (program) =>
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
      '--verbose-output <string>',
      'Path to verbose output file. This file includes same JSON data as --output file but with additional information. File is not created if option not given. Default is undefined.',
    )
    .option(
      '--exclude <string>',
      'Regular expression of known paths to exclude. For example --exclude (Button|Table). Default is undefined',
    )
    .option(
      '--max-mismatch <number>',
      'Optional number of maximum mismatches between shape defined in required-component-files.json and component. Default is 0',
    );
