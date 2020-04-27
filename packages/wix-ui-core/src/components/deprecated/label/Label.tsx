import * as React from 'react';
import { st, classes } from './Label.st.css';

export interface LabelProps {
  /** hook for testing purposes */
  'data-hook'?: string;
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
      className={st(classes.root, { ellipsis, disabled }, props.className)}
      data-ellipsis={ellipsis}
      data-disabled={disabled}
      data-hook={props['data-hook']}
      htmlFor={props.for}
      id={id}
    >
      {children}
    </label>
  );
};

Label.displayName = 'Label';

Label.defaultProps = defaultProps;
