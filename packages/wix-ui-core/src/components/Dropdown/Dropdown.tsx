import * as React from 'react';
import Popover, {SharedPopoverProps} from '../Popover';
import {string, oneOf, arrayOf, object, func, number} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';
import DropdownContent, {Option} from './DropdownContent';
import {CLICK, CLICK_TYPE, HOVER, HOVER_TYPE, SINGLE_SELECT, SINGLE_SELECT_TYPE, MULTI_SELECT, MULTI_SELECT_TYPE} from './constants';

interface DropdownProps {
  children: (state: DropdownState) => React.ReactNode;
}

export interface SharedDropdownProps extends SharedPopoverProps {
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  options: Array<Option>;
  onSelect?: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  onDeselect?: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  selectedId?: number;
  selectedIds?: Array<number>;
  mode?: SINGLE_SELECT_TYPE | MULTI_SELECT_TYPE;
}

interface DropdownState {
  isOpen: boolean;
  selectedOptions: Array<Option>;
}

class Dropdown extends React.PureComponent<DropdownProps & SharedDropdownProps, DropdownState> {

  static defaultProps = {
    openTrigger: CLICK,
    placement: 'bottom-start',
    options: [],
    mode: SINGLE_SELECT,
    onSelect: () => null,
    onDeselect: () => null
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
    /** Selected option id */
    selectedId: number,
    /** Selected option ids for multi selected */
    selectedIds: arrayOf(number),
    /** render function that renders the element with the state */
    children: func,
    /** Dropdown mode - single / multi select */
    mode: oneOf([SINGLE_SELECT, MULTI_SELECT])
  };

  constructor(props) {
    super(props);

    this._onOptionClick = this._onOptionClick.bind(this);
    const {selectedId, selectedIds, options} = props;
    const selectedOptions =
      (selectedIds || (selectedId ? [selectedId] : []))
        .map(id => options.find(option => id === option.id))
        .filter(option => !!option);

    this.state = {
      isOpen: false,
      selectedOptions
    };
  }

  handleClickOutside() {
    this.close();
  }

  _isSingleSelect() {
    return this.props.mode === SINGLE_SELECT;
  }

  open() {
    this.setState({isOpen: true});
  }

  close () {
    this.setState({isOpen: false});
  }

  _onOptionClick(option, evt) {
    const isSingleSelect = this._isSingleSelect();
    const {onSelect, onDeselect} = this.props;
    const newState = {
      isOpen: !isSingleSelect,
      selectedOptions: []
    };

    if (isSingleSelect) {
      newState.selectedOptions = [option];
      onSelect(option, evt);
    } else {
      const {selectedOptions} = this.state;
      if (selectedOptions.find(x => x.id === option.id)) {
        newState.selectedOptions = selectedOptions.filter(x => x.id !== option.id);
        onDeselect(option, evt);
      } else {
        newState.selectedOptions = [...selectedOptions, option];
        onSelect(option, evt);
      }
    }

    this.setState(newState);
  }

  render() {
    const {openTrigger, placement, options, children} = this.props;
    const {isOpen} = this.state;

    return (
      <Popover
        placement={placement}
        shown={isOpen}
        onMouseEnter={openTrigger === HOVER ? () => this.open() : null}
        onMouseLeave={openTrigger === HOVER ? () => this.close() : null}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={openTrigger === CLICK ? () => this.open() : null}>
            {children(this.state)}
          </div>
        </Popover.Element>
        <Popover.Content>
          <DropdownContent options={options} onOptionClick={this._onOptionClick} />
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(onClickOutside(Dropdown));
