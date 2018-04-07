import {Label} from '../src/components/Label';

export default {
  category: 'Components',
  storyName: 'Label',

  component: Label,
  componentPath: '../src/components/Label/Label.tsx',

  componentProps: {
    'data-hook': 'storybook-label',
    children: 'hello'
  }
};
