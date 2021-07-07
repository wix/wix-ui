const path = require('path');
const javascriptParser = require('react-docgen');
const typescriptParser = require('react-docgen-typescript');

const isTypescriptPath = require('../is-typescript-path');
const componentResolve = require('./component-resolve');

const ensurePropsKey = (object) => ({ props: {}, ...object });

const parseTypescript = ({ path, options }) =>
  ensurePropsKey(
    typescriptParser.parse(path, {
      propFilter: {
        skipPropsWithoutDoc: options.skipPropsWithoutDoc,
      },
    })[0] || {}
  ); // react-docgen-typescript returns array, so

const parseJavascript = ({ source = '', sourcePath = '', options = { skipPropsWithoutDoc: false } }) => {
  let parsed;

  try {
    parsed = javascriptParser.parse(source, componentResolve, null, {
      filename: path.basename(sourcePath),
    });
    if (options.skipPropsWithoutDoc) {
      parsed.props = Object.fromEntries(
        Object.entries(parsed.props).filter(([_, value]) => Boolean(value.description))
      );
    }
  } catch (e) {
    parsed = {};
  }

  return ensurePropsKey(parsed);
};

const reactDocgenParse = ({ source = '', path = '', options }) =>
  isTypescriptPath(path) ? parseTypescript({ path, options }) : parseJavascript({ source, path, options });

module.exports = { reactDocgenParse, parseJavascript, parseTypescript };
