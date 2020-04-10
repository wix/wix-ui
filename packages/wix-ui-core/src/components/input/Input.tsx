import * as React from 'react';
import { style, classes } from './Input.st.css';
import { Omit } from 'type-zoo';
import * as classnames from 'classnames';

type OmittedInputProps = 'value' | 'prefix';
export type AriaAutoCompleteType = 'list' | 'none' | 'both';
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmittedInputProps> {
  className?: string;
  inputClassName?: string;
  error?: string | boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseDown?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseUp?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onMouseMove?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onDragStart?: React.EventHandler<React.DragEvent<HTMLInputElement>>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  'aria-autocomplete'?: AriaAutoCompleteType;
}

export interface InputState {
  focus: boolean;
}

export class Input extends React.Component<InputProps, InputState> {
  static displayName = 'Input';
  static defaultProps: InputProps = {
    type: 'text',
    onFocus: () => null,
    onBlur: () => null,
    onChange: () => null,
  };

  state: InputState = {
    focus: false,
  };

  private input: HTMLInputElement;

  render() {
    const { focus } = this.state;
    const { error, disabled, prefix, suffix, style: inlineStyle } = this.props;

    const {
      error: errorProp,
      style: styleProp,
      prefix: prefixProps,
      suffix: suffixProp,
      inputClassName,
      ...allOtherProps
    } = this.props;

    return (
      <div
        className={style(
          classes.root,
          { disabled, error: !!error && !disabled, focus },
          this.props.className,
        )}
        style={inlineStyle}
      >
        {prefix}
        <input
          {...allOtherProps}
          ref={input => (this.input = input)}
          className={classnames(classes.nativeInput, inputClassName)}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {suffix}
      </div>
    );
  }

  focus() {
    this.input.focus();
  }
  blur() {
    this.input.blur();
  }
  select() {
    this.input.select();
  }
  getSelectionStart() {
    return this.input.selectionStart;
  }
  getSelectionEnd() {
    return this.input.selectionEnd;
  }
  setSelectionRange(start: number, end: number) {
    this.input.setSelectionRange(start, end);
  }

  private readonly handleFocus: React.FocusEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({ focus: true });
    this.props.onFocus(event);
  };

  private readonly handleBlur: React.FocusEventHandler<
    HTMLInputElement
  > = event => {
    this.setState({ focus: false });
    this.props.onBlur(event);
  };
}
