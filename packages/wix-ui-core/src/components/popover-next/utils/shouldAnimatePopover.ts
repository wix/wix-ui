import { PopoverNextProps } from '../popover-next-next';

export const shouldAnimatePopover = (timeout: PopoverNextProps['timeout']) => {
  if (typeof timeout === 'object') {
    const { enter, exit } = timeout;

    return (
      typeof enter !== 'undefined' &&
      typeof exit !== 'undefined' &&
      (enter > 0 || exit > 0)
    );
  }

  return !!timeout;
};
