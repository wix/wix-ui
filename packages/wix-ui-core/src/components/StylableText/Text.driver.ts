import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Text.st.css';
import {BaseDriver, DriverFactory} from 'wix-ui-test-utils/driver-factory';

export interface TextDriver extends BaseDriver {
  hasEllipsis: () => boolean;
  hasTitleAttribute: () => boolean;
  getTitle: () => string;
  getTagName: () => string;
  getText: () => string;
}

export const textDriverFactory: DriverFactory<TextDriver> = ({element}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** check if component has ellipsis */
    hasEllipsis: () => stylableDOMUtil.hasStyleState(element, 'ellipsis'),
    /** check if element has title attribute */
    hasTitleAttribute: () => element.getAttribute('title') !== null,
    /** check if element has title attribute */
    getTitle: () => (element as HTMLElement).title,
    /** get the rendered tag name */
    getTagName: () => element.tagName.toLowerCase(),
    /** get the rendered content */
    getText: () => element.innerHTML
  };
};
