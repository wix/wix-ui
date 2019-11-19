import * as React from 'react';

import { HorizontalMenuItemContextValue } from '../../horizontal-menu-item/HorizontalMenuItemContext';

export interface CalculatePositioningProps {
  context: HorizontalMenuItemContextValue;
  layoutRef: React.RefObject<HTMLUListElement>;
  maxOverflowWidth: number;
}

const MAX_SINGLE_COLUMN_OVERFLOW_WIDTH = 280;

export function calculatePositioning({
  context,
  layoutRef,
  maxOverflowWidth = MAX_SINGLE_COLUMN_OVERFLOW_WIDTH,
}: CalculatePositioningProps) {
  const { expandSize } = context;
  const menuItemWidth = context.getMenuItemBoundingRect('width');
  const menuItemLeft = context.getMenuItemBoundingRect('left');
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
        width: isSubmenuOverflows ? undefined : '100%',
        maxWidth: isSubmenuOverflows ? `${maxOverflowWidth}px` : undefined,
        [leftOrRight]: 0,
      };

      return stylesObject;

    case 'menu':
      const menuItemOffsetLeft = context.getMenuItemOffsetLeft();
      const menuWidth = context.getMenuBoundingRect('width');

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
