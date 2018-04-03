import * as React from 'react';

export function addSpacing (children, spacing: number) {
  if (!children || !spacing) {
    return children;
  }

  const spacedChildren = [];

  for (let i = 0; i < children.length - 1; i++) {
    spacedChildren.push(
      React.cloneElement(children[i], {style: {marginBottom: spacing}})
    );
  }

  spacedChildren.push(children[children.length - 1]);

  return spacedChildren;
}
