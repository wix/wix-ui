const getTestkitFactoryCreatorMethod = importPath => {
  if (importPath.match('vanilla')) {
    return 'uniTestkitFactoryCreator';
  }

  if (importPath.match('enzyme')) {
    return 'enzymeUniTestkitFactoryCreator';
  }

  if (importPath.match('protractor')) {
    return 'protractorUniTestkitFactoryCreator';
  }

  if (importPath.match('puppeteer')) {
    return 'puppeteerUniTestkitFactoryCreator';
  }

  return false;
};

module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const { ComponentName, componentName } = options;

  // Find the `testkitFactoryCreator` method to use
  const importNode = root
    .find(j.ImportDeclaration, {
      source: {
        type: 'Literal',
        value: value => value.match('wix-ui-test-utils/'),
      },
    })
    .get(0).node;

  const testkitFactoryMethodName = getTestkitFactoryCreatorMethod(
    importNode.source.value,
  );

  root.get().node.program.body.push(
    `import { ${componentName}DriverFactory } from '../src/${ComponentName}/${ComponentName}.uni.driver';

export const ${componentName}TestkitFactory = ${testkitFactoryMethodName}(
  ${componentName}DriverFactory,
);`,
  );

  return root.toSource();
};
