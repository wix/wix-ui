import * as React from 'react';

export function withStylable(
  root: JSX.Element | null | false,
  stylesheet: RuntimeStylesheet,
  stateMap: StateMap) {
  if (!root) { return null; }
  const className = root.props && root.props.className || '';
  const props = stylesheet(`root ${className}`.trim());
  return React.cloneElement(root, props);
}
