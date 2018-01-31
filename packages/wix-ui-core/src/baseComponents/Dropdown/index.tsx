import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import style from './DropdownStyle.st.css';
import {Popover, Placement} from '../Popover';
import {DropdownContent} from '../DropdownContent';
import {Option} from '../DropdownOption';
import {CLICK, HOVER, OPEN_TRIGGER_TYPE} from './constants';

export interface DropdownProps {
  /** The location to display the content */
  placement: Placement;
  /** Should display arrow with the content */
  showArrow?: boolean;
  /** render function that renders the target element with the state */
  children: React.ReactNode;
  /** The dropdown options array */
  options: Array<Option>;
  /** Trigger type to open the content */
  openTrigger: OPEN_TRIGGER_TYPE;
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
      selectedIds
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

  onKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    this.open();
    const isHandled = this.dropdownContentRef.onKeyDown(evt);
    switch (evt.key) {
      case 'Enter':
      case 'Tab': {
        const {closeOnSelect} = this.props;
        closeOnSelect && this.close();
        break;
      }
      case 'Escape': {
        this.close();
        break;
      }
      default: break;
    }

    return isHandled;
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
    const {isOpen, selectedIds} = this.state;

    return (
      <Popover
        {...style('root', {}, this.props)}
        placement={placement}
        shown={isOpen && options.length > 0}
        showArrow={showArrow}
        onMouseEnter={openTrigger === HOVER ? this.open : null}
        onMouseLeave={openTrigger === HOVER ? this.close : null}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={openTrigger === CLICK ? this.open : null}>
            {children}
          </div>
        </Popover.Element>
        <Popover.Content>
          <DropdownContent
            ref={dropdownContent => this.dropdownContentRef = dropdownContent}
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
