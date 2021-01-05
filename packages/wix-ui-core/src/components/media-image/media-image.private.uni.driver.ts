import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  MediaImageDriver as ImagePublicDriver,
  mediaImageDriverFactory as publicMediaImageDriverFactory,
} from './media-image.uni.driver';

export interface MediaImageDriver extends ImagePublicDriver {
  hasClass(className: string): Promise<boolean>;
  getWidthAttribute(): Promise<number>;
  getHeightAttribute(): Promise<number>;
}

const attributeToNumber = async (base, name) => Number(await base.attr(name));

export const mediaImageDriverFactory = (base: UniDriver): MediaImageDriver => {
  const publicDriver = publicMediaImageDriverFactory(base);

  return {
    ...publicDriver,
    hasClass: className => base.hasClass(className),
    getWidthAttribute: () => attributeToNumber(base, 'width'),
    getHeightAttribute: () => attributeToNumber(base, 'height'),
  };
};
