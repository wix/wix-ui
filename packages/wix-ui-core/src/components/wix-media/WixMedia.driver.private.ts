import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import style from '../image/image.st.css';

export interface WixMediaDriver extends BaseUniDriver {
  getSrc(): Promise<string | null>;
  getAlt(): Promise<string>;
  getLoadStatus(): Promise<string>;
}

export const wixMediaDriverFactory = (base: UniDriver): WixMediaDriver => {
  const getStyleState = async (styleState: string) => {
    const el = (await base.getNative()) as Element;
    const domUtils = new StylableDOMUtil(style, el);
    return domUtils.getStyleState(el, styleState);
  };

  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getAlt: () => base.attr('alt'),
    getLoadStatus: () => getStyleState('loadState'),
  };
};
