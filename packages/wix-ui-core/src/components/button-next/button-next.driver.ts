export * from './button-next.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/unidriver-dep-log-wrapper';
import { buttonNextDriverFactory as original } from './button-next.uni.driver';
export const buttonNextDriverFactory = unidriverDepLogWrapper(original);
