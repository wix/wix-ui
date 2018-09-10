const wixStorybookConfig = require("yoshi/config/webpack.config.storybook");
const StylableWebpackPlugin = require("stylable-webpack-plugin");

module.exports = (config, env, defaultConfig) => {
  const newConfig = wixStorybookConfig(defaultConfig);

  newConfig.module.rules.push({
    test: /\.story\.[j|t]sx?$/,
    loader: "wix-storybook-utils/loader",
    options: {
      storyConfig: {
        moduleName: "wix-ui-core",
        repoBaseURL:
          "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core/src/components/",
        importFormat:
          "import {%componentName} from '%moduleName/%componentName'"
      }
    }
  });

  newConfig.plugins.push(
    new StylableWebpackPlugin({
      rootScope: false,
      optimize: {
        removeUnusedComponents: true
      }
    })
  );

  return newConfig;
};
