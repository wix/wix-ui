import * as React from 'react';

export const buildChildrenObject = <T>(children: Object, childrenObject: T) => {
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
  }, childrenObject || ({} as T));
};

export const createComponentThatRendersItsChildren = displayName => {
  interface ElementProps { children: any; }
  const Element: React.SFC<ElementProps> = ({children}) => children;
  Element.displayName = displayName;
  return Element;
};

export const getRandomInt = (min, max) =>  {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
