import { Modifiers, Boundary, Placement } from 'popper.js';

const getWidthUnit = value => {
  if (typeof value === 'string') {
    return value;
  }
  return `${value}px`;
};

const isTestEnv = process.env.NODE_ENV === 'test';

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
  maxWidth?: string;
}

const resolveWidth = ({
  width,
  minWidth,
  dynamicWidth,
  referenceWidth,
  maxWidth,
}): styles => {
  return {
    minWidth: dynamicWidth ? `${referenceWidth}px` : getWidthUnit(minWidth),
    maxWidth: getWidthUnit(maxWidth),
    width: width || 'auto',
  };
};

export type MoveBy = Partial<{ x: number; y: number }>;

export interface ModifiersParams {
  width?: string | number;
  minWidth?: string | number;
  zIndex?: number;
  maxWidth?: string | number;
  moveBy?: MoveBy;
  boundariesElement?: Boundary | Element;
  placement: Placement;
  shouldAnimate: boolean;
  flip?: boolean;
  fixed?: boolean;
  dynamicWidth?: boolean;
}

export const getModifiers = ({
  width,
  moveBy,
  boundariesElement,
  shouldAnimate,
  flip,
  fixed,
  placement,
  minWidth,
  dynamicWidth,
  zIndex,
  maxWidth,
}: ModifiersParams) => {
  const preventOverflow = !fixed;

  const modifiers: Modifiers = {
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

  if (dynamicWidth || minWidth || width) {
    modifiers.setPopperWidth = {
      enabled: true,
      order: 840,
      fn: data => {
        const { width: referenceWidth } = data.offsets.reference;
        data.styles = {
          ...data.styles,
          ...resolveWidth({
            width,
            referenceWidth,
            minWidth,
            maxWidth,
            dynamicWidth,
          }),
        };

        return data;
      },
    };
  }

  if (zIndex) {
    modifiers.setPopperZindex = {
      enabled: true,
      order: 850,
      fn: data => {
        data.styles = { ...data.styles, zIndex: `${zIndex}` };
        return data;
      },
    };
  }

  if (isTestEnv) {
    modifiers.computeStyle = { enabled: false };
  }

  if (boundariesElement) {
    modifiers.preventOverflow = {
      ...modifiers.preventOverflow,
      boundariesElement,
    };
  }

  return modifiers;
};
