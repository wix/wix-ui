/* eslint no-console: 0 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const { defaultConfig } = require('./webpack.config.js');

webpack(
  {
    ...defaultConfig,
    ...defaultConfig.plugins.push(new BundleAnalyzerPlugin()),
  },
  errorHandler,
);

function errorHandler(err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
}
