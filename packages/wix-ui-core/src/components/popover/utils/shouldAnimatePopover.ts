interface ishouldAnimatePopover {
  timeout: number | { enter: number; exit: number };
}

export const shouldAnimatePopover = ({ timeout }: ishouldAnimatePopover) => {
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
