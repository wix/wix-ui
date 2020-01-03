import * as React from 'react';

import { ExpandSize } from '../horizontal-menu-item/HorizontalMenuItem';

export interface CalculatePositioningProps {
  expandSize: ExpandSize;
  getMenuBoundingRect(key: string): number;
  getMenuItemBoundingRect(key: string): number;
  layoutRef: React.RefObject<HTMLDivElement>;
  maxOverflowWidth: number;
}

const MAX_SINGLE_COLUMN_OVERFLOW_WIDTH = 280;

export function calculatePositioning({
  expandSize,
  layoutRef,
  maxOverflowWidth = MAX_SINGLE_COLUMN_OVERFLOW_WIDTH,
  getMenuBoundingRect,
  getMenuItemBoundingRect,
}: CalculatePositioningProps) {
  const { current } = layoutRef;

  if (!current) {
    return {};
  }

  const menuItemWidth = getMenuItemBoundingRect('width');
  const menuItemHeight = getMenuItemBoundingRect('height');
  const menuItemY = getMenuItemBoundingRect('y');
  const menuLeft = getMenuBoundingRect('left');
  const menuWidth = getMenuBoundingRect('width');
  const documentWidth = document.documentElement.clientWidth;

  const {
    width: layoutWidth,
    height: layoutHeight,
  } = current.getBoundingClientRect();

  const topOrBottom =
    menuItemY + menuItemHeight + layoutHeight > window.innerHeight &&
    menuItemY - layoutHeight >= 0
      ? 'bottom'
      : 'top';

  switch (expandSize) {
    case 'column':
      if (menuItemWidth >= maxOverflowWidth) {
        return {
          left: 0,
          right: 0,
          [topOrBottom]: '100%',
          maxWidth: `${maxOverflowWidth}px`,
        };
      }

      const isSubmenuOverflows = menuItemWidth < layoutWidth;

      const stylesObject = {
        left: 0,
        right: 0,
        [topOrBottom]: '100%',
        maxWidth: isSubmenuOverflows ? `${maxOverflowWidth}px` : undefined,
      };

      return stylesObject;

    case 'menu':
      return {
        left: 0,
        right: 0,
        [topOrBottom]: '100%',
      };

    case 'fullWidth':
      const windowInnerWidth = window.innerWidth;
      const scrollbarWidth = windowInnerWidth - documentWidth;
      const right = windowInnerWidth - scrollbarWidth - menuLeft - menuWidth;

      return { left: -menuLeft, right: -right, [topOrBottom]: '100%' };

    default:
      return {};
  }
}
