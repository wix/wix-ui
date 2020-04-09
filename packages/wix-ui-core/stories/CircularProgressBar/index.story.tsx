import { CircularProgressBar } from '../../src/components/circular-progress-bar';
import { classes } from './style.st.css';
import { Category } from '../utils';

export default {
  category: Category.COMPONENTS,
  name: 'CircularProgressBar',
  storyName: 'CircularProgressBar',
  component: CircularProgressBar,
  componentPath: '../../src/components/circular-progress-bar',

  componentProps: {
    className: classes.root,
    'data-hook': 'circular-progress-bar',
    value: 10,
    showProgressIndication: false,
    error: false,
  },
};
