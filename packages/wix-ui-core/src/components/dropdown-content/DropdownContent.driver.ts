import { dropdownOptionDriverFactory } from '../dropdown-option/DropdownOption.driver';

function getDropdownContentElement(element) {
  if (element.getAttribute('data-hook') === 'dropdown-content') {
    return element;
  }
  return element.querySelector('[data-hook="dropdown-content"]');
}

export const dropdownContentDriverFactory = ({ element, eventTrigger }) => {
  const getOptions = () => element.querySelectorAll('[data-hook="option"]');
  return {
    exists: () => !!element,
    getOptionsCount: () => getOptions().length,
    getSelectedOptionsCount: () =>
      Array.from(getOptions()).filter(option =>
        dropdownOptionDriverFactory({
          element: option,
          eventTrigger,
        }).isSelected(),
      ).length,
    optionAt: (index: number) => {
      const option = element ? getOptions()[index] : null;
      return dropdownOptionDriverFactory({ element: option, eventTrigger });
    },
    dropdownContentMouseDown: () => {
      const dropdownContentElement = getDropdownContentElement(element);
      return eventTrigger.mouseDown(dropdownContentElement);
    },
  };
};
