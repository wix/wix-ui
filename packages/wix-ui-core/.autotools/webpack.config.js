const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');
const path = require('path');
const packagePath = path.resolve(__dirname, '..');

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
