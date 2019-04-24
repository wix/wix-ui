export * from './media-image.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/deprecationLog';
import { mediaImageDriverFactory as original } from './media-image.uni.driver';
export const mediaImageDriverFactory = unidriverDepLogWrapper(original);
