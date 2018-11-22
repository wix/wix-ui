import {Badge} from '../src/components/deprecated/stylable-badge';

export default {
  category: 'Components',
  storyName: 'StylableBadge',
  component: Badge,
  componentPath: '../src/components/deprecated/stylable-badge/Badge.tsx',

  componentProps: {
    children: 'I\'m a Badge!',
    'data-hook': 'storybook-badge'
  }
};
