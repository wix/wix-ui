import {Button} from '../../src/components/Button';
import style from './style.st.css';

export default {
  category: 'Components',
  storyName: 'Button',
  component: Button,
  componentPath: '../../src/components/Button/Button.tsx',

  componentProps: {
    ...style('root'),
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
