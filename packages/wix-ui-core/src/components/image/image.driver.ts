import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';

export interface ImageDriver extends BaseUniDriver{
  // isImageLoaded: () => Promise<boolean>;
}

export const imageDriverFactory = (base: UniDriver): ImageDriver => {

  return {
    ...baseUniDriverFactory(base),
    // isImageLoaded: async () => ((await base.attr('loaded')) === 'true')
  }
};
