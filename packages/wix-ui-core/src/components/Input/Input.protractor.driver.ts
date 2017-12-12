const inputDriverFactory = component => {
  const input = component.$('input');

  return {
    element: () => component,
    enterText: text => input.clear().sendKeys(text),
    getText: () => input.getAttribute('value')
  };
};

export default inputDriverFactory;
