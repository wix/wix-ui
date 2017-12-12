import * as ReactTestUtils from 'react-dom/test-utils';

export const inputDriverFactory = ({element}) => {
  return {
    exists: () => !!element,
    isDisabled: () => element.disabled,
    isReadOnly: () => element.readOnly,
    getMaxLength: () => element.maxLength,
    getPlaceholder: () => element.placeholder,
    isRequired: () => element.required,
    getTabIndex: () => element.tabIndex,
    getType: () => element.type,
    getValue: () => element.value,
    setValue: value => {
      element.value = value;
      ReactTestUtils.Simulate.change(element);
    }
  };
};
