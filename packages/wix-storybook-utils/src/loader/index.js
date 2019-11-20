const loaderUtils = require('loader-utils');
const path = require('path');

const pathFinder = require('react-autodocs-utils/src/path-finder');
const gatherAll = require('react-autodocs-utils/src/gather-all');
const metadataMerger = require('react-autodocs-utils/src/metadata-merger');
const prepareStory = require('react-autodocs-utils/src/prepare-story'); // TODO: should be part of wix-storybook-utils

const applyMetadataPlugins = (source, metadataPlugins) => metadata =>
  Promise.all(
    Object.values(metadataPlugins).map(plugin => plugin(source)),
  ).then(metaResults => {
    metadata = { ...(metadata || {}), plugins: {} };

    Object.keys(metadataPlugins).forEach((pluginName, index) => {
      metadata.plugins[pluginName] = metaResults[index];
    });

    return metadata;
  });

module.exports = function(source) {
  const callback = this.async();
  const { storyConfig, metadataPlugins = {} } = loaderUtils.getOptions(this);

  // 1. find component path
  pathFinder(source)
    .then(componentPath => {
      // 2. get component metadata
      const metadata = componentPath
        ? gatherAll(path.join(this.context, componentPath))
        : Promise.resolve({});

      return metadata
        .then(applyMetadataPlugins(source, metadataPlugins)) // 3. apply plugged in analyzers
        .then(metadataMerger(source)) // 4. merge component metadata with storybook config
        .then(prepareStory(storyConfig)); // 5. import and wrap with `story` function
    })
    // 5. succeed with augmented source
    .then(finalSource => callback(null, finalSource))

    // otherwise callback with error
    .catch(e => {
      console.log('ERROR: Failure within story loader', e);
      callback(e);
    });
};
