import * as React from 'react';
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
  /** Turns on or off autocomplete property, which is responsible for default browser autocomplete suggestion */
  autoComplete?: 'on' | 'off';

  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus?: boolean;

  className?: string;

  /** Makes the component disabled */
  disabled?: boolean;

  /** Name for the input */
  name?: string;

  /** Standard input onBlur callback */
  onBlur?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;

  /** Standard input onChange callback */
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;

  /** Standard input onClick callback */
  onClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;

  /** Standard input onDoubleClick callback */
  onDoubleClick?: React.EventHandler<React.MouseEvent<HTMLInputElement>>;

  /** Standard input onFocus callback */
  onFocus?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;

  /** Standard input onKeyDown callback */
  onKeyDown?: React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;

  /** Standard input onKeyUp callback */
  onKeyUp?: React.EventHandler<React.KeyboardEvent<HTMLInputElement>>;

  /** Placeholder to display */
  placeholder?: string;

  /** Sets the input to readOnly */
  readOnly?: boolean;

  /** Sets the input to be required */
  required?: boolean;

  /** Standard component tabIndex */
  tabIndex?: number;

  /** The type of the input - number / text */
  type?: string;

  /** Inputs value */
  value?: string;

  id?: string;
}

/**
 * Input
 */
export class Input extends React.Component<InputProps> {
  static displayName = 'Input';

  static defaultProps = {
    type: 'text',
    id: ''
  };

  constructor(props) {
    super(props);
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
      value,
      id
    } = this.props;

    const ariaAttributes = createAriaAttributes(this.props);

    return (
      <input
        {...style('root', {disabled}, this.props)}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={id}
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
