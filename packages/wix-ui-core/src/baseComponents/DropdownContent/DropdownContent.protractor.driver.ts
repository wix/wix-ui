export const dropdownContentDriverFactory = component => {
  return {
    element: () => component,
    selectOption: index => component.$$('[data-hook="option"]').get(index).click()
  };
};
