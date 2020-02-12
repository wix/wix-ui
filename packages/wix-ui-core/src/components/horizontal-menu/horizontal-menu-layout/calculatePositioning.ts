import * as React from 'react';

import { ExpandSize } from '../horizontal-menu-item/HorizontalMenuItem';

export interface CalculatePositioningProps {
  expandSize: ExpandSize;
  getMenuItemBoundingRect(key: string): number;
  rootMenuRef: React.RefObject<HTMLUListElement>;
  layoutRef: React.RefObject<HTMLDivElement>;
  maxOverflowWidth: number;
}

const MAX_SINGLE_COLUMN_OVERFLOW_WIDTH = 280;

function getNumberValue(value: string) {
  const number = parseInt(value, 10);
  return isFinite(number) ? number : 0;
}

export function calculatePositioning({
  expandSize,
  layoutRef,
  rootMenuRef,
  maxOverflowWidth = MAX_SINGLE_COLUMN_OVERFLOW_WIDTH,
  getMenuItemBoundingRect,
}: CalculatePositioningProps) {
  const { current: currentLayoutRef } = layoutRef;
  const { current: currentRootMenuRef } = rootMenuRef;

  if (!currentLayoutRef || !currentRootMenuRef) {
    return {};
  }

  const menuItemWidth = getMenuItemBoundingRect('width');
  const menuItemHeight = getMenuItemBoundingRect('height');
  const menuItemY = getMenuItemBoundingRect('y');

  const {
    left: menuLeft,
    width: menuWidth,
    height: menuHeight,
    y: menuY,
  } = currentRootMenuRef.getBoundingClientRect();
  const {
    borderTopWidth: menuBorderTopWidth,
    borderBottomWidth: menuBorderBottomWidth,
  } = getComputedStyle(currentRootMenuRef);
  const documentWidth = document.documentElement.clientWidth;

  const {
    width: layoutWidth,
    height: layoutHeight,
  } = currentLayoutRef.getBoundingClientRect();

  const topOrBottom =
    menuItemY + menuItemHeight + layoutHeight > window.innerHeight &&
    menuItemY - layoutHeight >= 0
      ? 'bottom'
      : 'top';

  const topValue =
    menuItemY - menuY + menuItemHeight - getNumberValue(menuBorderTopWidth);
  const bottomValue =
    menuHeight - (menuItemY - menuY) - getNumberValue(menuBorderBottomWidth);

  const verticalPosition = topOrBottom === 'top' ? topValue : bottomValue;

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
        [topOrBottom]: verticalPosition,
      };

    case 'fullWidth':
      const windowInnerWidth = window.innerWidth;
      const scrollbarWidth = windowInnerWidth - documentWidth;
      const right = windowInnerWidth - scrollbarWidth - menuLeft - menuWidth;

      return {
        left: -menuLeft,
        right: -right,
        [topOrBottom]: verticalPosition,
      };

    default:
      return {};
  }
}
