import * as React from 'react';
import * as propTypes from 'prop-types';
import style from './Label.st.css';

export interface LabelProps {
  children?: React.ReactNode;
  for?: string;
  id?: string;
}

/**
 * Label
 */
export const Label: React.SFC<LabelProps> = props => {
  return <label {...style('root', {}, props)} htmlFor={props.for} id={props.id}>{props.children}</label>;
};

Label.propTypes = {
  /** Label children */
  children: propTypes.node,
  /** For property */
  for: propTypes.string,
  /** ID of element */
  id: propTypes.string
};
