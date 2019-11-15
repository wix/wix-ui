import * as React from 'react';

import { HorizontalMenuItemContextValue } from '../horizontal-menu-item/HorizontalMenuItemContext';

const MAX_SINGLE_COLUMN_OVERFLOW_WIDTH = 280;

export function layoutLeftAndRightPositions(
  context: HorizontalMenuItemContextValue,
  layoutRef: React.RefObject<HTMLUListElement>,
  maxOverflowWidth = MAX_SINGLE_COLUMN_OVERFLOW_WIDTH,
) {
  const { expandSize } = context;
  const menuItemWidth = context.getMenuItemBoundingRect('width');

  switch (expandSize) {
    case 'column':
      const { current } = layoutRef;

      if (!current || menuItemWidth >= maxOverflowWidth) {
        return { left: 0, maxWidth: `${maxOverflowWidth}px` };
      }

      const { width: documentWidth } = document.body.getBoundingClientRect();

      current.style.visibility = 'hidden';
      current.style.display = 'block';

      const {
        width: layoutWidth,
        left: layoutLeft,
      } = current.getBoundingClientRect();

      current.style.visibility = '';
      current.style.display = '';

      const leftOrRight =
        layoutLeft + layoutWidth >= documentWidth ? 'right' : 'left';

      const isSubmenuOverlows = menuItemWidth < layoutWidth;

      const stylesObject = {
        width: isSubmenuOverlows ? undefined : '100%',
        maxWidth: isSubmenuOverlows ? `${maxOverflowWidth}px` : undefined,
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
      const menuItemLeft = context.getMenuItemBoundingRect('left');
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const right =
        window.innerWidth - scrollbarWidth - menuItemLeft - menuItemWidth;

      return { left: -menuItemLeft, right: -right };

    default:
      return {};
  }
}
