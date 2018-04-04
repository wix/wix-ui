import * as React from 'react';
import {Direction} from './HBox';

export function addSpacing (children, spacing: number, dir?: Direction) {
  if (!children || !spacing) {
    return children;
  }

  const spacedChildren = [];
  const marginProperty = dir === 'rtl' ? 'marginLeft' : 'marginRight';

  for (let i = 0; i < children.length - 1; i++) {
    spacedChildren.push(
      React.cloneElement(children[i], {style: {[marginProperty]: spacing}})
    );
  }

  spacedChildren.push(children[children.length - 1]);

  return spacedChildren;
}
