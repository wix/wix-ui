import {Label} from '../src/components/deprecated/label';

export default {
  category: 'Components',
  storyName: 'Label',

  component: Label,
  componentPath: '../src/components/deprecated/label/Label.tsx',

  componentProps: {
    'data-hook': 'storybook-label',
    children: 'hello',
    ellipsis: false
  }
};
