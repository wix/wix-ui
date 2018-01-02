import * as React from 'react';
import Popover, {SharedPopoverProps} from '../Popover';
import {string, oneOf, arrayOf, object, func, oneOfType, number} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';
import DropdownContent, {Option} from './DropdownContent';
import {CLICK, CLICK_TYPE, HOVER, HOVER_TYPE, SINGLE_SELECT, SINGLE_SELECT_TYPE, MULTI_SELECT, MULTI_SELECT_TYPE, SEPARATOR} from './constants';

interface DropdownProps {
  children: (onKeyDown) => React.ReactNode;
}

export interface SharedDropdownProps extends SharedPopoverProps {
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  options: Array<Option>;
  onSelect?: (option: Option, evt: React.SyntheticEvent<HTMLElement>, selectedIds: Array<string | number>) => void;
  onDeselect?: (option: Option, evt: React.SyntheticEvent<HTMLElement>, selectedIds: Array<string | number>) => void;
  mode?: SINGLE_SELECT_TYPE | MULTI_SELECT_TYPE;
  initialSelectedIds?: Array<string | number>;
}

interface DropdownState {
  isOpen: boolean;
  selectedIds: Array<string | number>;
}

class Dropdown extends React.PureComponent<DropdownProps & SharedDropdownProps, DropdownState> {
  static defaultProps = {
    openTrigger: CLICK,
    placement: 'bottom-start',
    options: [],
    mode: SINGLE_SELECT,
    onSelect: () => null,
    onDeselect: () => null,
    initialSelectedIds: []
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
    mode: oneOf([SINGLE_SELECT, MULTI_SELECT])
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
         .filter(option => !!option && !option.isDisabled && option.type !== SEPARATOR)
         .map(x => x.id);

    this.state = {
      isOpen: false,
      selectedIds
    };
  }

  handleClickOutside() {
    this.close();
  }

  _isSingleSelect() {
    return this.props.mode === SINGLE_SELECT;
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
      case 'ArrowDown': {
        this.open();
        break;
      }

      case 'ArrowUp': {
        this.open();
        break;
      }

      case ' ':
      case 'Enter': {
        this.toggleOpen();
        break;
      }

      case 'Tab':
      case 'Escape': {
        this.close();
        break;
      }

      default: {
        return false;
      }
    }
  }

  _onOptionClick(option: Option, evt: React.SyntheticEvent<HTMLElement>) {
    const isSingleSelect = this._isSingleSelect();
    const {onSelect, onDeselect} = this.props;
    const {selectedIds} = this.state;
    let callback = onSelect;
    const newState = {
      isOpen: !isSingleSelect,
      selectedIds: []
    };

    if (isSingleSelect) {
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
    const {openTrigger, placement, options, children} = this.props;
    const {isOpen, selectedIds} = this.state;

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
            {children(this.onKeyDown)}
          </div>
        </Popover.Element>
        <Popover.Content>
          <DropdownContent
            options={options}
            selectedIds={selectedIds}
            onOptionClick={this._onOptionClick} />
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(onClickOutside(Dropdown));
