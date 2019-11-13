const path = require('path');
const javascriptParser = require('react-docgen');
const typescriptParser = require('react-docgen-typescript');

const isTypescriptPath = require('../is-typescript-path');
const componentResolve = require('./component-resolve');

const ensurePropsKey = object => ({ props: {}, ...object });

const parseTypescript = path => ensurePropsKey(typescriptParser.parse(path)[0] || {}); // react-docgen-typescript returns array, so

const parseJavascript = (source = '', sourcePath = '') => {
  let parsed;

  try {
    parsed = javascriptParser.parse(source, componentResolve, null, {
      filename: path.basename(sourcePath),
    });
  } catch (e) {
    parsed = {};
  }

  return ensurePropsKey(parsed);
};

const reactDocgenParse = ({ source = '', path = '' }) =>
  isTypescriptPath(path) ? parseTypescript(path) : parseJavascript(source, path);

module.exports = { reactDocgenParse, parseJavascript, parseTypescript };
