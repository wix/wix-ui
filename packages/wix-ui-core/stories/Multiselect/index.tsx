import * as React from 'react';
import {arrayOf, object, func} from 'prop-types';
import {InputWithOptions} from '../../src/components/InputWithOptions';
import {Option} from '../../src/baseComponents/DropdownOption';

export interface MultiCheckboxProps {
  options: Array<Option>;
}

export interface MultiCheckboxState {
  inputValue: string;
  displayedOptions: Array<Option>;
}

export class MultiCheckbox extends React.PureComponent<MultiCheckboxProps, MultiCheckboxState> {
  constructor(props: MultiCheckboxProps) {
    super(props);

    this.state = {
      inputValue: '',
      displayedOptions: props.options
    };

    this.onSelect = this.onSelect.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onDeselect(option: Option) {
    const {inputValue} = this.state;
    this.setState({
      inputValue: (inputValue || '').split(', ').filter(x => x && x !== option.value).join(', ').trim()
    });
  }

  onSelect(option: Option) {
    const {inputValue} = this.state;
    this.setState({
      inputValue: [...((inputValue || '').split(', ')), option.value].filter(x => x).join(', ').trim()
    });
  }

  onInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const {value} = evt.target;
    this.setState({
      inputValue: value,
      displayedOptions: this.props.options.filter(x => !x.value || x.value.includes(value))
    });
  }

  render() {
    const {inputValue, displayedOptions} = this.state;

    return (
      <InputWithOptions
        closeOnSelect={false}
        options={displayedOptions}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        inputProps={{
          value: inputValue,
          onChange: this.onInputChange
        }}
        />
    );
  }
}
