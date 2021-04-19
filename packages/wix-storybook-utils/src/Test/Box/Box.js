import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import parsePropTypes from 'parse-prop-types'

/** In case the value is a number, it's multiplied by the defined spacing unit.
 *  Otherwise - there are three options:
 *   1. A Spacing Token - SP1, SP2, etc. - where the number is multiplied by the spacing unit.
 *   2. A predefined spacing value with semantic name (tiny, small, etc.)
 *   3. Space-separated values that are represented by a string (for example: "3px 3px")
 * */

export const directions = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

export const horizontalAlignmentValues = {
  left: 'left',
  center: 'center',
  right: 'right',
  'space-between': 'space-between',
};

export const verticalAlignmentValues = {
  top: 'top',
  middle: 'middle',
  bottom: 'bottom',
  'space-between': 'space-between',
};

const Box = ({
  dataHook,
  gap,
  children,
  className,
  style,
  inline,
  direction,
  align,
  verticalAlign,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  minWidth,
  maxWidth,
  width,
  minHeight,
  maxHeight,
  height,
  color,
  backgroundColor,
  border,
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,

  // Excluded props (which are handled above and should not be spread into `style`)
  'data-hook': dataHookByKebabCase,
  flexDirection,
  justifyContent,
  alignItems,
}) => {
  return (
    <div
      data-hook={dataHook}
    >
      {children}
    </div>
  );
};

Box.displayName = 'Box';

Box.propTypes = {
  /** Allows to render any component as a child item */
  children: PropTypes.node,
  /** Define styles through a classname */
  className: PropTypes.string,
  /** Defines if the box behaves as an inline element */
  inline: PropTypes.bool,
  /** Defines how the children are ordered (horizontally or vertically) */
  direction: PropTypes.oneOf(Object.keys(directions)),
  /** Defines how the children are aligned according to the X axis */
  align: PropTypes.oneOf(Object.keys(horizontalAlignmentValues)),
  /** Defines how the children are aligned according to the Y axis */
  verticalAlign: PropTypes.oneOf(Object.keys(verticalAlignmentValues)),

  /** Sets the gaps/gutters between flex items.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) */
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on all sides.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a string of space-separated values ("3px 3px") */
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the top.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the right.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the bottom.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets padding on the left.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on all sides.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a string of space-separated values ("3px 3px") */
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the top.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the right.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the bottom.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets margin on the left.
   * Accepts a numeric value (multiplied by spacing unit), predefined spacing value (tiny, small, etc.)
   * a spacing token (SP1, SP2, etc.) or a or a value in pixels */
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the minimum width of the box in pixels */
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the maximum width of the box in pixels */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the width of the box in pixels */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the minimum height of the box in pixels */
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the maximum height of the box in pixels */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets the height of the box in pixels */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Sets a text color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  color: PropTypes.string,
  /** Sets a background color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  backgroundColor: PropTypes.string,
  /** Sets a border color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderColor: PropTypes.string,
  /** Sets a border top color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderTopColor: PropTypes.string,
  /** Sets a border right color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderRightColor: PropTypes.string,
  /** Sets a border bottom color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderBottomColor: PropTypes.string,
  /** Sets a border left color by a key from the color palette or natively supported value (Hex, RGB, etc.) */
  borderLeftColor: PropTypes.string,
  /** Accepts HTML attributes that can be used in the tests */
  dataHook: PropTypes.string,
};

Box.defaultProps = {
  direction: 'horizontal',
  inline: false,
};

export default Box;


const withPropTypes = (component) => {
  component.propTypes = {
    color: PropTypes.oneOf(['red', 'blue']),
    children: PropTypes.node,
  };

  return component;
};
const parent = {
  border: '1px solid currentColor',
  padding: '10px 10px 10px 15px',
};