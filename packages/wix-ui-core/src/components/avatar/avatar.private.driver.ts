import { UniDriver } from "unidriver";
import {
  BaseUniDriver,
  baseUniDriverFactory
} from "wix-ui-test-utils/base-driver";

import { ContentType } from './types';

// TODO: make this common util (or in wix-ui-test-utils)
function getByDataHook(base: UniDriver, dataHook: string) {
  return base.$(`[data-hook="${dataHook}"]`);
}


export interface AvatarDriver extends BaseUniDriver {
  /** returns text content driver */
  isContentType: (type: ContentType) => Promise<boolean>;
  getTextContent: ()=> Promise<string>;
  getIconContent: ()=> UniDriver<HTMLElement>;
  getImageContent: ()=> UniDriver<HTMLImageElement>;
}

export const avatarDriverFactory = (base: UniDriver): AvatarDriver => {
  const byDataHook = dataHook => getByDataHook(base,dataHook);
  const getContentType = (type: ContentType) => byDataHook(`content-${type}`);

  return {
    ...baseUniDriverFactory(base),
    isContentType: (type: ContentType)=> getContentType(type).exists(),
    getTextContent: () => getContentType('text').text(),
    getIconContent: () => getContentType('icon').$(':first-child'),
    getImageContent: () => getContentType('image').$(':first-child'),
  };
};
