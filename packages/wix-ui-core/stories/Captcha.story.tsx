import * as React from 'react';

import {Captcha} from '../src/components/captcha';

export default {
  category: 'Components',
  storyName: 'Captcha',
  component: Captcha,
  componentPath: '../src/components/captcha/Captcha.tsx',

  componentProps: {
    sitekey: '6LdES1wUAAAAALhi9MkatrLPLjfAAgukePTZGpTH',
    'data-hook': 'storybook-captcha',
  },
  exampleProps: {
    onVerify: token => token
  }
};
