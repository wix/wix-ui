import * as React from 'react';

import { ExpandSize } from './HorizontalMenuItem';

export interface HorizontalMenuItemContextValue {
  isOpen: boolean;
  expandSize?: ExpandSize;
  getMenuItemBoundingRect(key: string): number;
  getMenuBoundingRect(key: string): number;
}

export const HorizontalMenuItemContext = React.createContext<
  HorizontalMenuItemContextValue
>({
  isOpen: false,
  expandSize: 'column',
  getMenuItemBoundingRect: () => 0,
  getMenuBoundingRect: () => 0,
});
