export const inputDriverFactory = component => {
  const input = component.$('input');

  return {
    element: () => component,
    enterText: text => input.clear().sendKeys(text),
    focus: () => input.click(),
    getText: () => input.getAttribute('value')
  };
};
