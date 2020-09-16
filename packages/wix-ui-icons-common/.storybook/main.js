const path = require("path");
const merge = require("lodash/merge");
const wixStorybookConfig = require("yoshi/config/webpack.config.storybook");
const {
  createClientWebpackConfig,
  getStyleLoaders,
} = require("yoshi-flow-legacy/config/webpack.config.js");
const StylableWebpackPlugin = require("yoshi-common/build/@stylable/webpack-plugin")
  .default;

const webpackClientConfig = createClientWebpackConfig({
  isDebug: true,
  includeStyleLoaders: false,
});

const styleLoaders = getStyleLoaders({
  embedCss: true,
  isDebug: true,
  separateCss: false,
  isHmr: false,
  tpaStyle: false,
});

module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      context: path.resolve(__dirname, "..", "src"),
      resolve: {
        ...config.resolve,
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
        ...config.module,
        rules: [
          ...config.module.rules,
          ...styleLoaders,
          {
            test: /\.story\.tsx$/,
            loader: "wix-storybook-utils/loader",
            include: path.resolve(__dirname, "../"),
            options: {
              storyConfig: {
                moduleName: "wix-ui-icons-common",
                repoBaseURL:
                  "https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common/",
                issueURL: "https://github.com/wix/wix-ui/issues/new",
                importFormat: "import { %componentName } from '%moduleName'",
              },
            },
          },
        ],
      },
      plugins: [
        ...config.plugins,
        // ...webpackClientConfig.plugins,
        new StylableWebpackPlugin(),
      ],
      node: {
        ...config.node,
        fs: "empty",
        net: "empty",
        tls: "empty",
        __dirname: true,
      },
    };
  },
  stories: ["../stories/general/index.story", "../stories/system/index.story"],
};
