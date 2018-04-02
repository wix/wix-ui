import {configure, storiesOf} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

function loadStories() {
  require('../stories/index.story.js');
  require('./stories.scss');
}

configure(loadStories, module);

setOptions({
  showDownPanel: false,
  name: 'wix-storybook-utils',
  url: 'https://github.com/wix/wix-ui/packages/wix-storybook-utils',
  sidebarAnimations: true
});
