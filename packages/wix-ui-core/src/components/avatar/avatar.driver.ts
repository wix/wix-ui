export * from './avatar.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/deprecationLog';
import { avatarDriverFactory as original } from './avatar.uni.driver';
export const avatarDriverFactory = unidriverDepLogWrapper(original);
