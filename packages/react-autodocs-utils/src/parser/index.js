/* global Promise */

const followExports = require('../follow-exports');
const followProps = require('../follow-props');
const parseJSDoc = require('../parse-jsdoc');

const parser = ({ source, path }) =>
  followExports(source, path)
    .then(followProps)
    .then(async metadata => ({
      ...metadata,
      props: await parseJSDoc(metadata.props),
    }));

module.exports = parser;
