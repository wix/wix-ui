import * as React from 'react';
import * as uniqueId from 'lodash.uniqueid';
import {oneOf, bool, func, string, number} from 'prop-types';
import style from './Input.st.css';

const createAriaAttributes = props => {
  const aria = 'aria';
  const ariaAttribute = {};
  Object
    .keys(props)
    .filter(key => key.startsWith(aria))
    .map(key => ariaAttribute[`${aria}-${key.substr(aria.length).toLowerCase()}`] = props[key]);
  return ariaAttribute;
};

const NUMBER_REGEX = /^[\d.,\-+]*$/;

export interface InputProps {
  disabled?: boolean;
  autoComplete?: 'on' | 'off';
  autoFocus?: boolean;
  name?: string;
  onBlur?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  onFocus?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;
  //Breaks wix-style-react - used to be named onInputClicked
  onClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onDoubleClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;
  onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
  onKeyUp?: React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  tabIndex?: number;
  type?: string;
  value?: string;
  className?: string;
}

export interface InputState {
  id: string;
}

/**
 * Input
 */
export class Input extends React.Component<InputProps, InputState> {
  static displayName = 'Input';

  static defaultProps = {
    type: 'text'
  };

  static propTypes = {
    /** Inputs value */
    value: string,
    /** Makes the component disabled */
    disabled: bool,
    /** Turns on or off autocomplete property, which is responsible for default browser autocomplete suggestion */
    autoComplete: string,
    /** Standard React Input autoFocus (focus the element on mount) */
    autoFocus: bool,
    /** Name for the input */
    name: string,
    /** Standard input onBlur callback */
    onBlur: func,
    /** Standard input onChange callback */
    onChange: func,
    /** Standard input onClick callback */
    onClick: func,
    /** Standard input onDoubleClick callback */
    onDoubleClick: func,
    /** Standard input onFocus callback */
    onFocus: func,
    /** Standard input onKeyDown callback */
    onKeyDown: func,
    /** Standard input onKeyUp callback */
    onKeyUp: func,
    /** Placeholder to display */
    placeholder: string,
    /** Sets the input to readOnly */
    readOnly: bool,
    /** Sets the input to be required */
    required: bool,
    /** Standard component tabIndex */
    tabIndex: number,
    /** The type of the input - number / text */
    type: oneOf(['number', 'text']),
    className: string
  };

  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId('Input')
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange(e) {
    const {type, disabled, readOnly} = this.props;

    if (disabled ||
        readOnly ||
        (type === 'number' && !(NUMBER_REGEX.test(e.target.value)))) {
      return;
    }

    this.props.onChange && this.props.onChange(e);
  }

  render() {
    const {
      disabled,
      autoComplete,
      autoFocus,
      name,
      onBlur,
      onFocus,
      onClick,
      onDoubleClick,
      onKeyDown,
      onKeyUp,
      placeholder,
      readOnly,
      required,
      tabIndex,
      type,
      value
    } = this.props;

    const ariaAttributes = createAriaAttributes(this.props);

    return (
      <input
        {...style('root', {disabled}, this.props)}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={this.state.id}
        name={name}
        onChange={this._onChange}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        tabIndex={tabIndex}
        type={type}
        value={value}
        {...ariaAttributes}
      />
    );
  }
}
