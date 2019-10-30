import * as React from 'react';

import { ExpandSize } from './HorizontalMenuItem';

export interface HorizontalMenuItemContextValue {
  isOpen: boolean;
  expandSize: ExpandSize;
  getMenuItemOffsetLeft(): number;
  getMenuItemBoundingRect(key: string): number;
  getMenuBoundingRect(key: string): number;
}

export const HorizontalMenuItemContext = React.createContext<
  HorizontalMenuItemContextValue
>({
  isOpen: false,
  expandSize: 'column',
  getMenuItemOffsetLeft: () => 0,
  getMenuItemBoundingRect: () => 0,
  getMenuBoundingRect: () => 0,
});
