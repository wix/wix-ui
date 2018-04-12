const labelDriverFactory = (component, page) => ({
  click: () => component.click(),
  getLabelText: () => page.eval(_component => _component.innerText, component),
  element: () => component
});

export default labelDriverFactory;
