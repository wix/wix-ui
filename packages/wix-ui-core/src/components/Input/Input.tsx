import * as React from 'react';
import style from './Input.st.css';

const NUMBER_REGEX = /^[\d.,\-+]*$/;

export interface InputProps {
  className?: string;

  /** Makes the component disabled */
  disabled?: boolean;

  /** Sets the input to readOnly */
  readOnly?: boolean;

  /** Standard input onChange callback */
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;

  /** The type of the input - number / text */
  type?: string;
}

/**
 * Input
 */
export class Input extends React.Component<InputProps> {
  static displayName = 'Input';

  static defaultProps = {
    type: 'text'
  };

  _onChange = event => {
    const {type, disabled, readOnly, onChange} = this.props;

    const canChange = [
      typeof onChange !== 'undefined',
      !disabled,
      !readOnly,
      type === 'number' && !(NUMBER_REGEX.test(event.target.value))
    ].every(i => i);

    if (canChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const {disabled, ...restProps} = this.props;

    return (
      <input
        {...style('root', {disabled}, this.props)}
        {...restProps}
      />
    );
  }
}
