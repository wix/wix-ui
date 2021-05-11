const isTestEnv = process.env.NODE_ENV === 'test';

export const getArrowShift = (shift: number | undefined, direction: string) => {
  if (!shift && !isTestEnv) {
    return {};
  }

  return {
    [direction === 'top' || direction === 'bottom'
      ? 'left'
      : 'top']: `${shift}px`,
  };
};
