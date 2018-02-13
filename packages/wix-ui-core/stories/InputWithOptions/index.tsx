import * as React from 'react';
import {InputWithOptions} from '../../src/components/InputWithOptions';
import {Option} from '../../src/baseComponents/DropdownOption';

export interface ControlledInputWithOptionsProps {
  options: Array<Option>;
}

export interface ControlledInputWithOptionsState {
  value: string;
}

export class ControlledInputWithOptions extends React.PureComponent<ControlledInputWithOptionsProps, ControlledInputWithOptionsState> {
  constructor() {
    super();
    this.state = {value: ''};
  }

  render() {
    const {options} = this.props;
    return (
      <InputWithOptions
        options={options}
        onSelect={option => this.setState({value: option.value})}
        inputProps={{
          value: this.state.value,
          onChange: event => this.setState({value: event.target.value})
        }}
      />
    );
  }
}
