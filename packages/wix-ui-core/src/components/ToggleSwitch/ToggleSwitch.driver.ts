import * as ReactTestUtils from 'react-dom/test-utils';

export const toggleSwitchDriverFactory = ({element}) => {
  const toggleSwitch = element.querySelector('input');

  return {
    exists: () => !!element,
    click: () => ReactTestUtils.Simulate.change(toggleSwitch),
    isChecked: () => toggleSwitch.checked,
    isDisabled: () => toggleSwitch.disabled
  };
};
