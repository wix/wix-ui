import {Button} from '../src/components/deprecated/Button';

export default {
  category: 'Components',
  storyName: 'Button',
  component: Button,
  componentPath: '../src/components/deprecated/Button/Button.tsx',

  componentProps: {
    disabled: false,
    type: 'button',
    children: 'I\'m a Button!',
    'data-hook': 'storybook-button'
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    onMouseEnter: () => 'Mouse Enter!',
    onMouseLeave: () => 'Mouse Leave!',
  }
};
