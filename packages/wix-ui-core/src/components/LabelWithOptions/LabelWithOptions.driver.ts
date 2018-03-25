import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.driver';
import {labelDriverFactory} from '../Label/Label.driver';
import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './LabelWithOptions.st.css';

export const labelWithOptionsDriverFactory = (args) => {
  const dropdownDriver = dropdownDriverFactory(args);
  const labelElement = args.element.querySelector('[data-hook="label"]');
  const domUtils = new StylableDOMUtil(styles, labelElement);

  const labelDriver = labelDriverFactory({
    element: labelElement,
    eventTrigger: args.eventTrigger,
  });

  return Object.assign({}, dropdownDriver, labelDriver, {
    clickLabel: labelDriver.click,
    getSuffix: () => args.element.querySelector('[data-hook="suffix"]'),
    isRequired: () => domUtils.hasStyleState(labelElement, 'required'),
    isInvalid: () => domUtils.hasStyleState(labelElement, 'invalid'),
    isDisabled: () => domUtils.hasStyleState(labelElement, 'disabled')
  });
};
