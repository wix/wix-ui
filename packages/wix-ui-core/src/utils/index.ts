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

export const attachStylesToNode = (node: Element, stylesObj) => {
  if (node) {
    stylesObj.className.split(' ')
      .forEach(className => node.classList.add(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => node.setAttribute(key, stylesObj[key]));
  }
};

export const detachStylesFromNode = (node: Element, stylesObj) => {
  if (node) {
    stylesObj.className.split(' ')
      .forEach(className => node.classList.remove(className));

    Object.keys(stylesObj)
      .filter(key => key.startsWith('data-'))
      .forEach(key => node.removeAttribute(key));
  }
};

export const noop = () => null;
