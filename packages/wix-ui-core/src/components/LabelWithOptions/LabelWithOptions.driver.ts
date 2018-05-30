import {dropdownDriverFactory} from '../../baseComponents/Dropdown/Dropdown.driver';
import {labelDriverFactory} from '../Label/Label.driver';
import {checkboxDriverFactory} from '../Checkbox/Checkbox.driver';
import {StylableDOMUtil} from 'stylable/test-utils';
import styles from './LabelWithOptions.st.css';

export const labelWithOptionsDriverFactory = ({element, eventTrigger}) => {
  const dropdownDriver = dropdownDriverFactory({element, eventTrigger});
  const labelElement = element.querySelector('[data-hook="label"]');
  const suffixElement = element.querySelector('[data-hook="suffix"]');
  const domUtils = new StylableDOMUtil(styles, element);

  const labelDriver = labelDriverFactory({
    element: labelElement,
    eventTrigger,
  });

  return Object.assign({}, dropdownDriver, labelDriver, {
    getSuffix: () => suffixElement,
    isRequired: () => domUtils.hasStyleState(element, 'required'),
    isError: () => domUtils.hasStyleState(element, 'error'),
    isDisabled: () => domUtils.hasStyleState(element, 'disabled'),
    checkboxDriverAt: (index: number) => {
      const checkbox = domUtils.selectAll('.checkbox')[index];
      return checkboxDriverFactory({element: checkbox, eventTrigger});
    },
  });
};
