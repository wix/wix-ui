import { element } from 'protractor';
import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './image.st.css';

export interface ImageDriver extends BaseUniDriver{
  getSrc: () => Promise<string | null>;
  getAlt: () => Promise<string>;
  nativeElement: () => Promise<HTMLElement>
  resized: (el: Element) => string
  // getSrcSet: () => Promise<string>;
};

export const imageDriverFactory = (base: UniDriver): ImageDriver => {
  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getAlt: () => base.attr('alt'),
    nativeElement: async () => 
      (await base.getNative()) as HTMLElement,
    resized: el => {
      const domUtils = new StylableDOMUtil(style, el);
      return domUtils.getStyleState(el, 'resizeMode')
    },
  };
  // getSrcSet: () => base.attr('srcset'),
  };
