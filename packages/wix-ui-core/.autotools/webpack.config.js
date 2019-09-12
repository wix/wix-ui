const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');
const path = require('path');
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
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

// Filter out yoshi's stylable plugin
yoshiConfig.plugins = yoshiConfig.plugins.filter(plugin => {
  return plugin.constructor.name !== 'StylableWebpackPlugin';
});

const stylableWebpackPlugin = new StylableWebpackPlugin({
  filename: '[name].stylable.bundle.css',
  optimize: { 
    classNameOptimizations: false,
    shortNamespaces: false,
    removeUnusedComponents: false
  },
  generate: {
    runtimeStylesheetId: 'namespace',
  },
  legacyRuntime: true,
  unsafeBuildNamespace: true 
});

yoshiConfig.plugins.push(stylableWebpackPlugin);

module.exports = yoshiConfig;
