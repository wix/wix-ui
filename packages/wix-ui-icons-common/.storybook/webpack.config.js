const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');

module.exports = (config, env) => {
  return wixStorybookConfig(genDefaultConfig(config, env));
};
