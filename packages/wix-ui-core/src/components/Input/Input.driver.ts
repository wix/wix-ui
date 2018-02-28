export const inputDriverFactory = ({element, eventTrigger}) => ({
  /** checks if element exists */
  exists: () => !!element,
  /** returns if the element is disabled */
  isDisabled: () => element.disabled,
  /** returns if the element is focused */
  isFocus: () => document.activeElement === element,
  /** returns if the element is readOnly */
  isReadOnly: () => element.readOnly,
  /** returns the placeholder text */
  getPlaceholder: () => element.placeholder,
  /** returns the autocomplete value */
  getAutocomplete: () => element.getAttribute('autocomplete'),
  /** returns if the element is required */
  isRequired: () => element.required,
  /** blurs the element */
  blur: () => eventTrigger.blur(element),
  /** triggers the click event on the element */
  click: () => eventTrigger.click(element),
  /** triggers the double clicks event on the element */
  doubleClick: () => eventTrigger.doubleClick(element),
  /** focuses the element */
  focus: () => eventTrigger.focus(element),
  /** triggers the keyDown event */
  keyDown: key => eventTrigger.keyDown(element, {key}),
  /** triggers the keyUp event */
  keyUp: () => eventTrigger.keyUp(element),
  /** returns the element tab index */
  getTabIndex: () => element.tabIndex,
  /** returns the element's type attribute */
  getType: () => element.type,
  /** returns the element's value */
  getValue: () => element.value,
  /** sets the element's value */
  setValue: value => {
    element.value = value;
    eventTrigger.change(element);
  }
});
