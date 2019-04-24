export * from './menu-item.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/deprecationLog';
import { menuItemDriverFactory as original } from './menu-item.uni.driver';
export const menuItemDriverFactory = unidriverDepLogWrapper(original);
