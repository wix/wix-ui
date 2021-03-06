import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';

import { fileExists } from '../../file-exists';
import { objectEntries } from '../../object-entries';
import { Options } from './typings';

const pathResolver = (cwd: string) => (...a: string[]) =>
  path.resolve(cwd, ...a);

export const warningBanner = (templatePath: string) =>
  `/* eslint-disable */
/* tslint:disable */
/*
 * DO NOT EDIT THIS FILE!
 * YOUR CHANGES WILL BE OVERWRITTEN!
 * FILE IS BASED ON ${templatePath}
 * AND GENERATED BY \`wuf export-testkits\`
 */`;

const writeFile = (pathname: string, source: string) => {
  try {
    fs.writeFileSync(pathname, source);
  } catch (e) {
    throw new Error(`Unable to generate testkits: ${e}`);
  }
};

const resolveDefinitions = async ({ requirePath, cwd, components }) => {
  try {
    const definitions = require(requirePath);
    if (typeof definitions === 'function') {
      return await definitions({ components, cwd });
    }
    return definitions;
  } catch (e) {
    const relativePath = path.relative(cwd, path.resolve(requirePath));
    throw new Error(
      `Unable to load definitions file at "${relativePath}":\n${e}`,
    );
  }
};

const resolveComponents = async ({ requirePath, cwd }) => {
  if (!(await fileExists(requirePath))) {
    throw new Error(
      `Components file not found at "${requirePath}". It is required for \`wuf export-testkits\`. Create one with \`wuf update\`.`,
    );
  }

  try {
    return require(path.resolve(cwd, requirePath));
  } catch (e) {
    const relativePath = path.relative(cwd, path.resolve(requirePath));
    throw new Error(
      `Unable to load ${requirePath} file at "${relativePath}":\n${e}`,
    );
  }
};

const resolveTemplate = async ({ requirePath }) => {
  if (!(await fileExists(requirePath))) {
    throw new Error(
      `Template file not found at "${requirePath}". It is required for \`wuf export-testkits\`.`,
    );
  }

  try {
    return fs.readFileSync(requirePath, 'utf8');
  } catch (e) {}
};

const guards: (a: Options) => Promise<void> = async (optionsRaw) => {
  const pathResolve = pathResolver(optionsRaw._process.cwd);

  if (!optionsRaw.output) {
    throw new Error('missing --output parameter, it must be defined');
  }

  const components = await resolveComponents({
    requirePath: pathResolve(optionsRaw.components || '.wuf/components.json'),
    cwd: optionsRaw._process.cwd,
  });

  const definitions = optionsRaw.definitions
    ? await resolveDefinitions({
        requirePath: pathResolve(optionsRaw.definitions),
        cwd: optionsRaw._process.cwd,
        components,
      })
    : {};

  const templatePath = pathResolve(
    optionsRaw.template || '.wuf/testkits/template.ejs',
  );
  const template = await resolveTemplate({
    requirePath: templatePath,
  });

  const options = {
    ...optionsRaw,
    definitions,
    components,
    template,
    templatePath,
    output: pathResolve(optionsRaw.output),

    /** @deprecated it should be set in template */
    factoryName: optionsRaw.factoryName || 'testkitFactoryCreator',

    /** @deprecated it should be set in template */
    uniFactoryName: optionsRaw.uniFactoryName || 'uniTestkitFactoryCreator',

    /** @deprecated it should be set in template */
    exportSuffix: optionsRaw.exportSuffix || 'TestkitFactory',

    /** @deprecated it should be set in template */
    exportCaseStyle: optionsRaw.exportCaseStyle || 'camelCase',
  };

  return makeOutput(options);
};

const ejsSource = ({ source, definitions, components, data }) => {
  const utils = {
    toCamel: camelCase,
    toKebab: kebabCase,
    toSnake: snakeCase,
    toPascal: (s: string) => {
      const camel: string = camelCase(s);
      return camel[0].toUpperCase() + camel.substring(1);
    },
  };

  const componentsForEjs = objectEntries({ ...components, ...definitions }).map(
    ([name, value]) => ({
      name,
      ...value,
      ...(definitions[name] || {}),
    }),
  );

  try {
    return ejs.render(source, {
      utils,
      components: componentsForEjs,
      data,
    });
  } catch (e) {
    throw new Error(`Erroneous template file: ${e}`);
  }
};

const makeOutput: (a: Options) => Promise<void> = async (options) => {
  const testkitsExportsSource = ejsSource({
    source: options.template,
    definitions: options.definitions,
    data: options.definitions,
    components: options.components,
  });

  const source = [
    warningBanner(
      path.relative(options._process.cwd, path.resolve(options.templatePath)),
    ),
    testkitsExportsSource,
  ].join('\n');

  writeFile(options.output, source);
};

export const exportTestkits: (a: Options) => Promise<void> = guards;
