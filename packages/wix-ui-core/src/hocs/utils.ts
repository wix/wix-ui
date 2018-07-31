// these are taken from Recompose:
// https://github.com/acdlite/recompose/tree/7918e23eebb74dc930e6ff2d32eb1ead4750f061
//
// TODO: consider using the Recompose package

export const getDisplayName = Component => {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

export const wrapDisplayName = (BaseComponent, hocName) =>
  `${hocName}(${getDisplayName(BaseComponent)})`;

export const isStatelessComponent = Component => !(Component.prototype && Component.prototype.render);
