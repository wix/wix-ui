import * as React from 'react';
import {InputWithOptions} from '../../src/components/InputWithOptions';
import {OptionFactory} from '../../src/baseComponents/DropdownOption';

const dropdownOptions =
  Array.from(Array(20))
    .map((x, index) =>
      index === 5 ? OptionFactory.createDivider() : OptionFactory.create(index, index === 3, true, index === 15 ? 'fdsf sdf sdf sdf sdf sdfsd fsdf sdf ds' : `value${index}`));

export interface ControlledInputWithOptionsProps {
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
    return (
      <InputWithOptions
        options={dropdownOptions}
        onSelect={option => this.setState({value: option.value})}
        inputProps={{
          value: this.state.value,
          onChange: event => this.setState({value: event.target.value})
        }}
      />
    );
  }
}
