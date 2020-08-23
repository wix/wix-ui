const merge = require("lodash/merge");
const path = require("path");
const wixStorybookConfig = require("yoshi/config/webpack.config.storybook");

module.exports = ({ config }) => {
  const newConfig = wixStorybookConfig(config);

  return merge(newConfig, {
    context: path.resolve(__dirname, "..", "src"),
    resolve: {
      alias: {
        "wix-ui-icons-common/system$": path.resolve(
          __dirname,
          "..",
          "src/system/dist/index.ts"
        ),
        "wix-ui-icons-common/system": path.resolve(
          __dirname,
          "..",
          "src/system/dist/components"
        ),
        "wix-ui-icons-common$": path.resolve(
          __dirname,
          "..",
          "src/general/dist/index.ts"
        ),
        "wix-ui-icons-common": path.resolve(
          __dirname,
          "..",
          "src/general/dist/components"
        ),
      },
    },
    module: {
      rules: newConfig.module.rules.concat({
        test: /\.story\.js$/,
        loader: "wix-storybook-utils/loader",
        options: {
          storyConfig: {
            moduleName: "wix-ui-icons-common",
            repoBaseURL:
              "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common/",
            issueURL: "https://github.com/wix/wix-ui/issues/new",
            importFormat: "import { %componentName } from '%moduleName'",
          },
        },
      }),
    },
  });
};
