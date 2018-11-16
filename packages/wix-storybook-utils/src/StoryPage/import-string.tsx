import { Config } from '../typings/config';
import { Metadata } from '../typings/metadata';

interface ImportString {
  metadata: Metadata;
  config: Config;
  exampleImport: string;
}

export const importString: (ImportString) => string = ({
  metadata,
  config,
  exampleImport,
}: ImportString) =>
  [
    {
      when: () => exampleImport,
      make: () => exampleImport,
    },
    {
      when: () => config.importFormat,
      make: () =>
        config.importFormat
          .replace(/%componentName/g, metadata.displayName)
          .replace(
            new RegExp('%(' + Object.keys(config).join('|') + ')', 'g'),
            (match, configKey) => config[configKey] || '',
          ),
    },
    {
      // default
      when: () => true,
      make: () =>
        `import ${metadata.displayName} from '${config.moduleName}/${
          metadata.displayName
        }';`,
    },
  ]
    .filter(({ when }) => when())[0]
    .make();
