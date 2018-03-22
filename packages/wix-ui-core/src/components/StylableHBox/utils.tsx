import * as React from 'react';

export function addSpacing (children, spacing: number, dir?: 'rtl' | 'ltr') {
  if (!children || !spacing) {
    return children;
  }

  const spacedChildren = [];
  // const marginProperty = dir === 'rtl' ? 'marginLeft' : 'marginRight';

  // if (dir === 'rtl') {
  //   for (let i = children.length - 1; i > 0; i--) {
  //     spacedChildren.push(
  //       <div style={{marginLeft: spacing}}>
  //         {children[i]}
  //       </div>
  //     );
  //   }

  //   spacedChildren.push(children[0]);
  // } else {
    for (let i = 0; i < children.length - 1; i++) {
      spacedChildren.push(
        <div style={{marginRight: spacing}}>
          {children[i]}
        </div>
      );
    }

    spacedChildren.push(children[children.length - 1]);
  // }

  return spacedChildren;
}
