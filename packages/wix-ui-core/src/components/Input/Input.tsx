import * as React from 'react';
import {bool, func, string, number} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {createHOC} from '../../createHOC';

interface InputProps {
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
    defaultValue: string,
    disabled: bool,
    maxLength: number,
    name: string,
    onChange: func,
    placeholder: string,
    readOnly: bool,
    required: bool,
    tabIndex: number,
    type: string,
    value: string
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
      name,
      disabled,
      defaultValue,
      value,
      maxLength,
      placeholder,
      tabIndex,
      readOnly,
      type,
      required
    } = this.props;

    const ariaAttribute = {};
    Object.keys(this.props).filter(key => key.startsWith('aria')).map(key => ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[key]);
    const {id} = this;

    return (
      <input
        id={id}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onChange={this._onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        tabIndex={tabIndex}
        readOnly={readOnly}
        type={type}
        required={required}
        {...ariaAttribute}
      />
    );
  }
}

export default createHOC(Input);
