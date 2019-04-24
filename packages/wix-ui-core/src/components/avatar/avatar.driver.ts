export * from './avatar.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/unidriver-dep-log-wrapper';
import { avatarDriverFactory as original } from './avatar.uni.driver';
export const avatarDriverFactory = unidriverDepLogWrapper(
  original,
  'avatarDriverFactory',
);
