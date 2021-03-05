const { baseProtractorConfig } = require("wix-ui-test-utils/protractor");

module.exports.config = {
  ...baseProtractorConfig,
  onPrepare() {
    browser.ignoreSynchronization = true;
    require("@babel/register")({
      presets: [[require.resolve("@wix/babel-preset-yoshi")]],
      ignore: [],
    });
  },
};
