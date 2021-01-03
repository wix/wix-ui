import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  MediaImageDriver as ImagePublicDriver,
  mediaImageDriverFactory as publicMediaImageDriverFactory,
} from './media-image.uni.driver';

export interface MediaImageDriver extends ImagePublicDriver {
  hasClass(className: string): Promise<boolean>;
}

export const mediaImageDriverFactory = (base: UniDriver): MediaImageDriver => {
  const publicDriver = publicMediaImageDriverFactory(base);

  return {
    ...publicDriver,
    hasClass: className => base.hasClass(className),
  };
};
