import { UniDriver } from 'wix-ui-test-utils/unidriver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import * as style from './image.st.css';
import {
  imageDriverFactory as publicImageDriverFactory,
  ImageDriver as ImagePublicDriver,
} from './image.uni.driver';

export interface ImageDriver extends ImagePublicDriver {
  getResizeMode(): Promise<string | boolean>;
  getSrcSet(): Promise<string>;
  hasClass(className: string): Promise<boolean>;
  getTagName(): Promise<string>;
}

export const imageDriverFactory = (base: UniDriver): ImageDriver => {
  const publicDriver = publicImageDriverFactory(base);

  const getStyleState = async (styleState: string) => {
    const el = (await base.getNative()) as Element;
    const domUtils = new StylableDOMUtil(style, el);
    return domUtils.getStyleState(el, styleState);
  };

  return {
    ...publicDriver,
    getResizeMode: async () => getStyleState('resizeMode'),
    getSrcSet: () => base.attr('srcSet'),
    hasClass: className => base.hasClass(className),
    getTagName: async () => (await base.getNative()).tagName,
  };
};
