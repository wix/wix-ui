export * from './button-next.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/deprecationLog';
import { buttonNextDriverFactory as original } from './button-next.uni.driver';
export const buttonNextDriverFactory = unidriverDepLogWrapper(original);
