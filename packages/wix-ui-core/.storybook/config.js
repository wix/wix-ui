import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

function loadStories() {
  require('../stories');
  require('./stories.scss');
}

const theme = create({
  base: 'light',
  brandTitle: 'wix-ui-core',
  brandUrl: 'https://github.com/wix/wix-ui-core',
});

addParameters({
  options: {
    theme,
    showPanel: false,
    isToolshown: true,
  },
});

configure(loadStories, module);
