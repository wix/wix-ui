const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const wixStorybookConfig = require('haste-preset-yoshi/config/webpack.config.storybook');

module.exports = (config, env) => {
  const newConfig = wixStorybookConfig(genDefaultConfig(config, env));

  newConfig.module.rules.push({
    test: /\.story\.[j|t]sx?$/,
    loader: 'wix-storybook-utils/loader',
    options: {
      storyConfig: {
        moduleName: 'wix-ui-core',
        repoBaseURL: 'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core/src/components/'
      }
    }
  });

  return newConfig;
};
