import { Input } from '../../src/components/input';
import { Category } from '../utils';

export default {
  category: Category.COMPONENTS,
  storyName: 'Input',

  component: Input,
  componentPath: '../../src/components/input',

  componentProps: setState => ({
    'data-hook': 'storybook-input',
    value: '',
    onChange: ({ target: { value } }) => setState({ value }),
    onFocus: () => null,
  }),

  exampleProps: {
    onClick: () => 'Triggered onClick',
    onChange: () => 'Triggered onChange',
    onDoubleClick: () => 'Triggered onDoubleClick',
    onBlur: () => 'Triggered onBlur',
    onFocus: () => 'Triggered onFocus',
    onKeyDown: () => 'Triggered onKeyDown',
    onKeyUp: () => 'Triggered onKeyUp',
  },
};
