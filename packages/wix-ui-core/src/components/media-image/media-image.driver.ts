export * from './media-image.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/unidriver-dep-log-wrapper';
import { mediaImageDriverFactory as original } from './media-image.uni.driver';
export const mediaImageDriverFactory = unidriverDepLogWrapper(
  original,
  'mediaImageDriverFactory',
);
