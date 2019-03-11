import {NumberInput} from '../src/components/number-input'

export default {
  category: 'Components',
  storyName: 'NumberInput',

  component: NumberInput,
  componentPath: '../src/components/number-input/number-input.tsx',

  componentProps: {
    value: 20,
    'data-hook': 'storybook-button'
  },
  exampleProps: {
    onClick: () => 'Clicked!',
  }
}