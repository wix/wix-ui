import { PopoverNextProps } from '../../popover-next';

export const shouldAnimatePopover = (
  timeout: PopoverNextProps['timeout'],
): { shouldAnimate: boolean } => {
  if (typeof timeout === 'object') {
    const { enter, exit } = timeout;

    return {
      shouldAnimate:
        typeof enter !== 'undefined' &&
        typeof exit !== 'undefined' &&
        (enter > 0 || exit > 0),
    };
  }

  return { shouldAnimate: !!timeout };
};
