import { ButtonNext } from './';
import { Category } from '../../../stories/utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'ButtonNext',
  component: ButtonNext,
  componentPath: './button-next.tsx',

  componentProps: {
    disabled: false,
    children: `I'm a Button!`,
    'data-hook': 'storybook-button',
  },

  exampleProps: {
    onClick: () => 'Clicked!',
  },
};
