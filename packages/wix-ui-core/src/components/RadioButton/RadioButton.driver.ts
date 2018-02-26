import styles from './RadioButton.st.css';
import {StylableDOMUtil} from 'stylable/test-utils';

export const radioButtonDriverFactory = ({element, eventTrigger}) => {
  const domUtils = new StylableDOMUtil(styles, element);

  const getInput = () => domUtils.select('.hiddenRadio');
  const getIcon = () => domUtils.select('.icon');
  const getLabel = () => domUtils.select('.label');

  return {
    exists: () => !!element,
    select: () => eventTrigger.change(element, {target: element}),
    value: () => getInput().getAttribute('value'),
    name: () => getInput().getAttribute('name'),
    isRequired: () => getInput().hasAttribute('required'),
    iconExists: () => !!getIcon(),
    labelExists: () => !!getLabel(),
    isChecked: () => domUtils.hasStyleState(element, 'checked'),
    isFocused: () => domUtils.hasStyleState(element, 'focused'),
    isDisabled: () => domUtils.hasStyleState(element, 'disabled')
  };
};
