import * as React from 'react';
import {CircularProgressBar} from '../../src/components/circular-progress-bar';
import {CircularProgressBarProps} from '../../src/components/circular-progress-bar/CircularProgressBar';
import style from './style.st.css';

export default {
  category: 'Components',
  name: 'CircularProgressBar',
  storyName: 'CircularProgressBar',
  component: CircularProgressBar,
  componentPath: '../../src/components/circular-progress-bar',

  componentProps: setState => ({
    ...style('root'),
    'data-hook': 'circular-progress-bar',
    value: 10,
    showProgressIndication: false,
    error: false
  }),
}
