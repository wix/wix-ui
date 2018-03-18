import {StylableDOMUtil} from 'stylable/test-utils';
import style from './Label.st.css';

export const labelDriverFactory = ({element}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the rendered content */
    getChildren: () => element.innerHTML,
    /** get the id of the component */
    getId: () => element.getAttribute('id'),
    /** get the "for" attribute of the component */
    getFor: () => element.getAttribute('for')
  };
};
