import { UniDriver } from 'unidriver';
import {
  videoDriverFactory as publicVideoDriver,
  IVideoDriver,
} from './Video.driver';

export interface IVideoPrivateDriver extends IVideoDriver {
  getNative(): Promise<any>;
  hasCover(): Promise<boolean>;
  hasTitle(): Promise<boolean>;
  getTitle(): Promise<string>;
  getLogoSrc(): Promise<string>;
  hasPlayButton(): Promise<boolean>;
  getWidthDataAttr(): Promise<string>;
  getHeightDataAttr(): Promise<string>;
}

export const videoPrivateDriverFactory = (
  base: UniDriver,
): IVideoPrivateDriver => {
  return {
    ...publicVideoDriver(base),
    getNative: async () => base.getNative(),
    hasCover: async () => base.$('[data-hook="cover"]').exists(),
    hasTitle: async () => base.$('[data-hook="title"]').exists(),
    getTitle: async () => base.$('[data-hook="title"]').text(),
    getLogoSrc: async () => base.$('[data-hook="company-logo"]').attr('src'),
    hasPlayButton: async () => base.$('[data-hook="play-button"]').exists(),
    getWidthDataAttr: async () =>
      base.$('[data-hook="player-container"]').attr('data-width'),
    getHeightDataAttr: async () =>
      base.$('[data-hook="player-container"]').attr('data-height'),
  };
};
