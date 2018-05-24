import {configure, storiesOf} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

function loadStories() {
  require('../stories');
  require('./stories.scss');
}

configure(loadStories, module);

setOptions({
  showDownPanel: false,
  name: 'wix-ui-core',
  url: 'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core',
  sidebarAnimations: true
});