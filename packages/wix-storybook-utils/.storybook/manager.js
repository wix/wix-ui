import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'wix-storybook-utils',
  brandUrl: 'https://github.com/wix/wix-ui/packages/wix-storybook-utils',
});

addons.setConfig({
  theme,
  showPanel: false,
  isFullscreen: false,
  storySort: undefined,
  isToolshown: true,
});
