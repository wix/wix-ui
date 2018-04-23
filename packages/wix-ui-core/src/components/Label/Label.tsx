import * as React from 'react';
import {string, bool} from 'prop-types';
import style from './Label.st.css';

export interface LabelProps {
  className?: string;
  children?: string;
  for?: string;
  id?: string;
  ellipsis?: boolean;
}

const defaultProps: LabelProps = {
  ellipsis: false
};

/**
 * Label
 */
export const Label: React.SFC<LabelProps> = props => {
  const {id, children, ellipsis} = props;
  return <label {...style('root', {ellipsis}, props)} htmlFor={props.for} id={id}>{children}</label>;
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
  /** should the text be ellipsed or not */
  ellipsis: bool
};

Label.defaultProps = defaultProps;
