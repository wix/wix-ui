import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Text.st.css';

export const textDriverFactory = ({element}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** check if component has ellipsis */
    isEllipsis: () => stylableDOMUtil.hasStyleState(element, 'ellipsis'),
    /** check if element has title attribute */
    hasTitleAttribute: () => element.getAttribute('title') !== null
  };
};
