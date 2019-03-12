import {NumberInput} from './NumberInput'

export default {
  category: 'Components',
  storyName: 'NumberInput',

  component: NumberInput,
  componentPath: './NumberInput.tsx',

  componentProps: {
    value: 20,
    placeholder: 'Enter number',
    min: 4,
    max: 34,
    step: 2,
    'data-hook': 'storybook-button'
  },
  exampleProps: {
    onClick: () => 'Clicked!',
  }
}