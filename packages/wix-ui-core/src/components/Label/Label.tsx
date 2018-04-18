import * as React from 'react';
import {string, bool} from 'prop-types';
import style from './Label.st.css';

export interface LabelProps {
  className?: string;
  children?: string;
  for?: string;
  id?: string;
  disabled?: boolean;
}

/**
 * Label
 */
export const Label: React.SFC<LabelProps> = props => {
  const {disabled, id, children} = props;
  return <label {...style('root', {disabled}, props)} htmlFor={props.for} id={id}>{children}</label>;
};

Label.propTypes = {
  /** class name */
  className: string,
  /** children */
  children: string,
  /** For property */
  for: string,
  /** ID of element */
  id: string,
  /** is disabled? */
  disabled: bool
};
