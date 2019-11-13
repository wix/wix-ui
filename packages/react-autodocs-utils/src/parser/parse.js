const babelParser = require('@babel/parser');

const parse = source =>
  babelParser.parse(source, {
    plugins: [
      ['decorators', { decoratorsBeforeExport: true }],
      'jsx',
      'typescript',
      'classProperties',
      'objectRestSpread',
      'dynamicImport',
    ],
    sourceType: 'module',
  });

module.exports = parse;
