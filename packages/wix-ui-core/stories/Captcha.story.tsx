import * as React from 'react';

import {Captcha} from '../src/components/captcha';
import {ExampleLoader} from '../src/components/captcha/test-assets/ExampleLoader';
import {Size, CaptchaType, Theme, CaptchaLang} from '../src/components/captcha/types';
import {CaptchaTestComponent} from '../src/components/captcha/test-assets/CaptchaTestComponent';

const demoSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export default {
  category: 'Components',
  storyName: 'Captcha',
  component: Captcha,
  componentPath: '../src/components/captcha/Captcha.tsx',

  componentProps: {
    sitekey: demoSiteKey,
    size: Size.normal,
    type: CaptchaType.image,
    theme: Theme.light,
    lang:CaptchaLang.EnglishUS,
    loader: <ExampleLoader/>,
    'data-hook': 'storybook-captcha',
  },

  exampleProps: {
    onVerify: token => token
  },

  examples: (
    <div>
      <h3>Tests</h3>
      <CaptchaTestComponent/>
    </div>
  )
};
