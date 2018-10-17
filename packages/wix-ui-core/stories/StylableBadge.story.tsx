import {Badge} from '../src/components/deprecated/StylableBadge';

export default {
  category: 'Components',
  storyName: 'StylableBadge',
  component: Badge,
  componentPath: '../src/components/deprecated/StylableBadge/Badge.tsx',

  componentProps: {
    children: 'I\'m a Badge!',
    'data-hook': 'storybook-badge'
  }
};
