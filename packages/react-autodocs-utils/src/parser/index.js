/* global Promise */

const followExports = require('../follow-exports');
const followProps = require('../follow-props');
const parseJSDoc = require('../parse-jsdoc');

const parser = ({ source, path, options }) =>
  followExports(source, path)
    .then(({ source, path }) => followProps({ source, path, options }))
    .then(async (metadata) => ({
      ...metadata,
      props: await parseJSDoc(metadata.props),
    }));

module.exports = parser;
