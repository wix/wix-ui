import * as React from 'react';
import {Thumbnail} from '../src/components/Thumbnail';
import Check from 'wix-ui-icons-common/Check';
export default {
  category: 'Components',
  storyName: 'Thumbnail',

  component: Thumbnail,
  componentPath: '../src/components/Thumbnail/Thumbnail.tsx',

  componentProps: {
    'data-hook': 'storybook-thumbnail',
    selectedIcon: <Check/>,
    children: <div>hello</div>
  }
};
