import * as React from 'react';
import {number, any, oneOf, arrayOf} from 'prop-types';
import style from './VBox.st.css';
import {addSpacing} from './utils';

export interface VBoxProps {
  children?: React.ReactNode;
  horizontalAlignment?: VBoxAlignmentOptions;
  spacing?: number;
}

export type VBoxAlignmentOptions = 'left' | 'center' | 'right';

/**
 * VBox
 */
export const VBox: React.SFC<VBoxProps> = props => {
  const {children, horizontalAlignment, spacing} = props;
  return <div {...style('root', {horizontalAlignment}, props)}>{addSpacing(children, spacing, 'Bottom')}</div>;
};

VBox.propTypes = {
  children: any,
  horizontalAlignment: oneOf(['left', 'center', 'right']),
  spacing: number
};
