const getOptionAt = (element, index) => element.querySelectorAll('[data-hook="option"]')[index];

export const dropdownContentDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  optionAt: index => {
    const option = getOptionAt(element, index);
    return {
      click: () => eventTrigger.click(option),
      containsClass: className => option.className.includes(className)
    };
  }
});
