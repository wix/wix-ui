import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import { ContentType } from './types';

export interface AvatarDriver extends BaseUniDriver{
  /** Get the currently displayed type. Types are: 'text', 'icon', 'image'. It could be that the resolved type is 'image' but the currently displayed one is `text`. */
  getContentType: () => Promise<ContentType>;
  /** Get the text content (generated initials) */
  getTextContent: ()=> Promise<string>;
  /** Wether the image wass loaded */
  isImageLoaded: () => Promise<boolean>;
}

export const avatarDriverFactory = (base: UniDriver): AvatarDriver => {
  const getContentType = ()=> base.attr('data-content-type') as Promise<ContentType>;

  return {
    ...baseUniDriverFactory(base),
    getContentType,
    getTextContent: ()=> base.$('[data-hook="text-container"]').text(),
    isImageLoaded: async () => ((await base.attr('data-img-loaded')) === 'true')
  }
};
