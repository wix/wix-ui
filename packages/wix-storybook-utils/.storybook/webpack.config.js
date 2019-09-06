const path = require('path');
const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');

const makeTestkitTemplate = platform =>
  `import { <%= utils.toCamel(component.displayName) %>TestkitFactory } from 'wix-style-react/dist${platform}';`;

module.exports = (config, env, defaultConfig) => {
  const newConfig = wixStorybookConfig(defaultConfig);

  newConfig.resolve.alias = {
    ...newConfig.resolve.alias,
    'wix-storybook-utils': path.resolve(__dirname, '..', 'src'),
  };

  newConfig.module.rules.push({
    test: /\.story\.[j|t]sx?$/,
    loader: './src/loader',
    options: {
      storyConfig: {
        moduleName: 'wix-storybook-utils',
        testkits: {
          vanilla: {
            template: makeTestkitTemplate(''),
          },
          enzyme: {
            template: makeTestkitTemplate('/enzyme'),
          },
          puppeteer: {
            template: makeTestkitTemplate('/puppeteer'),
          },
          protractor: {
            template: makeTestkitTemplate('/protractor'),
          },
        },
        repoBaseURL:
          'https://github.com/wix/wix-ui/tree/master/packages/wix-storybook-utils/src/components/',
      },
    },
  });

  newConfig.module.rules.push({
    test: /.mdx$/,
    use: ['babel-loader', '@mdx-js/loader'],
  });

  return newConfig;
};
