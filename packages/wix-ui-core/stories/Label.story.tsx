import {Label} from '../src/components/deprecated/label';
import {Category} from './utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'Label',

  component: Label,
  componentPath: '../src/components/deprecated/label/Label.tsx',

  componentProps: {
    'data-hook': 'storybook-label',
    children: 'hello',
    ellipsis: false
  }
};
