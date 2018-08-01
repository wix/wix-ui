import * as React from 'react';
import onClickOutside, {InjectedOnClickOutProps, OnClickOutProps} from 'react-onclickoutside';
import style from './Dropdown.st.css';
import {Popover, Placement} from '../../components/Popover';
import {DropdownContent} from '../DropdownContent';
import {Option} from '../DropdownOption';
import {CLICK, HOVER, OPEN_TRIGGER_TYPE} from './constants';

const isEqual = require('lodash/isEqual');

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
  onSelect: (option: Option | null) => void;
  /** Handler for when an option is deselected */
  onDeselect: (option: Option | null) => void;
  /** initial selected option ids */
  initialSelectedIds: Array<string | number>;
  /** A callback for when initial selected options are set */
  onInitialSelectedOptionsSet: (options: Array<Option>) => void;
  /** set true for multiple selection, false for single */
  multi?: boolean;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Makes the component disabled */
  disabled?: boolean;
  /** Animation timer */
  timeout?: number;
  /** If set to true, content element will always be visible, used for preview mode */
  forceContentElementVisibility?: boolean;
  /** Inline styles */
  style?: object;
  /** Id */
  id?: string;
}

export interface DropdownState {
  isOpen: boolean;
  selectedIds: Array<string | number>;
}

/**
 * Dropdown
 */
export class DropdownComponent extends React.PureComponent<DropdownProps & InjectedOnClickOutProps, DropdownState> {
  static displayName = 'Dropdown';
  private dropdownContentRef: DropdownContent | null = null;

  constructor(props: DropdownProps & InjectedOnClickOutProps) {
    super(props);

    this.close = this.close.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  state = {isOpen: false, selectedIds: []};

  componentWillMount() {
    this.initializeSelectedOptions(this.props);
  }

  componentWillReceiveProps(props: DropdownProps) {
    if (!isEqual(props.initialSelectedIds, this.props.initialSelectedIds)) {
      this.initializeSelectedOptions(props);
    }
  }

  initializeSelectedOptions(props) {
    const {initialSelectedIds, options, onInitialSelectedOptionsSet} = props;

    const selectedOptions = (initialSelectedIds || [])
      .map(id => options.find(option => id === option.id))
      .filter(option => option && !option.isDisabled && option.isSelectable);

    const selectedIds = selectedOptions.map(x => x && x.id);
    this.setState({
      selectedIds: selectedIds as Array<string | number>
    });

    onInitialSelectedOptionsSet && onInitialSelectedOptionsSet(selectedOptions);
  }

  handleClickOutside() {
    this.close();
  }

  open(onOpen: () => void = () => null) {
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

  onKeyboardSelect() {
    const selectedOption = this.dropdownContentRef ? this.dropdownContentRef.onKeyboardSelect() : null;
    this.onOptionClick(selectedOption);
  }

  isClosingKey(key) {
    return key === 'Tab' || key === 'Enter' || key === 'Escape';
  }

  onKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    const eventKey = evt.key;

    if (!this.state.isOpen && this.isClosingKey(eventKey)) {
      return;
    }

    this.open(() => {
      this.dropdownContentRef && this.dropdownContentRef.onKeyDown(eventKey);
      switch (eventKey) {
        case 'Enter': {
          this.onKeyboardSelect();
          const {multi} = this.props;
          !multi && this.close();
          break;
        }
        case 'Tab': {
          this.onKeyboardSelect();
          this.close();
          break;
        }
        case 'Escape': {
          this.close();
          break;
        }
        default:
          break;
      }
    });
  }

  onOptionClick(option: Option | null) {
    const {onSelect, onDeselect, multi} = this.props;
    const {selectedIds} = this.state;
    const newState = {
      isOpen: multi,
      selectedIds
    };

    let callback = onSelect;
    if (multi) { // Multi select
      if (option) {
        // if option was clicked (could be null when Autocomplete receives a new string)
        if (selectedIds.includes(option.id)) {
          // if clicked a selected option, unselect it
          newState.selectedIds = selectedIds.filter(x => x !== option.id);
          callback = onDeselect;
        } else {
          // if clicked a new option, add it to selection
          newState.selectedIds = [...selectedIds, option.id];
        }
      }
    } else { // Single select
      if (option) {
        // if option was clicked (could be null when Autocomplete receives a new string)
        if (selectedIds.includes(option.id)) {
          // if clicked on the selected item, exit and do nothing
          return this.close();
        } else {
          // if clicked on a new option, make it the selected
          newState.selectedIds = [option.id];
        }
      } else {
        // if non existing option selected, unselect existing ones
        newState.selectedIds = [];
      }
    }

    this.setState(newState, () => callback(option));
  }

  render() {
    const {openTrigger, placement, options, children, showArrow, fixedFooter, fixedHeader, disabled, timeout, forceContentElementVisibility, style: inlineStyles, id} = this.props;
    const {isOpen, selectedIds} = this.state;
    const hasContent = Boolean((options && options.length) || fixedHeader || fixedFooter);

    return (
      <Popover
        {...style('root', {}, this.props)}
        placement={placement}
        shown={forceContentElementVisibility || (isOpen && !disabled && hasContent)}
        showArrow={showArrow}
        timeout={timeout}
        onClick={!disabled && openTrigger === CLICK ? () => this.open() : undefined}
        onMouseEnter={!disabled && openTrigger === HOVER ? () => this.open() : undefined}
        onKeyDown={!disabled ? this.onKeyDown : undefined}
        onMouseLeave={!disabled && openTrigger === HOVER ? this.close : undefined}
        style={inlineStyles}
        id={id}
      >
        <Popover.Element>
          {children}
        </Popover.Element>
        <Popover.Content>
          <DropdownContent
            className={style.dropdownContent}
            ref={dropdownContent => this.dropdownContentRef = dropdownContent}
            options={options}
            fixedFooter={fixedFooter}
            fixedHeader={fixedHeader}
            selectedIds={selectedIds}
            onOptionClick={this.onOptionClick}
          />
        </Popover.Content>
      </Popover>
    );
  }
}

export const Dropdown = onClickOutside(DropdownComponent);
