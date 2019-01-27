import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import style from './image.st.css';

export interface ImageDriver extends BaseUniDriver {
  getSrc: () => Promise<string | null>;
  getAlt: () => Promise<string>;
  getResizeMode: () => Promise<string>;
  getLoadStatus: () => Promise<string>;
  getSrcSet: () => Promise<string>;
};

export const imageDriverFactory = (base: UniDriver): ImageDriver => {
  const getStyleState = async (styleState: string) => {
    const el = (await base.getNative()) as Element;
    const domUtils = new StylableDOMUtil(style, el);
    return domUtils.getStyleState(el, styleState)
  };

  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getAlt: () => base.attr('alt'),
    getResizeMode: async () => 
      getStyleState('resizeMode'),
    getLoadStatus: async () => 
      getStyleState('loadState'),
    getSrcSet: () => base.attr('srcSet'),
  };
};
