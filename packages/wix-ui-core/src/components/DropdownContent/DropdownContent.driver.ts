import {dropdownOptionDriverFactory} from '../DropdownOption/DropdownOption.driver';

export const dropdownContentDriverFactory = ({element, eventTrigger}) => {
  const getOptions = () => element.querySelectorAll('[data-hook="option"]');
  return {
    exists: () => !!element,
    getOptionsCount: () => getOptions().length,
    getSelectedOptionsCount: () => (Array.from(getOptions())).filter(option => dropdownOptionDriverFactory({element: option, eventTrigger}).isSelected()).length,
    optionAt: (index: number) => {
      const option = element ? getOptions()[index] : null;
      return dropdownOptionDriverFactory({element: option, eventTrigger});
    }
  };
};
