const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');
const path = require('path');

module.exports = ({config}) => {
  const newConfig = wixStorybookConfig(config);

  newConfig.module.rules.push({
    test: /\.story\.[j|t]sx?$/,
    loader: 'wix-storybook-utils/loader',
    resolve: {
      alias: {
        'wix-ui-core': path.resolve(__dirname, '../src'),
      },
    },
    options: {
      storyConfig: {
        moduleName: 'wix-ui-core',
        repoBaseURL:
          'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core/src/components/',
        importFormat:
          "import {%componentName} from '%moduleName/%componentName'",
        issueURL: "https://github.com/wix/wix-ui/issues/new"
      },
    },
  });

  return newConfig;
};
