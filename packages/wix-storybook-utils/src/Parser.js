const recastParse = require('recast').parse;
const babylonParse = require('babylon').parse;

const _parser = {
  parse(code) {
    return babylonParse(code, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'flow',
        'estree',
        'doExpressions',
        'objectRestSpread',
        'decorators',
        'classProperties',
        'exportExtensions',
        'asyncGenerators',
        'functionBind',
        'functionSent',
        'dynamicImport',
        'templateInvalidEscapes'
      ]});
  }
};

module.exports = {
  parse(code) {
    return recastParse(code, {
      parser: _parser
    });
  }
};
