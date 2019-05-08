const defineTest = require('jscodeshift/dist/testUtils').defineTest;

const options = {
  ComponentName: 'MyNewComponent',
  componentName: 'myNewComponent',
};

defineTest(__dirname, '__test__/codemods/stories-file', options, 'stories');

defineTest(__dirname, '__test__/codemods/index-file', options, 'index');

defineTest(
  __dirname,
  '__test__/codemods/testkit-exports',
  options,
  'testkit-index',
);

defineTest(
  __dirname,
  '__test__/codemods/testkit-exports',
  options,
  'testkit-enzyme',
);

defineTest(
  __dirname,
  '__test__/codemods/testkit-exports-ts',
  options,
  'testkit-enzyme-typescript',
);

defineTest(
  __dirname,
  '__test__/codemods/testkit-exports',
  options,
  'testkit-protractor',
);

defineTest(
  __dirname,
  '__test__/codemods/testkit-exports',
  options,
  'testkit-puppeteer',
);

defineTest(
  __dirname,
  '__test__/codemods/testkit-definitions',
  options,
  'testkit-definitions',
);
