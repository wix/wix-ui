import * as React from 'react';
import {oneOfType, bool, func, string, number, object} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {createHOC} from '../../createHOC';

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

type InputClasses = {
  input: string
};

interface InputProps {
  classes: InputClasses;
  disabled: boolean;
  autoComplete: 'on' | 'off';
  autoFocus: boolean;
  maxLength: number;
  name: string;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  onFocus: React.EventHandler<React.FocusEvent<HTMLInputElement>>;
  placeholder: string;
  readOnly: bool;
  required: bool;
  tabIndex: number;
  type: string;
  value: string;
}

/**
 * Input
 */
class Input extends React.Component<InputProps> {
  private id: string;

  static displayName = 'Input';

  static defaultProps = {
    maxLength: 524288,
    type: 'text'
  };

  static propTypes = {
    /** Classes object */
    classes: object.isRequired,
    /** Makes the component disabled */
    disabled: bool,
    /** Turns on or off autocomplete property, which is responsible for default browser autocomplete suggestion */
    autoComplete: string,
    /** Standard React Input autoFocus (focus the element on mount) */
    autoFocus: bool,
    /** Input max length */
    maxLength: number,
    /** Name for the input */
    name: string,
    /** Standard input onChange callback */
    onChange: func,
    /** Standard input onFocus callback */
    onFocus: func,
    /** Placeholder to display */
    placeholder: string,
    /** Sets the input to readOnly */
    readOnly: bool,
    /** Sets the input to be required */
    required: bool,
    /** Standard component tabIndex */
    tabIndex: number,
    /** The type of the input - number / text */
    type: string,
    /** Inputs value */
    value: oneOfType([string, number])
  };

  constructor(props) {
    super(props);
    this.id = uniqueId('Input');
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
      classes,
      disabled,
      autoComplete,
      autoFocus,
      maxLength,
      name,
      onFocus,
      placeholder,
      readOnly,
      required,
      tabIndex,
      type,
      value
    } = this.props;

    const ariaAttributes = createAriaAttributes(this.props);
    const {id} = this;

    return (
      <input
        className={classes.input}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={id}
        maxLength={maxLength}
        name={name}
        onChange={this._onChange}
        onFocus={onFocus}
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

export default createHOC(Input);
