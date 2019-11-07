import { ClickOutside } from './';
import { Category } from '../../../stories/utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'ClickOutside',
  component: ClickOutside,
  componentPath: './ClickOutside.tsx',

  componentProps: {
    disabled: false,
    children: `I'm a Button!`,
    'data-hook': 'storybook-button',
  },

  exampleProps: {
    onClick: () => 'Clicked!',
  },
};
