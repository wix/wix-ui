import * as React from 'react';

export const buildChildrenObject = (children, childrenObject) => {
  return React.Children.toArray(children).reduce((acc, child) => {
    if (!React.isValidElement(child)) {
      return acc;
    }

    if (!child.type || !child.type['displayName']) {
      return acc;
    }

    const name = child.type['displayName'].split('.').pop();
    acc[name] = child;
    return acc;
  }, childrenObject || {});
};

export const  generateDefaultComponent = displayName => {
  interface ElementProps { children: any; }
  const Element: React.SFC<ElementProps> = ({children}) => children;
  Element.displayName = displayName;
  return Element;
};
