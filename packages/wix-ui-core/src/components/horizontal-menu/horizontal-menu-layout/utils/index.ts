import * as React from 'react';

import { ExpandSize } from '../HorizontalMenuLayout';

export interface CalculatePositioningProps {
  expandSize: ExpandSize;
  getMenuBoundingRect(key: string): number;
  getMenuItemBoundingRect(key: string): number;
  getMenuItemOffsetLeft(): number;
  layoutRef: React.RefObject<HTMLUListElement>;
  maxOverflowWidth: number;
}

const MAX_SINGLE_COLUMN_OVERFLOW_WIDTH = 280;

export function calculatePositioning({
  expandSize,
  layoutRef,
  maxOverflowWidth = MAX_SINGLE_COLUMN_OVERFLOW_WIDTH,
  getMenuBoundingRect,
  getMenuItemBoundingRect,
  getMenuItemOffsetLeft,
}: CalculatePositioningProps) {
  const menuItemWidth = getMenuItemBoundingRect('width');
  const menuItemLeft = getMenuItemBoundingRect('left');
  const documentWidth = document.documentElement.clientWidth;

  switch (expandSize) {
    case 'column':
      const { current } = layoutRef;

      if (!current || menuItemWidth >= maxOverflowWidth) {
        return { left: 0, maxWidth: `${maxOverflowWidth}px` };
      }

      const { width: layoutWidth } = current.getBoundingClientRect();

      const leftOrRight =
        menuItemLeft + layoutWidth >= documentWidth ? 'right' : 'left';

      const isSubmenuOverflows = menuItemWidth < layoutWidth;

      const stylesObject = {
        maxWidth: isSubmenuOverflows ? `${maxOverflowWidth}px` : undefined,
        [leftOrRight]: 0,
      };

      return stylesObject;

    case 'menu':
      const menuItemOffsetLeft = getMenuItemOffsetLeft();
      const menuWidth = getMenuBoundingRect('width');

      return {
        left: -menuItemOffsetLeft,
        right: -(menuWidth - menuItemWidth - menuItemOffsetLeft),
      };

    case 'fullWidth':
      const windowInnerWidth = window.innerWidth;
      const scrollbarWidth = windowInnerWidth - documentWidth;
      const right =
        windowInnerWidth - scrollbarWidth - menuItemLeft - menuItemWidth;

      return { left: -menuItemLeft, right: -right };

    default:
      return {};
  }
}
