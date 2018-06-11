const loaderUtils = require('loader-utils');
const path = require('path');

const pathFinder = require('react-autodocs-utils/src/path-finder');
const gatherAll = require('react-autodocs-utils/src/gather-all');
const metadataMerger = require('react-autodocs-utils/src/metadata-merger');
const prepareStory = require('react-autodocs-utils/src/prepare-story'); // TODO: should be part of wix-storybook-utils


module.exports = function (source) {
  const callback = this.async();
  const {storyConfig} = loaderUtils.getOptions(this);

  // 1. find component path
  pathFinder(source)

    // 2. get component metadata
    .then(componentPath =>
      gatherAll(path.join(this.context, componentPath))
    )

    // 3. merge component metadata with storybook config
    .then(metadataMerger(source))

    // 4. import and wrap with `story` function
    .then(prepareStory(storyConfig))

    // 5. succeed with augmented source
    .then(finalSource => callback(null, finalSource))

    // otherwise callback with error
    .catch(e => {
      console.log('ERROR: Failure within story loader', e);
      callback(e);
    });
};
