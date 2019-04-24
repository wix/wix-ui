export * from './Video.uni.driver';

import { unidriverDepLogWrapper } from '../../utils/deprecationLog';
import { videoDriverFactory as original } from './Video.uni.driver';
export const videoDriverFactory = unidriverDepLogWrapper(original);
