const storybook = require('@storybook/react');

function loadStories() {
  require('../stories');
}

storybook.configure(loadStories, module);
