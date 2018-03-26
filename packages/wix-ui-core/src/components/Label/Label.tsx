import * as React from 'react';
import {string} from 'prop-types';
import style from './Label.st.css';

export interface LabelProps {
  children?: string;
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
  /** children */
  children: string,
  /** For property */
  for: string,
  /** ID of element */
  id: string
};
