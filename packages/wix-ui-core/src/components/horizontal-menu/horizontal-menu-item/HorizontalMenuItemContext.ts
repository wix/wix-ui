import * as React from 'react';

export interface HorizontalMenuItemContextValue {
  isOpen: boolean;
  getMenuItemOffsetLeft(): number;
  getMenuItemBoundingRect(key: string): number;
  getMenuBoundingRect(key: string): number;
}

export const HorizontalMenuItemContext = React.createContext<
  HorizontalMenuItemContextValue
>({
  isOpen: false,
  getMenuItemOffsetLeft: () => 0,
  getMenuItemBoundingRect: () => 0,
  getMenuBoundingRect: () => 0,
});
