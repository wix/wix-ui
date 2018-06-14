module.exports = {
  frameworks: ['mocha'],
  reporter: 'spec',
  browsers: ['ChromeHeadless'],
  client: {
    mocha: {
      reporter: 'html',
    }
  }
};
