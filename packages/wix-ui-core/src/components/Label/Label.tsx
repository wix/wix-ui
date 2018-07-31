import * as React from 'react';
import {string, bool, oneOfType, node, number} from 'prop-types';
import style from './Label.st.css';

export interface LabelProps {
  className?: string;
  /** Children */
  children?: React.ReactNode;
  /** For property */
  for?: string;
  /** ID of element */
  id?: string;
  /** should the text be ellipsed or not */
  ellipsis?: boolean;
  /** Is the Label disabled */
  disabled?: boolean;
  /** Label max width */
  maxWidth?: number | string;
}

const defaultProps: LabelProps = {
  ellipsis: false
};

/**
 * Label
 */
export const Label: React.SFC<LabelProps> = props => {
  const {id, children, ellipsis, disabled} = props;
  return (
    <label
      {...style('root', {ellipsis, disabled}, props)}
      htmlFor={props.for}
      id={id}
      style={{maxWidth: props.maxWidth}}
    >
      {children}
    </label>
  );
};

Label.displayName = 'Label';

Label.propTypes = {
  /** class name */
  className: string,
  /** children */
  children: node,
  /** For property */
  for: string,
  /** ID of element */
  id: string,
  /** should the text be ellipsed or not */
  ellipsis: bool,
  /** Is the Label disabled */
  disabled: bool,
  /** Label max width */
  maxWidth: oneOfType([number, string]),
};

Label.defaultProps = defaultProps;
