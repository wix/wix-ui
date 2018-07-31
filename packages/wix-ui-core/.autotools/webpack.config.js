const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');
const packagePath = __dirname;

const config = {
  context: packagePath,
  mode: 'development',
  module: {},
  resolve: {
    extensions: []
  }
};

const yoshiConfig = wixStorybookConfig(config);

module.exports = yoshiConfig;
