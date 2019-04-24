export * from './image.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/deprecationLog';
import { imageDriverFactory as original } from './image.uni.driver';
export const imageDriverFactory = unidriverDepLogWrapper(original);
