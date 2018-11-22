import {Label} from '../src/components/deprecated/Label';

export default {
  category: 'Components',
  storyName: 'Label',

  component: Label,
  componentPath: '../src/components/deprecated/Label/Label.tsx',

  componentProps: {
    'data-hook': 'storybook-label',
    children: 'hello',
    ellipsis: false
  }
};
