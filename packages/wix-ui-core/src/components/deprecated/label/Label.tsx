import * as React from 'react';
import { style, classes } from './Label.st.css';

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
}

const defaultProps: LabelProps = {
  ellipsis: false,
};

/**
 * Label
 */
export const Label: React.FunctionComponent<LabelProps> = props => {
  const { id, children, ellipsis, disabled } = props;
  return (
    <label
      className={style(classes.root, { ellipsis, disabled }, props.className)}
      data-ellipsis={ellipsis}
      data-disabled={disabled}
      htmlFor={props.for}
      id={id}
    >
      {children}
    </label>
  );
};

Label.displayName = 'Label';

Label.defaultProps = defaultProps;
