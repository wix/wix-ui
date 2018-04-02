import * as React from 'react';
import {number, bool, any, oneOf, arrayOf} from 'prop-types';
import style from './HBox.st.css';
import {addSpacing} from './utils';

export interface HBoxProps {
  children?: React.ReactNode;
  verticalAlignment?: Alignment;
  spacing?: number;
  dir?: Direction;
}

export type Alignment = 'top' | 'center' | 'bottom';
export type Direction = 'ltr' | 'rtl';

const defaultProps: HBoxProps = {
  children: null,
  verticalAlignment: 'top',
  spacing: 0,
  dir: 'ltr'
};

/**
 * HBox
 */
export const HBox: React.SFC<HBoxProps> = props => {
  const {children, verticalAlignment, spacing, dir} = props;
  return <div {...style('root', {verticalAlignment}, props)}>{addSpacing(children, spacing, dir)}</div>;
};

HBox.defaultProps = defaultProps;

HBox.propTypes = {
  children: any,
  verticalAlignment: oneOf(['top', 'center', 'bottom']),
  spacing: number,
  dir: oneOf(['ltr', 'rtl'])
};
