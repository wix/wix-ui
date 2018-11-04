import { ButtonNext } from './';

export default {
  category: 'Components',
  storyName: 'ButtonNext',
  component: ButtonNext,
  componentPath: './button-next.tsx',

  componentProps: {
    disabled: false,
    children: 'I\'m a Button!',
    'data-hook': 'storybook-button'
  },

  exampleProps: {
    onClick: () => 'Clicked!'
  }
};
