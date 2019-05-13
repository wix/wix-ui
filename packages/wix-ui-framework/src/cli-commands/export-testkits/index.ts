import * as path from 'path';
import { fileExists } from '../../file-exists';
import { generate } from './generate';

interface Options {
  definitions: string;
  template: string;
  output: string;
}

const makeOptions = options => ({
  definitions: '.wuf/testkit-definitions.json',
  template: '.wuf/testkits/template.js',
  output: options.template
    ? `testkits/${path.basename(options.template)}`
    : 'testkits/testkits.js',
  ...options,
});

export const exportTestkits: (a: Options) => Promise<void> = opts =>
  new Promise(async (resolve, reject) => {
    const options = makeOptions(opts);

    const definitionsPath = path.resolve(
      __dirname,
      options._process.cwd,
      options.definitions,
    );

    if (!(await fileExists(definitionsPath))) {
      return reject(
        `ERROR: Definitions file does not exist at "${options.definitions}"`,
      );
    }

    return generate({
      templatePath: options.template,
      outputPath: options.output,

      // TODO: these should come from some sane place
      factoryCreator: 'enzymeTestkitFactoryCreator',
      uniFactoryCreator: 'enzymeUniTestkitFactoryCreator',
    });
  });
