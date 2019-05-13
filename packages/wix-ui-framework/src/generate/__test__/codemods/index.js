module.exports = [
  {
    codemod: 'stories-file.js',
    dist: 'test-generated/stories/index.js',
    description: 'Add story to the stories file',
  },
  {
    codemod: 'index-file.js',
    dist: 'test-generated/src/index.js',
    description: 'Add component export to the index file',
  },

  {
    codemod: 'testkit-definitions.js',
    dist: 'test-generated/testkit/testkit-definitions.js',
    description: 'Update testkit-definitions.js file',
  },

  {
    codemod: 'testkit-exports.js',
    dist: 'test-generated/testkit/protractor.js',
    description: 'Add Protractor testkit export',
  },

  {
    codemod: 'testkit-exports.js',
    dist: 'test-generated/testkit/puppeteer.js',
    description: 'Add Puppeteer testkit export',
  },
];
