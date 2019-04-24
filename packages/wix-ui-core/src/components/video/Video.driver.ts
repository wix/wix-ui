export * from './Video.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/unidriver-dep-log-wrapper';
import { videoDriverFactory as original } from './Video.uni.driver';
export const videoDriverFactory = unidriverDepLogWrapper(
  original,
  'videoDriverFactory',
);
