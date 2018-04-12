export const labelDriverFactory = (component, page) => ({
  click: () => component.click(),
  getLabelText: () => page.evaluate(_component => _component.innerText, component),
  element: () => component
});
