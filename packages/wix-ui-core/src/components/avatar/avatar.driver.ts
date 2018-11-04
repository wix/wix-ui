import { UniDriver } from "unidriver";
import {
  BaseUniDriver,
  baseUniDriverFactory
} from "wix-ui-test-utils/base-driver";

import { ContentType } from './types';

export interface AvatarDriver extends BaseUniDriver {
  /** returns text content driver */
  isContentType: (type: ContentType) => Promise<boolean>;
  getTextContent: ()=> Promise<string>;
  getIconContent: ()=> UniDriver<HTMLElement>;
  getImageContent: ()=> UniDriver<HTMLImageElement>;
}

export const avatarDriverFactory = (base: UniDriver): AvatarDriver => {
  const byDataHook = dataHook => base.$(`[data-hook="${dataHook}"]`);
  const getContentType = (type: ContentType) => byDataHook(`content-${type}`);

  return {
    ...baseUniDriverFactory(base),
    isContentType: (type: ContentType)=> getContentType(type).exists(),
    getTextContent: () => getContentType('text').text(),
    getIconContent: () => getContentType('icon').$(':first-child'),
    getImageContent: () => getContentType('image').$(':first-child'),
  };
};
