export * from './Captcha.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/unidriver-dep-log-wrapper';
import { captchaDriverFactory as original } from './Captcha.uni.driver';
export const captchaDriverFactory = unidriverDepLogWrapper(
  original,
  'captchaDriverFactory',
);
