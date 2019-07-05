import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as camelCase from 'lodash/camelCase';

import { fileExists } from '../../file-exists';
import { objectEntries } from '../../object-entries';
import { Options } from './typings';

const pathResolver = cwd => (...a) => path.resolve(cwd, ...a);

export const warningBanner = (templatePath: string) =>
  `/* eslint-disable */
/*
 * DO NOT EDIT THIS FILE!
 * YOUR CHANGES WILL BE OVERWRITTEN!
 * FILE IS BASED ON ${templatePath}
 * AND GENERATED BY \`wuf export-teskits\`
 */`;

const writeFile = (pathname: string, source: string) => {
  try {
    fs.writeFileSync(pathname, source);
  } catch (e) {
    throw new Error(`Unable to generate testkits: ${e}`);
  }
};

const tryRequire = ({ requirePath, cwd }) => {
  try {
    return require(requirePath);
  } catch (e) {
    const relativePath = path.relative(cwd, path.resolve(requirePath));
    throw new Error(
      `Unable to load definitions file at "${relativePath}":\n${e}`,
    );
  }
};

const guards: (a: Options) => Promise<void> = async unsafeOptions => {
  const pathResolve = pathResolver(unsafeOptions._process.cwd);

  if (!unsafeOptions.output) {
    throw new Error('missing --output parameter, it must be defined');
  }

  const options = {
    ...unsafeOptions,
    definitions: unsafeOptions.definitions
      ? tryRequire({
          requirePath: pathResolve(unsafeOptions.definitions),
          cwd: unsafeOptions._process.cwd,
        })
      : {},
    components: pathResolve(unsafeOptions.components || '.wuf/components.json'),
    template: pathResolve(
      unsafeOptions.template || '.wuf/testkits/template.ejs',
    ),
    factoryName: unsafeOptions.factoryName || 'testkitFactoryCreator',
    uniFactoryName: unsafeOptions.uniFactoryName || 'uniTestkitFactoryCreator',
    output: pathResolve(unsafeOptions.output),
    exportSuffix: unsafeOptions.exportSuffix || 'TestkitFactory',
    exportCaseStyle: unsafeOptions.exportCaseStyle || 'camelCase',
  };

  if (!(await fileExists(options.components))) {
    throw new Error(
      `Components file not found at "${options.components}". It is required for \`wuf export-testkits\`. Create one with \`wuf update\`.`,
    );
  }

  if (!(await fileExists(options.template))) {
    throw new Error(
      `Template file not found at "${options.template}". It is required for \`wuf export-testkits\`.`,
    );
  }

  return makeOutput(options);
};

const ejsSource = ({ source, definitions, components }) => {
  const utils = {
    toCamel: camelCase,
  };

  const componentsForEjs = objectEntries(components).map(([name, value]) => ({
    name,
    ...value,
    ...(definitions[name] || {}),
  }));

  try {
    return ejs.render(source, {
      utils,
      components: componentsForEjs,
    });
  } catch (e) {
    throw new Error(`Erroneous template file: ${e}`);
  }
};

const makeOutput: (a: Options) => Promise<void> = async options => {
  const components = require(path.resolve(
    options._process.cwd,
    options.components,
  ));
  const templateSource = fs.readFileSync(options.template, 'utf8');

  const testkitsExportsSource = ejsSource({
    source: templateSource,
    definitions: options.definitions,
    components,
  });

  const source = [
    warningBanner(
      path.relative(options._process.cwd, path.resolve(options.template)),
    ),
    testkitsExportsSource,
  ].join('\n');

  writeFile(options.output, source);
};

export const exportTestkits: (a: Options) => Promise<void> = guards;
