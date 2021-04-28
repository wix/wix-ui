const { default: InjectPlugin, ENTRY_ORDER } = require('webpack-inject-plugin');

const storyPattern = /\.story\.[j|t]sx?$/;
const propTypesParserInjector = () => "import 'wix-storybook-utils/propTypesParser';";

class WixStorybookWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { storyConfig } = this.options;

    compiler.hooks.compilation.tap('WixStorybookWebpackPlugin', compilation => {

      compilation.hooks.normalModuleLoader.tap('WixStorybookWebpackPlugin', (_, module) => {

        if (storyPattern.test(module.userRequest)) {
          module.loaders.push({
            loader: require.resolve('../loader/index.js'),
            options: { storyConfig },
          });
        }
      });
    });

    new InjectPlugin(propTypesParserInjector, { entryOrder: ENTRY_ORDER.First }).apply(compiler);
  }
}

module.exports = WixStorybookWebpackPlugin;
