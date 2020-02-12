import * as React from 'react';
import { Omit } from 'type-zoo';

import { ExpandSize } from './HorizontalMenuItem';

export interface HorizontalMenuItemContextValue {
  isOpen: boolean;
  expandSize?: ExpandSize;
  getMenuItemBoundingRect(key: string): number;
  rootMenuRef: React.RefObject<HTMLUListElement>;
}

export interface WithHorizontalMenuItemContextProps {
  menuItemContext: HorizontalMenuItemContextValue;
}

export const HorizontalMenuItemContext = React.createContext<
  HorizontalMenuItemContextValue
>({
  isOpen: false,
  expandSize: 'column',
  getMenuItemBoundingRect: () => 0,
  rootMenuRef: React.createRef(),
});

export const withHorizontalMenuItemContext = <
  P extends WithHorizontalMenuItemContextProps
>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<Omit<P, keyof WithHorizontalMenuItemContextProps>> => props => (
  <HorizontalMenuItemContext.Consumer>
    {context => (
      <WrappedComponent
        {...((props as unknown) as P)}
        menuItemContext={context}
      />
    )}
  </HorizontalMenuItemContext.Consumer>
);
