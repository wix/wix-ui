import * as React from 'react';
import {LinearProgressBar} from '../../src/components/linear-progress-bar';
import {LinearProgressBarProps} from '../../src/components/linear-progress-bar/LinearProgressBar';
import style from './style.st.css';

export default {
  category: 'Components',
  name: 'LinearProgressBar',
  storyName: 'LinearProgressBar',
  component: LinearProgressBar,
  componentPath: '../../src/components/linear-progress-bar',

  componentProps: setState => ({
    ...style('root'),
    'data-hook': 'progress-bar',
    value: 10,
    showProgressIndication: false,
    error: false
  }),
}
