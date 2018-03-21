import * as React from 'react';
import {number, bool, any, oneOf, arrayOf} from 'prop-types';
import style from './HBox.st.css';
import {addSpacing} from './utils';

export interface HBoxProps {
  children?: React.ReactNode;
  verticalAlignment?: AlignmentOptions;
  spacing?: number;
  rtl?: boolean;
}

export type AlignmentOptions = 'top' | 'center' | 'bottom';

/**
 * HBox
 */
export const HBox: React.SFC<HBoxProps> = props => {
  const {children, verticalAlignment, spacing, rtl} = props;
  return <div {...style('root', {verticalAlignment, rtl}, props)}>{addSpacing(children, spacing, rtl)}</div>;
};

HBox.propTypes = {
  children: any,
  verticalAlignment: oneOf(['top', 'center', 'bottom']),
  spacing: number,
  rtl: bool
};
