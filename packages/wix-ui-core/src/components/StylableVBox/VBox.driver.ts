import {StylableDOMUtil} from 'stylable/test-utils';
import style from './VBox.st.css';

export const vboxDriverFactory = ({element}) => {
  const stylableDOMUtil = new StylableDOMUtil(style);

  return {
    /** check if element exists */
    exists: () => !!element,
    /** get the rendered content */
    getChildren: () => element.innerHTML
  };
};
