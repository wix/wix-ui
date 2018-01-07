import * as React from 'react';
import Popover from '../Popover';
import {Placement} from '../Popover/Popover';
import {bool, string, oneOf, arrayOf, object, func, oneOfType, number} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';
import DropdownContent from './DropdownContent';
import {Option} from './DropdownContent/DropdownContent';
import {CLICK, CLICK_TYPE, HOVER, HOVER_TYPE} from './constants';

export type DropdownClasses = {
};

export interface TriggerElementProps {
  onKeyDown(evt: React.KeyboardEvent<HTMLElement>);
}

export interface DropdownProps {
  placement: Placement;
  classes?: DropdownClasses;
  children: (triggerElementProps: TriggerElementProps) => React.ReactNode;
  options: Array<Option>;
  openTrigger: CLICK_TYPE | HOVER_TYPE;
  onSelect: (option: Option) => void;
  onDeselect: (option: Option) => void;
  initialSelectedIds: Array<string | number>;
  closeOnSelect: boolean;
}

interface DropdownState {
  isOpen: boolean;
  selectedIds: Array<string | number>;
  keyboardEvent: string;
}

class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {
  static propTypes = {
    /** Trigger type to open the content */
    openTrigger: oneOf([CLICK, HOVER]).isRequired,
    /** The location to display the content */
    placement: string.isRequired,
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is selected */
    onSelect: func.isRequired,
    /** Handler for when an option is deselected */
    onDeselect: func.isRequired,
    /** initial selected option ids */
    initialSelectedIds: oneOfType([arrayOf(number), arrayOf(string)]).isRequired,
    /** render function that renders the target element with the state */
    children: func.isRequired,
    /** Should close content on select */
    closeOnSelect: bool.isRequired,
    /** Classes object */
    classes: object.isRequired
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);

    const {initialSelectedIds, options} = props;
    const selectedIds =
       (initialSelectedIds || [])
         .map(id => options.find(option => id === option.id))
         .filter(option => !!option && !option.isDisabled && option.isSelectable)
         .map(x => x.id);

    this.state = {
      isOpen: false,
      selectedIds,
      keyboardEvent: null
    };
  }

  handleClickOutside() {
    this.close();
  }

  open() {
    if (!this.state.isOpen) {
      this.setState({isOpen: true});
    }
  }

  close() {
    if (this.state.isOpen) {
      this.setState({isOpen: false});
    }
  }

  setKeyboardEvent(evt: React.KeyboardEvent<HTMLElement>) {
    this.setState({
      isOpen: true,
      keyboardEvent: evt.key + Math.random()
    });
  }

  onKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    switch (evt.key) {
      case 'Enter':
      case 'ArrowUp':
      case 'ArrowDown': {
        return this.setKeyboardEvent(evt);
      }
      case 'Tab':
      case 'Escape': {
        return this.close();
      }
      default: {
        return;
      }
    }
  }

  onOptionClick(option: Option) {
    const {onSelect, onDeselect, closeOnSelect} = this.props;
    const {selectedIds} = this.state;
    let callback = onSelect;
    const newState = {
      isOpen: !closeOnSelect,
      selectedIds: []
    };

    if (closeOnSelect) {
      if (selectedIds.includes(option.id)) {
        return this.close();
      } else {
        newState.selectedIds = [option.id];
      }
    } else {
      if (selectedIds.includes(option.id)) {
        newState.selectedIds = selectedIds.filter(x => x !== option.id);
        callback = onDeselect;
      } else {
        newState.selectedIds = [...selectedIds, option.id];
      }
    }

    this.setState(newState);
    callback(option);
  }

  render() {
    const {openTrigger, placement, options, children} = this.props;
    const {isOpen, selectedIds, keyboardEvent} = this.state;

    return (
      <Popover
        placement={placement}
        shown={isOpen}
        onMouseEnter={openTrigger === HOVER ? this.open : null}
        onMouseLeave={openTrigger === HOVER ? this.close : null}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={openTrigger === CLICK ? this.open : null}>
            {children({onKeyDown: this.onKeyDown})}
          </div>
        </Popover.Element>
        <Popover.Content>
          <DropdownContent
            keyboardEvent={keyboardEvent}
            options={options}
            selectedIds={selectedIds}
            onOptionClick={this.onOptionClick} />
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(onClickOutside(Dropdown));
