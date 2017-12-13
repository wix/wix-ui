export const toggleSwitchDriverFactory = ({element, eventTrigger}) => {
  const toggleSwitch = element.querySelector('input');

  return {
    exists: () => !!element,
    click: () => eventTrigger.change(toggleSwitch),
    isChecked: () => toggleSwitch.checked,
    isDisabled: () => toggleSwitch.disabled
  };
};
