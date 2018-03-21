export function addSpacing (children, spacing, direction: 'Right' | 'Bottom') {
  if (!children || !spacing) {
    return children;
  }

  const spacedChildren = [];
  for (let i = 0; i < children.length - 1; i++) {
    spacedChildren.push(
      <div style={{[`margin${direction}`]: spacing}}>
        {children[i]}
      </div>
    );
  }

  spacedChildren.push(children[children.length - 1]);

  return spacedChildren;
}