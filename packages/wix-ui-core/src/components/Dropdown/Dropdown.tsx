import * as React from 'react';
import Popover, {SharedPopoverProps} from '../Popover';
import {bool, string, oneOf, arrayOf, object, func, oneOfType, number} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';
import DropdownContent from './DropdownContent';
import {Option} from './DropdownContent/DropdownContent';
import {CLICK, CLICK_TYPE, HOVER, HOVER_TYPE} from './constants';

type DropdownClasses = {
  targetElement: string;
};

export interface TriggerElementProps {
  onKeyDown(evt: React.KeyboardEvent<HTMLElement>);
}

interface DropdownProps {
  classes: DropdownClasses;
  children: (triggerElementProps: TriggerElementProps) => React.ReactNode;
}

export interface SharedDropdownProps extends SharedPopoverProps {
  options: Array<Option>;
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  onSelect?: (option: Option, evt: React.SyntheticEvent<HTMLElement>, selectedIds: Array<string | number>) => void;
  onDeselect?: (option: Option, evt: React.SyntheticEvent<HTMLElement>, selectedIds: Array<string | number>) => void;
  initialSelectedIds?: Array<string | number>;
  closeOnSelect: boolean;
}

interface DropdownState {
  isOpen: boolean;
  selectedIds: Array<string | number>;
  keyboardEvent: React.KeyboardEvent<HTMLElement>;
}

class Dropdown extends React.PureComponent<DropdownProps & SharedDropdownProps, DropdownState> {
  static defaultProps = {
    placement: 'bottom-start',
    openTrigger: CLICK,
    options: [],
    onSelect: () => null,
    onDeselect: () => null,
    initialSelectedIds: [],
    closeOnSelect: true
  };

  static propTypes = {
    /** Trigger type to show the content */
    openTrigger: oneOf([CLICK, HOVER]),
    /** The location to display the content */
    placement: string,
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is selected */
    onSelect: func,
    /** Handler for when an option is selected */
    onDeselect: func,
    /** Selected option ids */
    initialSelectedIds: oneOfType([arrayOf(number), arrayOf(string)]),
    /** render function that renders the element with the state */
    children: func.isRequired,
    /** Dropdown mode - single / multi select */
    closeOnSelect: bool
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this._onOptionClick = this._onOptionClick.bind(this);

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

  toggleOpen() {
    this.state.isOpen ? this.close() : this.open();
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

  onKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    switch (evt.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        this.setState({
          isOpen: true,
          keyboardEvent: evt
        });
        return;
      }
      case 'Enter': {
        return this.toggleOpen();
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

  _onOptionClick(option: Option, evt: React.SyntheticEvent<HTMLElement>) {
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
    callback(option, evt, newState.selectedIds);
  }

  render() {
    const {openTrigger, placement, options, children, classes} = this.props;
    const {isOpen, selectedIds, keyboardEvent} = this.state;

    return (
      <Popover
        placement={placement}
        shown={isOpen}
        onMouseEnter={openTrigger === HOVER ? this.open : null}
        onMouseLeave={openTrigger === HOVER ? this.close : null}>
        <Popover.Element>
          <div
            className={classes.targetElement}
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
            onOptionClick={this._onOptionClick} />
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(onClickOutside(Dropdown));
