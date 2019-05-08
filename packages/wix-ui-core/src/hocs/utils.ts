export const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return;
  }

  return Component.displayName || Component.name || 'Component';
};
