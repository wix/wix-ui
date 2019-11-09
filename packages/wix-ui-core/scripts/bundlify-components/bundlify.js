/* eslint no-console: 0 */
const webpack = require('webpack');
const { defaultConfig } = require('./webpack.config.js');

webpack(defaultConfig, errorHandler);

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
