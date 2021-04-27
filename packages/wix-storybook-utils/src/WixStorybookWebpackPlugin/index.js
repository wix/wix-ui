class WixStorybookWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { test, loaderOptions } = this.options;

    compiler.hooks.compilation.tap('WixStorybookWebpackPlugin', compilation => {
      compilation.hooks.normalModuleLoader.tap('WixStorybookWebpackPlugin', (_, module) => {
        if (test.test(module.userRequest)) {
          module.loaders.push({
            loader: require.resolve('../loader/index.js'),
            options: loaderOptions,
          });
        }
      });
    });
  }
}
  
module.exports = WixStorybookWebpackPlugin;
