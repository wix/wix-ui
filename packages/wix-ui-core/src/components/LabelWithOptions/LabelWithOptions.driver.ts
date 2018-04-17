import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.driver';
import {labelDriverFactory} from '../Label/Label.driver';
import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './LabelWithOptions.st.css';

export const labelWithOptionsDriverFactory = (args) => {
  const dropdownDriver = dropdownDriverFactory(args);
  const labelElement = args.element.querySelector('[data-hook="label"]');
  const suffixElement = args.element.querySelector('[data-hook="suffix"]');
  const domUtils = new StylableDOMUtil(styles, labelElement);

  const labelDriver = labelDriverFactory({
    element: labelElement,
    eventTrigger: args.eventTrigger,
  });

  return Object.assign({}, dropdownDriver, labelDriver, {
    getSuffix: () => suffixElement,
    isRequired: () => domUtils.hasStyleState(args.element, 'required'),
    isError: () => domUtils.hasStyleState(args.element, 'error'),
    isDisabled: () => domUtils.hasStyleState(args.element, 'disabled')
  });
};
