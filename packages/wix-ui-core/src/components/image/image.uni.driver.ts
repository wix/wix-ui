import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';

export interface ImageDriver extends BaseUniDriver {
  getSrc(): Promise<string | null>;
  getAlt(): Promise<string>;
  getLoadStatus(): Promise<string>;
}

export const imageDriverFactory = (base: UniDriver): ImageDriver => {
  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getAlt: () => base.attr('alt'),
    getLoadStatus: async () => base.attr('data-load-state'),
  };
};
