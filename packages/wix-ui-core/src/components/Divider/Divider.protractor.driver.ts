export const dividerDriverFactory = component => ({
    element: () => component,
    exists: () => !!component,
  });
