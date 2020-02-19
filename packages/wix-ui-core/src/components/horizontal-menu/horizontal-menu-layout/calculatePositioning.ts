import * as React from 'react';

import { ExpandSize } from '../horizontal-menu-item/HorizontalMenuItem';

export interface CalculatePositioningProps {
  expandSize: ExpandSize;
  menuItemRef: React.RefObject<HTMLLIElement>;
  rootMenuRef: React.RefObject<HTMLUListElement>;
  layoutRef: React.RefObject<HTMLDivElement>;
  maxOverflowWidth: number;
}

const MAX_SINGLE_COLUMN_OVERFLOW_WIDTH = 280;

function getNumberValue(value: string) {
  const number = parseInt(value, 10);
  return isFinite(number) ? number : 0;
}

function calculateColumnExpandStyles({
  menuItemRef,
  layoutRef,
  maxOverflowWidth,
}: {
  menuItemRef: HTMLLIElement;
  layoutRef: HTMLDivElement;
  maxOverflowWidth: number;
}) {
  const {
    width: menuItemWidth,
    height: menuItemHeight,
    left: menuItemLeft,
    y: menuItemY,
  } = menuItemRef.getBoundingClientRect();

  const {
    width: layoutWidth,
    height: layoutHeight,
  } = layoutRef.getBoundingClientRect();

  const topOrBottom =
    menuItemY + menuItemHeight + layoutHeight > window.innerHeight &&
    menuItemY - layoutHeight >= 0
      ? 'bottom'
      : 'top';

  const {
    borderTopWidth: menuItemBorderTopWidth,
    borderRightWidth: menuItemBorderRightWidth,
    borderBottomWidth: menuItemBorderBottomWidth,
    borderLeftWidth: menuItemBorderLeftWidth,
  } = getComputedStyle(menuItemRef);

  const topColumnValue = `calc(100% + ${getNumberValue(
    menuItemBorderTopWidth,
  )}px)`;
  const bottomColumnValue = `calc(100% + ${getNumberValue(
    menuItemBorderBottomWidth,
  )}px)`;

  const leftColumnValue = getNumberValue(menuItemBorderLeftWidth);
  const rightColumnValue = getNumberValue(menuItemBorderRightWidth);

  const leftOrRight =
    menuItemLeft + layoutWidth <= window.innerWidth ? 'left' : 'right';

  if (menuItemWidth >= maxOverflowWidth || layoutWidth <= menuItemWidth) {
    return {
      [leftOrRight]:
        leftOrRight === 'left' ? -leftColumnValue : -rightColumnValue,
      [topOrBottom]: topOrBottom === 'top' ? topColumnValue : bottomColumnValue,
      width: `calc(100% + ${leftColumnValue + rightColumnValue}px)`,
    };
  }

  const stylesObject = {
    [leftOrRight]:
      leftOrRight === 'left' ? -leftColumnValue : -rightColumnValue,
    [topOrBottom]: topOrBottom === 'top' ? topColumnValue : bottomColumnValue,
    width: 'max-content',
    maxWidth: `${maxOverflowWidth}px`,
  };

  return stylesObject;
}

function calculateMenuExpandStyles({
  menuItemRef,
  rootMenuRef,
  layoutRef,
}: {
  menuItemRef: HTMLLIElement;
  rootMenuRef: HTMLUListElement;
  layoutRef: HTMLDivElement;
}) {
  const {
    height: menuItemHeight,
    y: menuItemY,
  } = menuItemRef.getBoundingClientRect();

  const { height: menuHeight, y: menuY } = rootMenuRef.getBoundingClientRect();

  const {
    borderTopWidth: menuBorderTopWidth,
    borderRightWidth: menuBorderRightWidth,
    borderBottomWidth: menuBorderBottomWidth,
    borderLeftWidth: menuBorderLeftWidth,
  } = getComputedStyle(rootMenuRef);

  const menuBorderTopValue = getNumberValue(menuBorderTopWidth);
  const menuBorderBottomValue = getNumberValue(menuBorderBottomWidth);

  const { height: layoutHeight } = layoutRef.getBoundingClientRect();

  const topOrBottom =
    menuItemY + menuItemHeight + layoutHeight > window.innerHeight &&
    menuItemY - layoutHeight >= 0
      ? 'bottom'
      : 'top';

  const topValue = menuItemY - menuY + menuItemHeight - menuBorderTopValue;
  const bottomValue = menuHeight - (menuItemY - menuY) - menuBorderBottomValue;

  const verticalPosition = topOrBottom === 'top' ? topValue : bottomValue;

  return {
    left: -getNumberValue(menuBorderLeftWidth),
    right: -getNumberValue(menuBorderRightWidth),
    [topOrBottom]: verticalPosition,
  };
}

function calculateFullWidthExpandStyles({
  menuItemRef,
  rootMenuRef,
  layoutRef,
}: {
  menuItemRef: HTMLLIElement;
  rootMenuRef: HTMLUListElement;
  layoutRef: HTMLDivElement;
}) {
  const {
    height: menuItemHeight,
    y: menuItemY,
  } = menuItemRef.getBoundingClientRect();

  const {
    left: menuLeft,
    width: menuWidth,
    height: menuHeight,
    y: menuY,
  } = rootMenuRef.getBoundingClientRect();

  const {
    borderTopWidth: menuBorderTopWidth,
    borderRightWidth: menuBorderRightWidth,
    borderBottomWidth: menuBorderBottomWidth,
    borderLeftWidth: menuBorderLeftWidth,
  } = getComputedStyle(rootMenuRef);

  const menuBorderTopValue = getNumberValue(menuBorderTopWidth);
  const menuBorderBottomValue = getNumberValue(menuBorderBottomWidth);

  const documentWidth = document.documentElement.clientWidth;

  const { height: layoutHeight } = layoutRef.getBoundingClientRect();

  const topOrBottom =
    menuItemY + menuItemHeight + layoutHeight > window.innerHeight &&
    menuItemY - layoutHeight >= 0
      ? 'bottom'
      : 'top';

  const topValue = menuItemY - menuY + menuItemHeight - menuBorderTopValue;
  const bottomValue = menuHeight - (menuItemY - menuY) - menuBorderBottomValue;

  const verticalPosition = topOrBottom === 'top' ? topValue : bottomValue;

  const windowInnerWidth = window.innerWidth;
  const scrollbarWidth = windowInnerWidth - documentWidth;
  const right = windowInnerWidth - scrollbarWidth - menuLeft - menuWidth;

  return {
    left: -menuLeft - getNumberValue(menuBorderLeftWidth),
    right: -right - getNumberValue(menuBorderRightWidth),
    [topOrBottom]: verticalPosition,
  };
}

export function calculatePositioning({
  expandSize,
  layoutRef,
  rootMenuRef,
  maxOverflowWidth = MAX_SINGLE_COLUMN_OVERFLOW_WIDTH,
  menuItemRef,
}: CalculatePositioningProps) {
  const { current: currentLayoutRef } = layoutRef;
  const { current: currentRootMenuRef } = rootMenuRef;
  const { current: currentMenuItemRef } = menuItemRef;

  if (!currentLayoutRef || !currentRootMenuRef || !currentMenuItemRef) {
    return {};
  }

  switch (expandSize) {
    case 'column':
      return calculateColumnExpandStyles({
        menuItemRef: currentMenuItemRef,
        layoutRef: currentLayoutRef,
        maxOverflowWidth,
      });

    case 'menu':
      return calculateMenuExpandStyles({
        layoutRef: currentLayoutRef,
        menuItemRef: currentMenuItemRef,
        rootMenuRef: currentRootMenuRef,
      });

    case 'fullWidth':
      return calculateFullWidthExpandStyles({
        layoutRef: currentLayoutRef,
        menuItemRef: currentMenuItemRef,
        rootMenuRef: currentRootMenuRef,
      });

    default:
      return {};
  }
}
