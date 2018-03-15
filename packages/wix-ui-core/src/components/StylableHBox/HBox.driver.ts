import {StylableDOMUtil} from 'stylable/test-utils';
import style from './HBox.st.css';

export const hboxDriverFactory = ({element}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the rendered content */
    getChildren: () => element.innerHTML
  };
};
