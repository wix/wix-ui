import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import style from '../image/image.st.css';
import { ImageStatus } from '../image';

export interface WixMediaImageDriver extends BaseUniDriver {
  getSrc(): Promise<string | null>;
  getAlt(): Promise<string>;
  isLoaded(): Promise<boolean>;
  isError(): Promise<boolean>;
  isLoading(): Promise<boolean>;
}

export const wixMediaImageDriverFactory = (base: UniDriver): WixMediaImageDriver => {
  const getStyleState = async (styleState: string) => {
    const el = (await base.getNative()) as Element;
    const domUtils = new StylableDOMUtil(style, el);
    return domUtils.getStyleState(el, styleState);
  };

  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getAlt: () => base.attr('alt'),
    isLoaded: async () =>
      (await getStyleState('loadState')) === ImageStatus.loaded,
    isError: async () =>
      (await getStyleState('loadState')) === ImageStatus.error,
    isLoading: async () =>
      (await getStyleState('loadState')) === ImageStatus.loading,
  };
};
