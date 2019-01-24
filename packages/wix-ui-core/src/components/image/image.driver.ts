import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import style from './image.st.css';
import { ImageStatus } from './image';

export interface ImageDriver extends BaseUniDriver {
  getSrc: () => Promise<string | null>;
  getAlt: () => Promise<string>;
  getImageStyleState: (styleState: string | ImageStatus) => Promise<string>;
  getSrcSet: () => Promise<string>;
};

export const imageDriverFactory = (base: UniDriver): ImageDriver => {
  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getAlt: () => base.attr('alt'),
    getImageStyleState: async styleState => {
      const el = (await base.getNative()) as Element
      const domUtils = new StylableDOMUtil(style, el);
      return domUtils.getStyleState(el, styleState)
    },
    getSrcSet: () => base.attr('srcSet'),
  };
};
