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

export interface ElementProps { children: any; }
export const createComponentThatRendersItsChildren = displayName => {
  const Element: React.SFC<ElementProps> = ({children}) => children;
  Element.displayName = displayName;
  return Element;
};

export function waitFor(fn, timeout, message) {
    let elapsed = 0;

    return new Promise((resolve, reject) => {
        function recur() {
            if (fn()) {
                return resolve();
            }

            if (elapsed > timeout) {
              return reject(message || 'timeout');
            }

          setTimeout(() => {
                elapsed += 10;
                recur();
            }, 10);
        }

        recur();
    });
}
