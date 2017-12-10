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

type InputClasses = {
  input: string
};

interface InputProps {
  classes: InputClasses;
  defaultValue: string;
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

  static propTypes = {
    classes: object.isRequired,
    /** Default value for those who wants to use this component un-controlled */
    defaultValue: string,
    /** when set to true this component is disabled */
    disabled: bool,
    /** Input max length */
    maxLength: number,
    name: string,
    /** Standard input onChange callback */
    onChange: func,
    /** Placeholder to display */
    placeholder: string,
    /** Sets the input to readOnly */
    readOnly: bool,
    required: bool,
    /** Standard component tabIndex */
    tabIndex: number,
    type: string,
    /** Inputs value */
    value: oneOfType([string, number])
  };

  constructor(props) {
    super(props);
    this.id = uniqueId('Input');
  }

  _onChange = e => {
    if (this.props.type === 'number' && !(/^[\d.,\-+]*$/.test(e.target.value))) {
      return;
    }

    this.props.onChange && this.props.onChange(e);
  }

  render() {
    const {
      classes,
      defaultValue,
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
        defaultValue={defaultValue}
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
