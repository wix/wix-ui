import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { ImageStatus } from '../image';
import { ImageDriver, imageDriverFactory } from '../image/image.driver';

export interface MediaImageDriver extends ImageDriver {
  isLoaded(): Promise<boolean>;
  isError(): Promise<boolean>;
  isLoading(): Promise<boolean>;
}

export const mediaImageDriverFactory = (base: UniDriver): MediaImageDriver => {
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
