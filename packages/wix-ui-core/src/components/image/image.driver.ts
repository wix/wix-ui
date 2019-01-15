import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';

export interface ImageDriver extends BaseUniDriver{
  getSrc: () => Promise<string | null>;
  getAlt: () => Promise<string>;
  getSrcSet: () => Promise<string>;
  simulateLoadingImageError: (timeout?: number) => Promise<void>;
  simulateLoadingImageSuccess: (timeout?: number) => Promise<void>;
}

export const imageDriverFactory = (base: UniDriver): ImageDriver => {
  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getSrcSet: () => base.attr('srcset'),
    getAlt: () => base.attr('alt'),
    
    simulateLoadingImageError: async (timeout = 0) => {
      return new Promise<void>(async resolve => {
        setTimeout(async () => {
          const nativeElement = (await base.getNative());
          
          nativeElement.dispatchEvent(new Event('error'));

          resolve();
        }, timeout)
      })
    },
    // simulateLoadingImageError: async (timeout = 0) => {
    //   setTimeout(async () => {
    //     const nativeElement = await base.$('');
        
    //     nativeElement. //.dispatchEvent(new Event('error'));
    //   }, timeout)
    // },

    simulateLoadingImageSuccess: async (timeout = 0) => {
      return new Promise<void>(async resolve => {
        setTimeout(async () => {
          const nativeElement = (await base.getNative());
          
          nativeElement.dispatchEvent(new Event('load'));

          resolve();
        }, timeout)
      })

    }
  }
};
