const InjectPlugin = require('webpack-inject-plugin').default;

const storyPattern = /\.story\.[j|t]sx?$/;

function customLoader(options) {
  return () => {
    return "import classnames from 'classnames'; console.log(classnames);";
  };
}



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

    new InjectPlugin(customLoader(this.options)).apply(compiler);
  }
}
  
module.exports = WixStorybookWebpackPlugin;
