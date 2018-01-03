// const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
// const wixStorybookConfig = require('haste-preset-yoshi/config/webpack.config.storybook');
//
// module.exports = (config, env) => {
//   return wixStorybookConfig(genDefaultConfig(config, env));
// };
//
//
const _ = require('lodash/fp');
const path = require('path');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const wixStorybookConfig = require('haste-preset-yoshi/config/webpack.config.storybook');

module.exports = (config, env) => {
  const newConfig = wixStorybookConfig(genDefaultConfig(config, env));

  return _.merge(newConfig, {
    context: path.resolve(__dirname, '../src'),
    resolve: {
      alias: {
        'wix-ui-icons': path.resolve(__dirname, '../src'),
        'story': path.resolve(__dirname, '../stories/create-story')
      }
    }
  });
};
