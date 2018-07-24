const path = require('path');
const glob = require('glob');
const StylableWebpackPlugin = require('stylable-webpack-plugin');

const packagePath = __dirname;
const metaGlob = 'src/**/*.meta.ts?(x)';

module.exports = {
  context: packagePath,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              declaration: false
            }
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /\.st\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  plugins: [
    new StylableWebpackPlugin()
  ]
};
