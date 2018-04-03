import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Text.st.css';

export const textDriverFactory = ({element}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** check if component has ellipsis */
    hasEllipsis: () => stylableDOMUtil.hasStyleState(element, 'ellipsis'),
    /** check if element has title attribute */
    hasTitleAttribute: () => element.getAttribute('title') !== null,
    /** check if element has title attribute */
    getTitle: () => element.title,
    /** get the rendered tag name */
    getTagName: () => element.tagName.toLowerCase(),
    /** get the rendered content */
    getText: () => element.innerHTML
  };
};
