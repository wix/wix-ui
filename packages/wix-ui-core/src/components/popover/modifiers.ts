import PopperJS from 'popper.js';

const calculateOffset = ({ moveBy, placement = '' }): string => {
  /*
   * For `right` and `left` placements, we need to flip the `x` and `y` values as Popper.JS will use
   * the first value for the main axis. As per Popper.js docs:
   *
   *   if the placement is top or bottom, the length will be the width. In case of left or right, it
   *   will be the height.
   *
   */
  if (placement.includes('right') || placement.includes('left')) {
    return `${moveBy ? moveBy.y : 0}px, ${moveBy ? moveBy.x : 0}px`;
  }

  return `${moveBy ? moveBy.x : 0}px, ${moveBy ? moveBy.y : 0}px`;
};

interface styles {
  minWidth?: string;
  width?: string;
}

const resolveWidth = ({ minWidth, dynamicWidth, referenceWidth }): styles => {
  return {
    minWidth: minWidth
      ? typeof minWidth === 'string'
        ? minWidth
        : `${minWidth}px`
      : dynamicWidth
      ? `${referenceWidth}px`
      : undefined,
    width: 'auto',
  };
};

export const createModifiers = ({
  moveBy,
  appendTo,
  shouldAnimate,
  flip,
  fixed,
  placement,
  isTestEnv,
  minWidth,
  dynamicWidth,
}) => {
  const preventOverflow = !fixed;

  const modifiers: PopperJS.Modifiers = {
    offset: {
      offset: calculateOffset({ moveBy, placement }),
    },
    computeStyle: {
      gpuAcceleration: !shouldAnimate,
    },
    flip: {
      enabled: typeof flip !== 'undefined' ? flip : !moveBy,
    },
    preventOverflow: {
      enabled: preventOverflow,
    },
    hide: {
      enabled: preventOverflow,
    },
  };

  if (dynamicWidth || minWidth) {
    modifiers.setPopperWidth = {
      enabled: true,
      order: 840,
      fn: data => {
        const { width: referenceWidth } = data.offsets.reference;

        data.styles = {
          ...data.styles,
          ...resolveWidth({
            referenceWidth,
            minWidth,
            dynamicWidth,
          }),
        };

        return data;
      },
    };
  }

  if (isTestEnv) {
    modifiers.computeStyle = { enabled: false };
  }

  if (appendTo) {
    modifiers.preventOverflow = {
      ...modifiers.preventOverflow,
      boundariesElement: appendTo,
    };
  }

  return modifiers;
};
