import { element } from 'protractor';
import { UniDriver } from 'unidriver';
import {
  BaseUniDriver,
  baseUniDriverFactory
} from 'wix-ui-test-utils/base-driver';

export interface ImageDriver extends BaseUniDriver{
  getSrc: () => Promise<string | null>;
  getAlt: () => Promise<string>;
  // getHtmlElement: () => Promise<HTMLElement>;
}

export const imageDriverFactory = (base: UniDriver): ImageDriver => {

  return {
    ...baseUniDriverFactory(base),
    getSrc: () => base.attr('src'),
    getAlt: () => base.attr('alt')
  }

};
