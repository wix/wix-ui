import * as React from 'react';
import { Omit } from 'type-zoo';

export interface HorizontalMenuContextValue {
  menuItemClassName: string;
  columnsLayoutClassName: string;
  gridLayoutClassName: string;
  rootMenuRef: React.RefObject<HTMLUListElement>;
}

export interface WithHorizontalMenuContextProps {
  menuContext: HorizontalMenuContextValue;
}

export const HorizontalMenuContext = React.createContext<HorizontalMenuContextValue>(
  {
    menuItemClassName: '',
    columnsLayoutClassName: '',
    gridLayoutClassName: '',
    rootMenuRef: React.createRef(),
  },
);

export const withHorizontalMenuContext = <
  P extends WithHorizontalMenuContextProps
>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<Omit<P, keyof WithHorizontalMenuContextProps>> =>props => (
  <HorizontalMenuContext.Consumer>
    {context => (
      <WrappedComponent {...((props as unknown) as P)} menuContext={context} />
    )}
  </HorizontalMenuContext.Consumer>
);
