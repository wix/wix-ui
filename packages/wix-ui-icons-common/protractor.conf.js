const { baseProtractorConfig } = require("wix-ui-test-utils/protractor");

module.exports.config = {
  ...baseProtractorConfig,
  onPrepare() {
    require("@babel/register")({
      presets: [[require.resolve("babel-preset-yoshi")]],
      ignore: [],
    });
  },
};
