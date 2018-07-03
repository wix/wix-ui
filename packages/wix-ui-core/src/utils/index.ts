import * as React from 'react';

export const buildChildrenObject = <T>(children: React.ReactNode, childrenObject: T) => {
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

export interface ElementProps { children: any; }
export const createComponentThatRendersItsChildren = (displayName: string) => {
  const Element: React.SFC<ElementProps> = ({children}) => children;
  Element.displayName = displayName;
  return Element;
};

export const noop = () => null;

export const isReactElement = <T>(
  child: any,
  Element: React.ComponentType<T>
): child is React.ReactElement<T> => {
  return child && child.type === Element;
}
