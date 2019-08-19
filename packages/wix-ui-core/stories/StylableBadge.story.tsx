import { Badge } from '../src/components/deprecated/stylable-badge';
import { Category } from './utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'StylableBadge',
  component: Badge,
  componentPath: '../src/components/deprecated/stylable-badge/Badge.tsx',

  componentProps: {
    children: "I'm a Badge!",
    'data-hook': 'storybook-badge',
  },
};
