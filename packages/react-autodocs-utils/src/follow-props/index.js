/* global Promise */

const { join: pathJoin, dirname: pathDirname } = require('path');
const { reactDocgenParse } = require('../parser/react-docgen-parse');

const readFile = require('../read-file');
const followExports = require('../follow-exports');
const resolveNodeModules = require('../resolve-node-modules');

const parseDocgen = (source, path) =>
  new Promise((resolve, reject) => {
    const parsed = reactDocgenParse({ source, path });

    return parsed.composes
      ? reject(parsed) // we'll handle composed props in catch
      : resolve(parsed);
  });

const mergeComponentProps = components =>
  components.reduce(
    (acc, component) => ({
      ...component.props,
      ...acc,
    }),
    {}
  );

const followComposedProps = (parsed, currentPath) =>
  Promise.all(
    parsed.composes.map(composedPath => {
      const readablePathPromise = composedPath.startsWith('.')
        ? Promise.resolve(pathJoin(pathDirname(currentPath), composedPath))
        : resolveNodeModules(currentPath, composedPath.replace(/(dist\/|standalone\/)/g, ''));

      return readablePathPromise.then(readFile);
    })
  )

    .then(composedSourcesAndPaths =>
      Promise.all(composedSourcesAndPaths.map(({ source, path }) => followExports(source, path)))
    )

    .then(composedSourcesAndPaths =>
      Promise.all(
        composedSourcesAndPaths.map(({ source, path }) => ({
          parsed: reactDocgenParse({ source, path }),
          path,
        }))
      )
    )

    .then(parsedComponents => {
      // here we receive list of object containing parsed component
      // props. some of them may contain composed props from other
      // components, in which case we followProps again recursively

      const withComposed = parsedComponents
        .filter(({ parsed }) => parsed.composes)
        .map(({ parsed, path }) => followComposedProps(parsed, path));

      const withoutComposed = parsedComponents
        .filter(({ parsed }) => !parsed.composes)
        .map(({ parsed }) => Promise.resolve(parsed));

      return Promise.all([Promise.all(withComposed), Promise.all(withoutComposed)]).then(
        ([withComposed, withoutComposed]) => [...withComposed, ...withoutComposed]
      );
    })

    .then(mergeComponentProps)

    .then(composedProps => {
      const allProps = {
        ...parsed,
        props: { ...parsed.props, ...composedProps },
      };

      // eslint-disable-next-line no-unused-vars
      const { composes, ...otherProps } = allProps;

      return otherProps;
    });

const followProps = ({ source, path }) =>
  parseDocgen(source, path)
    // if resolved, no need to follow props, no need for .then
    // if rejected, need to follow props
    .catch(parsed => followComposedProps(parsed, path))
    .catch(e => console.log(`ERROR: Unable to handle composed props for Component at ${path}`, e));

module.exports = followProps;
