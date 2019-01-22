import * as React from 'react';

import {Captcha} from '../src/components/captcha';
import {Size, CaptchaType, Theme, CaptchaLang} from '../src/components/captcha/types';
import CaptchaTestInstance from '../src/components/captcha/captcha-test-instance';

const demoSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export default {
  category: 'WIP',
  storyName: 'Captcha',
  component: Captcha,
  componentPath: '../src/components/captcha/Captcha.tsx',

  componentProps: {
    sitekey: demoSiteKey,
    size: Size.normal,
    type: CaptchaType.image,
    theme: Theme.light,
    lang:CaptchaLang.EnglishUS,
    'data-hook': 'storybook-captcha',
  },

  exampleProps: {
    onVerify: token => token
  },

  examples: (
    <div>
      <h3>Tests</h3>
      <CaptchaTestInstance/>
    </div>
  )
};
