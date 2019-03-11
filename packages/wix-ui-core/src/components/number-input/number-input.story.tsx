import {NumberInput} from './';

export default {
  category: 'Components',
  storyName: 'NumberInput',
  component: NumberInput,
  componentPath: './number-input.tsx',
  componentProps: {
    value: 20,
    'data-hook': 'storybook-button'
  },
  exampleProps: {
    onClick: () => 'Clicked!',
  }
}