import { UniDriver } from 'wix-ui-test-utils/unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory,
} from 'wix-ui-test-utils/base-driver';
import { StylableDOMUtilCompat } from '@stylable/dom-test-kit';
import style from './image.st.css';
import {
  imageDriverFactory as publicImageDriverFactory,
  ImageDriver as ImagePublicDriver,
} from './image.uni.driver';

export interface ImageDriver extends ImagePublicDriver {
  getResizeMode(): Promise<string>;
  getSrcSet(): Promise<string>;
}

export const imageDriverFactory = (base: UniDriver): ImageDriver => {
  const publicDriver = publicImageDriverFactory(base);

  const getStyleState = async (styleState: string) => {
    const el = (await base.getNative()) as Element;
    const domUtils = new StylableDOMUtilCompat(style, el);
    return domUtils.getStyleState(el, styleState);
  };

  return {
    ...publicDriver,
    getResizeMode: async () => getStyleState('resizeMode'),
    getSrcSet: () => base.attr('srcSet'),
  };
};
