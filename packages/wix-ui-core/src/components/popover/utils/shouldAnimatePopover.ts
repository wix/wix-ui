export const shouldAnimatePopover = timeout => {
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
