export const inputDriverFactory = ({element, eventTrigger}) => {
  return {
    exists: () => !!element,
    isDisabled: () => element.disabled,
    isFocus: () => document.activeElement === element,
    isReadOnly: () => element.readOnly,
    getMaxLength: () => element.maxLength,
    getPlaceholder: () => element.placeholder,
    getAutocomplete: () => element.getAttribute('autocomplete'),
    isRequired: () => element.required,
    focus: () => eventTrigger.focus(element),
    getTabIndex: () => element.tabIndex,
    getType: () => element.type,
    getValue: () => element.value,
    setValue: value => {
      element.value = value;
      eventTrigger.change(element);
    }
  };
};
