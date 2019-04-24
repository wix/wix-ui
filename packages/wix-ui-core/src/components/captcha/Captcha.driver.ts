export * from './Captcha.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/deprecationLog';
import { captchaDriverFactory as original } from './Captcha.uni.driver';
export const captchaDriverFactory = unidriverDepLogWrapper(original);
