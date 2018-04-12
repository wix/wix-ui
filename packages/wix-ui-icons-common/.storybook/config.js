import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

setOptions({
  showAddonPanel: false,
  name: 'wix-ui-icons-common',
  url: 'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-icons-common'
});

configure(() => require('../stories'), module);
