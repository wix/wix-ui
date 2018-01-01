import * as React from 'react';
import Popover, {SharedPopoverProps} from '../Popover';
import {string, oneOf, arrayOf, object, func, any} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';
import DropdownContent, {Option} from './DropdownContent';
import {CLICK, CLICK_TYPE, HOVER, HOVER_TYPE, SINGLE_SELECT, SINGLE_SELECT_TYPE, MULTI_SELECT, MULTI_SELECT_TYPE} from './constants';

interface DropdownProps {
  children: () => React.ReactNode;
}

export interface SharedDropdownProps extends SharedPopoverProps {
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  options: Array<Option>;
  onSelect?: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  onDeselect?: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  mode?: SINGLE_SELECT_TYPE | MULTI_SELECT_TYPE;
  selectedIds?: Array<any>;
}

interface DropdownState {
  isOpen: boolean;
}

class Dropdown extends React.PureComponent<DropdownProps & SharedDropdownProps, DropdownState> {
  static defaultProps = {
    openTrigger: CLICK,
    placement: 'bottom-start',
    options: [],
    mode: SINGLE_SELECT,
    onSelect: () => null,
    onDeselect: () => null,
    selectedIds: []
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
    selectedIds: arrayOf(any),
    /** render function that renders the element with the state */
    children: func.isRequired,
    /** Dropdown mode - single / multi select */
    mode: oneOf([SINGLE_SELECT, MULTI_SELECT])
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onOptionClick = this._onOptionClick.bind(this);

    this.state = {
      isOpen: false
    };
  }

  handleClickOutside() {
    this.close();
  }

  _isSingleSelect() {
    return this.props.mode === SINGLE_SELECT;
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

  _onOptionClick(option, evt) {
    const isSingleSelect = this._isSingleSelect();
    const {onSelect, onDeselect, selectedIds} = this.props;

    if (isSingleSelect) {
      this.close();
      if (!selectedIds.includes(option.id)) {
        onSelect(option, evt);
      }
    } else {
      if (selectedIds.includes(option.id)) {
        onDeselect(option, evt);
      } else {
        onSelect(option, evt);
      }
    }
  }

  render() {
    const {openTrigger, placement, options, selectedIds, children} = this.props;
    const {isOpen} = this.state;

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
            {children()}
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
