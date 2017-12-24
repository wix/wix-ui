export const paginationDriverFactory = component => ({
  element: () => component,
  getNavButtonLocation: (btnName: 'first' | 'last' | 'previous' | 'next'): Promise<{ x: number, y: number }> =>
    component.$(`[data-hook="${btnName.toUpperCase()}"]`).getLocation()
});
