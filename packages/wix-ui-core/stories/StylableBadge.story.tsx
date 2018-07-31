import {Badge} from '../src/components/StylableBadge';

export default {
  category: 'Components',
  storyName: 'StylableBadge',
  component: Badge,
  componentPath: '../src/components/StylableBadge/Badge.tsx',

  componentProps: {
    children: 'I\'m a Badge!',
    'data-hook': 'storybook-badge',
    maxWidth: '120px'
  }
};
