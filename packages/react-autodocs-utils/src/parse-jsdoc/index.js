/* global Promise */
const doctrine = require('doctrine');

const iterateProps = props => fn =>
  Object.entries(props).reduce(
    (finalProps, [propName, prop]) => ({
      ...finalProps,
      [propName]: fn(prop),
    }),
    {}
  );

const parseJSDoc = props =>
  new Promise(resolve => {
    const parsedProps = iterateProps(props)(prop => {
      const { description, tags } = doctrine.parse(prop.description || '', { unwrap: true });

      return tags.length ? { ...prop, description, tags } : prop;
    });

    resolve(parsedProps);
  });

module.exports = parseJSDoc;
