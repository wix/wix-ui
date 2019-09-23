const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '../src/testkit/puppeteer.ts'),
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '../dist/src/testkit'),
    filename: 'puppeteer-testkit-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  plugins: [
    // Puppeteer drivers don't use styles, so we want to ignore them
    // by replacing them with empty objects
    new webpack.NormalModuleReplacementPlugin(
      /\.(s?css)$/,
      path.join(__dirname, './fake-style-module.js'),
    ),
  ],
  mode: 'development',
  devtool: false, // the default is `eval` in development mode, which may be harder to debug
};
