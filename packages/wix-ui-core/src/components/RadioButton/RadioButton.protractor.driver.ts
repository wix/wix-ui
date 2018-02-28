export const radioButtonDriverFactory = component => ({
  element: () => component,
  select: () => component.click(),
  isSelected: async () => {
    const checked = await component.getAttribute('aria-checked');
    return checked === 'true';
  }
});
