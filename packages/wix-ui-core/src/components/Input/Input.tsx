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
  maxLength: number;
  name: string;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
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
    maxLength: 524288
  };

  static propTypes = {
    classes: object.isRequired,
    /** Default value for those who wants to use this component un-controlled */
    disabled: bool,
    /** Input max length */
    maxLength: number,
    /** Name for the input */
    name: string,
    /** Standard input onChange callback */
    onChange: func,
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
  }

  _onChange = e => {
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
      maxLength,
      name,
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
        id={id}
        maxLength={maxLength}
        name={name}
        onChange={this._onChange}
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
