import * as React from 'react';
import Dropdown from '../Dropdown';
import {SharedDropdownProps, DropdownElementProps} from '../Dropdown/Dropdown';
import {SINGLE_SELECT, MULTI_SELECT} from '../Dropdown/constants';
import {createHOC} from '../../createHOC';
import {oneOf, object, arrayOf} from 'prop-types';

export interface InputWithOptionsProps extends SharedDropdownProps {
}

interface InputWithOptionsState {
  inputValue: string;
}

class InputWithOptions extends React.PureComponent<InputWithOptionsProps, InputWithOptionsState> {

  static defaultProps = {
    options: [],
    mode: SINGLE_SELECT
  };

  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Dropdown mode - single / multi select */
    mode: oneOf([SINGLE_SELECT, MULTI_SELECT])
  };

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
    this.state = {
      inputValue: ''
    };
  }

  onDeselect(option) {
    const {inputValue} = this.state;
    this.setState({
      inputValue: inputValue.replace(option.value + ' ', '')
    });
  }

  onSelect(option) {
    const {inputValue} = this.state;
    this.setState({
      inputValue: inputValue + `${option.value} `
    });
  }

  render () {
    const {options, mode} = this.props;
    const {inputValue} = this.state;

    return (
      <Dropdown
        options={options}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        mode={mode}>
        {
          (props: DropdownElementProps) =>
            <input
              style={{outline: 0}}
              tabIndex={5}
              value={inputValue}
              onChange={evt => this.setState({inputValue: evt.target.value})}
              onKeyDown={props.onKeyDown}/>
        }
      </Dropdown>
    );
  }
}

export default createHOC(InputWithOptions);
