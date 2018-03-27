import * as React from 'react';

export function addSpacing (children, spacing: number, dir?: 'rtl' | 'ltr') {
  if (!children || !spacing) {
    return children;
  }

  const spacedChildren = [];
  const marginProperty = dir === 'rtl' ? 'marginLeft' : 'marginRight';

  for (let i = 0; i < children.length - 1; i++) {
    spacedChildren.push(
      <div style={{[marginProperty]: spacing}}>
        {children[i]}
      </div>
    );
  }

  spacedChildren.push(children[children.length - 1]);

  return spacedChildren;
}
