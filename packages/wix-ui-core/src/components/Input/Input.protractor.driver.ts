const inputDriverFactory = component => {
  return {
    element: () => component,
    enterText: text => component.clear().sendKeys(text),
    getText: () => component.getAttribute('value')
  };
};

export default inputDriverFactory;
