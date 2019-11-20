import * as React from 'react';

import { ExpandSize } from './HorizontalMenuLayout';

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
  const { current } = layoutRef;

  if (!current) {
    return {};
  }

  const menuItemWidth = getMenuItemBoundingRect('width');
  const menuItemLeft = getMenuItemBoundingRect('left');
  const menuItemHeight = getMenuItemBoundingRect('height');
  const menuItemY = getMenuItemBoundingRect('y');
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
        return { left: 0, maxWidth: `${maxOverflowWidth}px` };
      }

      const leftOrRight =
        menuItemLeft + layoutWidth >= documentWidth ? 'right' : 'left';

      const isSubmenuOverflows = menuItemWidth < layoutWidth;

      const stylesObject = {
        maxWidth: isSubmenuOverflows ? `${maxOverflowWidth}px` : undefined,
        [leftOrRight]: 0,
        [topOrBottom]: '100%',
      };

      return stylesObject;

    case 'menu':
      const menuItemOffsetLeft = getMenuItemOffsetLeft();
      const menuWidth = getMenuBoundingRect('width');

      return {
        left: -menuItemOffsetLeft,
        right: -(menuWidth - menuItemWidth - menuItemOffsetLeft),
        [topOrBottom]: '100%',
      };

    case 'fullWidth':
      const windowInnerWidth = window.innerWidth;
      const scrollbarWidth = windowInnerWidth - documentWidth;
      const right =
        windowInnerWidth - scrollbarWidth - menuItemLeft - menuItemWidth;

      return { left: -menuItemLeft, right: -right, [topOrBottom]: '100%' };

    default:
      return {};
  }
}
