import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import style from './DropdownStyle.st.css';
import {Popover, Placement} from '../Popover';
import {DropdownContent} from '../DropdownContent';
import {Option} from '../DropdownOption';
import {CLICK, CLICK_TYPE, HOVER, HOVER_TYPE} from './constants';

export interface TriggerElementProps {
  onKeyDown(evt: React.KeyboardEvent<HTMLElement>);
}

export interface DropdownProps {
  /** The location to display the content */
  placement: Placement;
  /** Should display arrow with the content */
  showArrow?: boolean;
  /** render function that renders the target element with the state */
  children: (triggerElementProps: TriggerElementProps) => React.ReactNode;
  /** The dropdown options array */
  options: Array<Option>;
  /** Trigger type to open the content */
  openTrigger: CLICK_TYPE | HOVER_TYPE;
  /** Handler for when an option is selected */
  onSelect: (option: Option) => void;
  /** Handler for when an option is deselected */
  onDeselect: (option: Option) => void;
  /** initial selected option ids */
  initialSelectedIds: Array<string | number>;
  /** Should close content on select */
  closeOnSelect: boolean;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Maximum height of the options */
  optionsMaxHeight?: number;
}

export interface DropdownState {
  isOpen: boolean;
  selectedIds: Array<string | number>;
  keyboardEvent: string;
}

/**
 * Dropdown
 */
export class DropdownComponent extends React.PureComponent<DropdownProps, DropdownState> {
  private dropdownContentRef: DropdownContent;

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
      selectedIds: [],
      keyboardEvent: null
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
    const {openTrigger, placement, options, children, showArrow, optionsMaxHeight, fixedFooter, fixedHeader} = this.props;
    const {isOpen, selectedIds, keyboardEvent} = this.state;

    return (
      <Popover
        {...style('root', {}, this.props)}
        data-hook="dropdown"
        placement={placement}
        shown={isOpen}
        showArrow={showArrow}
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
            className={style.dropdownContent}
            ref={dropdownContent => this.dropdownContentRef = dropdownContent}
            keyboardEvent={keyboardEvent}
            options={options}
            fixedFooter={fixedFooter}
            fixedHeader={fixedHeader}
            maxHeight={optionsMaxHeight}
            selectedIds={selectedIds}
            onOptionClick={this.onOptionClick} />
        </Popover.Content>
      </Popover>
    );
  }
}

export const Dropdown = onClickOutside(DropdownComponent);
Dropdown.displayName = 'Dropdown';
