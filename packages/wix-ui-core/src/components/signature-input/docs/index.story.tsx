import * as React from 'react';
import style from './style.st.css';
import {SignatureInput} from '../SignatureInput';

export default {
  category: 'Components',
  name: 'SignatureInput',
  storyName: 'SignatureInput',
  component: SignatureInput,
  componentPath: '../../src/components/signature-input',

  componentProps: setState => ({
    ...style('root'),
    'data-hook': 'signature-input',
  }),
};