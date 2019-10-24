import * as React from 'react';

export interface HorizontalMenuContextValue {
  menuItemClassName: string;
  columnsLayoutClassName: string;
  gridLayoutClassName: string;
  getMenuBoundingRect(key: string): number;
}

export const HorizontalMenuContext = React.createContext<
  HorizontalMenuContextValue
>({
  menuItemClassName: '',
  columnsLayoutClassName: '',
  gridLayoutClassName: '',
  getMenuBoundingRect: () => 0,
});
