import { HorizontalMenuItemContextValue } from '../horizontal-menu-item/HorizontalMenuItemContext';

export function layoutLeftAndRightPositions(
  context: HorizontalMenuItemContextValue,
) {
  const { expandSize } = context;
  if (expandSize === 'column') {
    return {};
  }

  const menuItemWidth = context.getMenuItemBoundingRect('width');

  if (expandSize === 'menu') {
    const menuItemOffsetLeft = context.getMenuItemOffsetLeft();
    const menuWidth = context.getMenuBoundingRect('width');

    return {
      left: -menuItemOffsetLeft,
      right: -(menuWidth - menuItemWidth - menuItemOffsetLeft),
    };
  }

  const menuItemLeft = context.getMenuItemBoundingRect('left');
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  const right =
    window.innerWidth - scrollbarWidth - menuItemLeft - menuItemWidth;

  return { left: -menuItemLeft, right: -right };
}