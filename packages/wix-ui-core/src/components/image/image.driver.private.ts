import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import style from './image.st.css';
import {
  imageDriverFactory as publicImageDriverFactory,
  ImageDriver as ImagePublicDriver,
} from './image.driver';

export interface ImageDriver extends ImagePublicDriver {
  getResizeMode(): Promise<string>;
  getSrcSet(): Promise<string>;
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
  };
};
