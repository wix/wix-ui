const merge = require('lodash/merge');
const path = require('path');
const wixStorybookConfig = require('@wix/yoshi/config/webpack.config.storybook');

module.exports = ({ config }) => {
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');
  config.plugins.find(
    plugin => plugin.constructor.name === 'ProgressPlugin',
  ).handler = () => undefined;

  const newConfig = wixStorybookConfig(config);
  const srcPath = path.resolve(__dirname, '../..', 'src');

  return merge(newConfig, {
    context: srcPath,
    resolve: {
      alias: {
        'wix-ui-core': srcPath,
      },
    },
  });
};
