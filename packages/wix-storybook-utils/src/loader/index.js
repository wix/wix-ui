const loaderUtils = require('loader-utils');
const path = require('path');

const pathFinder = require('react-autodocs-utils/src/path-finder');
const gatherAll = require('react-autodocs-utils/src/gather-all');
const metadataMerger = require('react-autodocs-utils/src/metadata-merger');
const prepareStory = require('./prepareStory/prepareStory');

const applyPlugins = ({ plugins = [], source, basePath }) => (metadata = {}) =>
  plugins.reduce((promise, pluginPath) => {
    let plugin;

    try {
      plugin = require(pluginPath);
    } catch (e) {
      console.warn(
        `ERROR: could not require wix-storybook-utils plugin module "${pluginPath}"`,
      );

      return promise;
    }

    if (typeof plugin !== 'function') {
      console.warn(
        `ERROR: wix-storybook-utils plugin "${pluginPath}" is not a function`,
      );

      return promise;
    }

    return promise
      .then(
        async accumulatedMetadata =>
          (await plugin({ source, metadata: accumulatedMetadata, basePath }))
            .metadata,
      )
      .catch(e => {
        console.warn(
          `ERROR: failure with custom wix-storybook-utils plugin "${pluginPath}"`,
          e,
        );
        return promise;
      });
  }, Promise.resolve(metadata));

module.exports = function(source) {
  const callback = this.async();

  const { storyConfig, plugins } = loaderUtils.getOptions(this);
  // 1. find component path
  pathFinder(source)
    .then(componentPath => {
      // 2. get component metadata
      const metadata = componentPath
        ? gatherAll(
            path.join(this.context, componentPath),
            storyConfig.parserOptions,
          )
        : Promise.resolve({});

      return metadata
        .then(applyPlugins({ source, plugins, basePath: this.context })) // 3. apply plugged in analyzers
        .then(metadataMerger(source)) // 4. merge component metadata with storybook config
        .then(prepareStory(storyConfig, this.context)); // 5. import and wrap with `story` function
    })
    // 5. succeed with augmented source
    .then(finalSource => callback(null, finalSource))

    // otherwise callback with error
    .catch(e => {
      console.log('ERROR: Failure within story loader', e);
      callback(e);
    });
};
