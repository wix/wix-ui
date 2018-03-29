import {Text} from '../src/components/StylableText';

export default {
  category: 'Components',
  storyName: 'StylableText',
  component: Text,
  componentPath: '../src/components/StylableText/Text.tsx',

  componentProps: {
    'data-hook': 'storybook-text',
    ellipsis: true,
    children: 'hello'
  }
};
