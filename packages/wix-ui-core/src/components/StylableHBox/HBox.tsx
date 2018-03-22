import * as React from 'react';
import {number, bool, any, oneOf, arrayOf} from 'prop-types';
import style from './HBox.st.css';
import {addSpacing} from './utils';

export interface HBoxProps {
  children?: React.ReactNode;
  verticalAlignment?: AlignmentOptions;
  spacing?: number;
  dir?: 'rtl' | 'ltr';
}

export type AlignmentOptions = 'top' | 'center' | 'bottom';

/**
 * HBox
 */
export const HBox: React.SFC<HBoxProps> = props => {
  const {children, verticalAlignment, spacing, dir} = props;
  return <div {...style('root', {verticalAlignment, dir}, props)}>{addSpacing(children, spacing, dir)}</div>;
};

HBox.propTypes = {
  children: any,
  verticalAlignment: oneOf(['top', 'center', 'bottom']),
  spacing: number,
  dir: oneOf(['ltr', 'rtl'])
};
