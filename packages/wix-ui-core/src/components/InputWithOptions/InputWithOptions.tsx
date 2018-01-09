import * as React from 'react';
import Dropdown from '../../baseComponents/Dropdown';
import {Placement} from '../../baseComponents/Popover/Popover';
import {TriggerElementProps} from '../../baseComponents/Dropdown/Dropdown';
import {Option} from '../../baseComponents/DropdownOption';
import {createHOC} from '../../createHOC';
import {HOVER, CLICK, CLICK_TYPE, HOVER_TYPE} from '../../baseComponents/Dropdown/constants';
import {bool, oneOf, object, arrayOf, string, func, oneOfType, number} from 'prop-types';
import Input from '../Input';

export interface InputWithOptionsClasses {
}

export interface InputWithOptionsProps {
  placement?: Placement;
  classes?: InputWithOptionsClasses;
  options: Array<Option>;
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  onSelect?: (option: Option) => void;
  onDeselect?: (option: Option) => void;
  initialSelectedIds?: Array<string | number>;
  closeOnSelect?: boolean;
}

interface InputWithOptionsState {
  inputValue: string;
}

class InputWithOptions extends React.PureComponent<InputWithOptionsProps, InputWithOptionsState> {
  static defaultProps = {
    openTrigger: CLICK,
    placement: 'bottom-start',
    options: [],
    closeOnSelect: true,
    initialSelectedIds: [],
    onSelect: () => null,
    onDeselect: () => null
  };

  static propTypes = {
    /** Trigger type to open the content */
    openTrigger: oneOf([CLICK, HOVER]),
    /** The location to display the content */
    placement: string,
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is selected */
    onSelect: func,
    /** Handler for when an option is deselected */
    onDeselect: func,
    /** initial selected option ids */
    initialSelectedIds: oneOfType([arrayOf(number), arrayOf(string)]),
    /** Should close content on select */
    closeOnSelect: bool,
    /** Classes object */
    classes: object.isRequired
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
    const {placement, options, openTrigger, onSelect, onDeselect, initialSelectedIds, closeOnSelect} = this.props;
    const {inputValue} = this.state;

    return (
      <Dropdown
        placement={placement}
        openTrigger={openTrigger}
        onSelect={onSelect}
        onDeselect={onDeselect}
        initialSelectedIds={initialSelectedIds}
        options={options}
        closeOnSelect={closeOnSelect}>
        {
          ({onKeyDown}: TriggerElementProps) =>
            <Input
              value={inputValue}
              onChange={evt => this.setState({inputValue: evt.target.value})}
              onKeyDown={onKeyDown}/>
        }
      </Dropdown>
    );
  }
}

export default createHOC(InputWithOptions);
