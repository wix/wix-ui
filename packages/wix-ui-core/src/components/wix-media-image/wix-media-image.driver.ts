import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { ImageStatus } from '../image';
import { ImageDriver, imageDriverFactory } from '../image/image.driver';

export interface WixMediaImageDriver extends ImageDriver {
  getSrc(): Promise<string | null>;
  getAlt(): Promise<string>;
  isLoaded(): Promise<boolean>;
  isError(): Promise<boolean>;
  isLoading(): Promise<boolean>;
}

export const wixMediaImageDriverFactory = (base: UniDriver): WixMediaImageDriver => {
  const imageDriver = imageDriverFactory(base);

  return {
    ...imageDriver,
    isLoaded: async () =>
      (await imageDriver.getLoadStatus()) === ImageStatus.loaded,
    isError: async () =>
      (await imageDriver.getLoadStatus()) === ImageStatus.error,
    isLoading: async () =>
      (await imageDriver.getLoadStatus()) === ImageStatus.loading,
  };
};
