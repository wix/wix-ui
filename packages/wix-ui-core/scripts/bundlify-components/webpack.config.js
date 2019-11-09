/* eslint no-console: 0 */

const path = require('path');

const { tryRequire } = require('yoshi-helpers/utils');
const { createClientWebpackConfig } = require('yoshi/config/webpack.config');

const config = createClientWebpackConfig({ isDebug: false });

const ROOT_DIR = process.cwd();
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const components_meta = require(resolvePath('.wuf/components.json'));

const components = Object.keys(components_meta).reduce(
  (accu, comp) => ({
    ...accu,
    [comp]: `${components_meta[comp].path.replace('src/', '')}/index.ts`,
  }),
  {},
);

module.exports.defaultConfig = {
  ...config,
  entry: {
    ...components,
  },
  devtool: 'source-map',
  externals: {
    react: 'react',
    'react-dom': 'reactDOM',
    'prop-types': 'propTypes',
    'react-is': 'react-is',
  },
  output: {
    filename: '[name].js',
    path: resolvePath('bundles'),
  },
  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.(scss|sass)$/,
        loader: 'yoshi-style-dependencies/sass-loader',
        options: {
          sourceMap: true,
          implementation: tryRequire('yoshi-style-dependencies/node-sass'),
          includePaths: ['node_modules', 'node_modules/compass-mixins/lib'],
        },
      },
    ],
  },
  plugins: [...config.plugins],
};
