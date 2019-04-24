export * from './menu-item.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/unidriver-dep-log-wrapper';
import { menuItemDriverFactory as original } from './menu-item.uni.driver';
export const menuItemDriverFactory = unidriverDepLogWrapper(original);
