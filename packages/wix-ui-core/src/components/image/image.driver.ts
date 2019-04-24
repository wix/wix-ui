export * from './image.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/unidriver-dep-log-wrapper';
import { imageDriverFactory as original } from './image.uni.driver';
export const imageDriverFactory = unidriverDepLogWrapper(original);
