export const inputDriverFactory = ({element, eventTrigger}) => {
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
      eventTrigger.change(element);
    }
  };
};
