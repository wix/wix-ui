import * as React from 'react';

export const getChildrenObject = (children, initialObject) => {
  return React.Children.toArray(children).reduce((acc, child) => {
    if (!React.isValidElement(child)) {
      return acc;
    }

    const name = child.type['displayName'].split('.').pop();
    acc[name] = child;
    return acc;
  }, initialObject);
};

export const  generateDefaultChildComponent = displayName => {
  interface ElementProps { children: any; }
  const Element: React.SFC<ElementProps> = ({children}) => children;
  Element.displayName = displayName;
  return Element;
};
