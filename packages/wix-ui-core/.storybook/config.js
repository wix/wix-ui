import {addParameters, configure} from '@storybook/react';
import {create} from '@storybook/theming';

function loadStories() {
    require('../stories');
    require('./stories.scss');
}


addParameters({
    options: {
        name: 'wix-ui-core',
        url: 'https://github.com/wix/wix-ui/tree/master/packages/wix-ui-core',
        showPanel: false,
        sidebarAnimations: true
    }
});

configure(loadStories, module);
