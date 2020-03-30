const path = require('path');

const ROOT_DIR = process.cwd();

const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const components_meta = require(resolvePath('../.wuf/components.json'));
const components = Object.keys(components_meta).reduce((accu, comp) => {
  return {
    ...accu,
    [comp]: `${components_meta[comp].path.replace(
      'src/',
      '../../dist/es/src/',
    )}/index`,
  };
}, {});

module.exports = {
  entry: {
    ...components,
  },
  externals: {
    react: 'react',
    'react-dom': 'reactDOM',
    'prop-types': 'propTypes',
    'react-is': 'react-is',
  },
};
