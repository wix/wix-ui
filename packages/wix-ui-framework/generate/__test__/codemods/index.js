module.exports = [
  {
    codemod: 'stories-file.js',
    dist: 'stories/index.js',
    description: 'Add story to the stories file',
  },
  {
    codemod: 'index-file.js',
    dist: 'src/index.js',
    description: 'Add component export to the index file',
  },

  {
    codemod: 'testkit-definitions.js',
    dist: 'testkit/testkit-definitions.js',
    description: 'Update testkit-definitions.js file',
  },

  {
    codemod: 'testkit-exports.js',
    dist: 'testkit/protractor.js',
    description: 'Add Protractor testkit export',
  },

  {
    codemod: 'testkit-exports.js',
    dist: 'testkit/puppeteer.js',
    description: 'Add Puppeteer testkit export',
  },
];
