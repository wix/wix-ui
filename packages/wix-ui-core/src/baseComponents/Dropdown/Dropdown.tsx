import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import style from './Dropdown.st.css';
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
  static displayName = 'Dropdown';
  private dropdownContentRef: DropdownContent;

  constructor(props) {
    super(props);

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

  open(onOpen: () => void = null) {
    if (this.state.isOpen) {
      onOpen && onOpen();
    } else {
      this.setState({isOpen: true}, onOpen);
    }
  }

  close() {
    if (this.state.isOpen) {
      this.setState({isOpen: false});
    }
  }

  onKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    const eventKey = evt.key;
    this.open(() => {
      this.dropdownContentRef.onKeyDown(eventKey);
      switch (eventKey) {
        case 'Enter': {
          const {closeOnSelect} = this.props;
          closeOnSelect && this.close();
          break;
        }
        case 'Tab':
        case 'Escape': {
          this.close();
          break;
        }
        default: break;
      }
    });
  }

  onOptionClick(option: Option) {
    const {onSelect, onDeselect, closeOnSelect} = this.props;
    const {selectedIds} = this.state;
    let callback = onSelect;
    const newState = {
      isOpen: !closeOnSelect,
      selectedIds
    };

    if (closeOnSelect) {
      if (option) {
        if (selectedIds.includes(option.id)) {
          return this.close();
        } else {
          newState.selectedIds = [option.id];
        }
      } else {
        newState.selectedIds = [];
      }
    } else {
      if (option) {
        if (selectedIds.includes(option.id)) {
          newState.selectedIds = selectedIds.filter(x => x !== option.id);
          callback = onDeselect;
        } else {
          newState.selectedIds = [...selectedIds, option.id];
        }
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
        onClick={openTrigger === CLICK ? () => this.open() : null}
        onMouseEnter={openTrigger === HOVER ? () => this.open() : null}
        onKeyDown={this.onKeyDown}
        onMouseLeave={openTrigger === HOVER ? this.close : null}>
        <Popover.Element>
          {children}
        </Popover.Element>
        <Popover.Content>
          <DropdownContent
            data-hook="dropdown-content"
            className={style.dropdownContent}
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

export type DropdownType = React.ComponentClass<DropdownProps> & {
  getInstance: () => DropdownComponent
};

export const Dropdown: DropdownType = onClickOutside(DropdownComponent);
