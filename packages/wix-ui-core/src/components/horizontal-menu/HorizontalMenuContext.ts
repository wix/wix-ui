import * as React from 'react';

export interface HorizontalMenuContextValue {
  menuItemClassName: string;
  columnsLayoutClassName: string;
  gridLayoutClassName: string;
}

export const HorizontalMenuContext = React.createContext<
  HorizontalMenuContextValue
>({
  menuItemClassName: '',
  columnsLayoutClassName: '',
  gridLayoutClassName: '',
});
