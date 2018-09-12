
const union = require('lodash/union');
const StylableWebpackPlugin = require('stylable-webpack-plugin');
const webpackCommonConfig = require('./webpack.config.common');
const projectConfig = require('yoshi-config');

module.exports = config => {
  const projectName = projectConfig.name;
  const cssModules = projectConfig.cssModules;

  config.resolve.extensions = union(
    config.resolve.extensions,
    webpackCommonConfig.resolve.extensions,
  );

  config.module.rules = [
    ...webpackCommonConfig.module.rules,
    ...require('../src/loaders/sass')({
      separateCss: false,
      cssModules,
      tpaStyle: false,
      projectName,
      hmr: false,
      min: false,
    }).client,
  ];

  config.plugins = [...(config.plugins || []), new StylableWebpackPlugin()];

  return config;
};