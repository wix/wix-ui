export const inputDriverFactory = component => ({
    element: () => component,
    enterText: text => component.clear().sendKeys(text),
    focus: () => component.click(),
    getText: () => component.getAttribute('value')
});
