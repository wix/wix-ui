import * as React from 'react';
import Popover, {Placement} from '../Popover';
import {string, oneOf, arrayOf, object, func, number} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';
import DropdownContent, {Option} from './DropdownContent';

export const CLICK = 'click';
export type CLICK_TYPE = 'click';

export const HOVER = 'hover';
export type HOVER_TYPE = 'hover';

export const SINGLE_SELECT = 'singleSelect';
export type SINGLE_SELECT_TYPE = 'singleSelect';

export const MULTI_SELECT = 'multiSelect';
export type MULTI_SELECT_TYPE = 'multiSelect';

interface DropdownProps {
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  placement?: Placement;
  options: Array<Option>;
  onSelect?: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  onDeselect?: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  selectedId?: number;
  selectedIds?: Array<number>;
  mode?: SINGLE_SELECT_TYPE | MULTI_SELECT_TYPE;
  children: (state: DropdownState) => React.ReactNode;
}

interface DropdownState {
  isOpen: boolean;
  selectedOptions: Array<Option>;
}

class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {

  static defaultProps = {
    openTrigger: CLICK,
    placement: 'bottom-start',
    options: [],
    mode: SINGLE_SELECT
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
    this.setState({isOpen: false});
  }

  isSingleSelect() {
    return this.props.mode === SINGLE_SELECT;
  }

  _onOptionClick(option, evt) {
    const isSingleSelect = this.isSingleSelect();
    const {onSelect, onDeselect} = this.props;
    const newState = {
      isOpen: !isSingleSelect,
      selectedOptions: []
    };

    if (isSingleSelect) {
      newState.selectedOptions = [option];
      onSelect && onSelect(option, evt);
    } else {
      const {selectedOptions} = this.state;
      if (selectedOptions.find(x => x.id === option.id)) {
        newState.selectedOptions = selectedOptions.filter(x => x.id !== option.id);
        onDeselect && onDeselect(option, evt);
      } else {
        newState.selectedOptions = [...selectedOptions, option];
        onSelect && onSelect(option, evt);
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
        onMouseEnter={openTrigger === HOVER ? () => this.setState({isOpen: true}) : null}
        onMouseLeave={openTrigger === HOVER ? () => this.setState({isOpen: false}) : null}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={openTrigger === CLICK ? () => this.setState({isOpen: true}) : null}
            style={{display: 'inline-block'}}>
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
