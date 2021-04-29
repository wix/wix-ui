const storyPattern = /\.story\.[j|t]sx?$/;

class WixStorybookWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {

    compiler.hooks.compilation.tap('WixStorybookWebpackPlugin', compilation => {
      compilation.hooks.normalModuleLoader.tap('WixStorybookWebpackPlugin', (_, module) => {
        if (storyPattern.test(module.userRequest)) {
          module.loaders.push({
            loader: require.resolve('../loader/index.js'),
            options: { storyConfig: this.options },
          });
        }
      });
    });
  }
}
  
module.exports = WixStorybookWebpackPlugin;
