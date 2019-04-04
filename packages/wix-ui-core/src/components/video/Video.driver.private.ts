import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  videoDriverFactory as publicVideoDriver,
  IVideoDriver
} from './Video.driver';

export interface IVideoPrivateDriver extends IVideoDriver {
  getNative: () => Promise<any>;
  hasCover: () => Promise<boolean>;
  hasTitle: () => Promise<boolean>;
  getTitle: () => Promise<string>;
  getLogoSrc: () => Promise<string>;
  hasPlayButton: () => Promise<boolean>;
  getWidthDataAttr: () => Promise<string>;
  getHeightDataAttr: () => Promise<string>;
}

export const videoPrivateDriverFactory = (
  base: UniDriver
): IVideoPrivateDriver => {
  return {
    ...publicVideoDriver(base),
    getNative: async () => await base.getNative(),
    hasCover: async () => await base.$('[data-hook="cover"]').exists(),
    hasTitle: async () => await base.$('[data-hook="title"]').exists(),
    getTitle: async () => await base.$('[data-hook="title"]').text(),
    getLogoSrc: async () => await base.$('[data-hook="company-logo"]').attr('src'),
    hasPlayButton: async () => await base.$('[data-hook="play-button"]').exists(),
    getWidthDataAttr: async () => await base.$('[data-hook="player-container"]').attr('data-width'),
    getHeightDataAttr: async () => await base.$('[data-hook="player-container"]').attr('data-height'),
  };
};
