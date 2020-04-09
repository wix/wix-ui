import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';
import { style, classes } from './Dropdown.st.css';
import { Popover, Placement, PopoverProps } from '../popover';
import { DropdownContent, IDOMid } from '../dropdown-content';
import { Option } from '../dropdown-option';
import { CLICK, HOVER, OPEN_TRIGGER_TYPE } from './constants';

export type DropdownProps = Pick<PopoverProps, 'fixed' | 'flip' | 'moveBy'> & {
  /** The location to display the content */
  placement: Placement;
  /** Should display arrow with the content */
  showArrow?: boolean;
  /** render function that renders the target element with the state */
  children: React.ReactNode;
  /** The dropdown options array */
  options: Option[];
  /** Trigger type to open the content */
  openTrigger: OPEN_TRIGGER_TYPE;
  /** Handler for when an option is hovered */
  onOptionHover?(option: (Option & IDOMid) | null): void;
  /** Handler for when an option is selected */
  onSelect(option: Option | null): void;
  /** Handler for when a mouse down event occurs on an option */
  onContentMouseDown?(e: React.MouseEvent): void;
  /** Handler for when an option is deselected */
  onDeselect(option: Option | null): void;
  /** Handler for when dropdown becomes opened/closed */
  onExpandedChange?(isExpanded: boolean): void;
  /** initial selected option ids */
  initialSelectedIds: (string | number)[];
  /** A callback for when initial selected options are set */
  onInitialSelectedOptionsSet(options: Option[]): void;
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
  role?: string;
  /** Id */
  id?: string;
  /** DOM id of options list element */
  contentId?: string;
  /** Allow onSelect event to be triggered upon re-selecting an option */
  allowReselect?: boolean;
  /** Options box z-index */
  optionsContainerZIndex?: number;
};

export interface DropdownState {
  isOpen: boolean;
  selectedIds: (string | number)[];
}

/**
 * Dropdown
 */
export class DropdownComponent extends React.PureComponent<
  DropdownProps & InjectedOnClickOutProps,
  DropdownState
> {
  static displayName = 'Dropdown';
  private dropdownContentRef: DropdownContent | null = null;

  constructor(props: DropdownProps & InjectedOnClickOutProps) {
    super(props);

    this.close = this.close.bind(this);
    this.onPopoverClick = this.onPopoverClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onOptionHover = this.onOptionHover.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
    this._onContentMouseDown = this._onContentMouseDown.bind(this);
  }

  state = { isOpen: false, selectedIds: [] };

  componentDidMount() {
    this.initializeSelectedOptions();
  }

  componentDidUpdate(prevProps: DropdownProps) {
    if (
      !DropdownComponent.areSelectedIdsEqual(
        this.props.initialSelectedIds,
        prevProps.initialSelectedIds,
      )
    ) {
      this.initializeSelectedOptions();
    }
  }

  static areSelectedIdsEqual = (selectedIds1, selectedIds2) => {
    if (
      (selectedIds1 === undefined && selectedIds2 === undefined) ||
      (selectedIds1 === null && selectedIds2 === null)
    ) {
      return true;
    }
    return (
      Array.isArray(selectedIds1) &&
      Array.isArray(selectedIds2) &&
      selectedIds1.length === selectedIds2.length &&
      selectedIds1.every((item, index) => item === selectedIds2[index])
    );
  };

  initializeSelectedOptions() {
    const {
      initialSelectedIds,
      options,
      onInitialSelectedOptionsSet,
    } = this.props;

    const selectedOptions = (initialSelectedIds || [])
      .map(id => options.find(option => id === option.id))
      .filter(option => option && !option.isDisabled && option.isSelectable);

    const selectedIds = selectedOptions.map(x => x && x.id);
    this.setState({
      selectedIds: selectedIds as (string | number)[],
    });

    onInitialSelectedOptionsSet && onInitialSelectedOptionsSet(selectedOptions);
  }

  handleClickOutside() {
    this.close();
  }

  _onExpandedChange() {
    if (this.props.onExpandedChange) {
      this.props.onExpandedChange(this.state.isOpen);
    }
  }

  open(onOpen: () => void = () => null) {
    if (this.state.isOpen) {
      onOpen && onOpen();
    } else {
      this.setState({ isOpen: true }, () => {
        this._onExpandedChange();
        onOpen();
      });
    }
  }

  onPopoverClick() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  close() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false }, this._onExpandedChange);
    }
  }

  getSelectedOption() {
    return this.dropdownContentRef
      ? this.dropdownContentRef.getSelectedOption()
      : null;
  }

  onKeyboardSelect() {
    const selectedOption = this.getSelectedOption();
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
      this.dropdownContentRef &&
        this.dropdownContentRef.onKeyDown(eventKey, evt);

      switch (eventKey) {
        case 'Enter': {
          this.onKeyboardSelect();
          const { multi } = this.props;
          !multi && this.close();

          if (this.getSelectedOption() !== null) {
            evt.preventDefault();
          }
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
      }
    });
  }

  _onContentMouseDown(e) {
    const { onContentMouseDown } = this.props;
    onContentMouseDown && onContentMouseDown(e);
  }

  onOptionHover(option: (Option & IDOMid) | null) {
    if (this.props.onOptionHover) {
      this.props.onOptionHover(option);
    }
  }

  onOptionClick(option: Option | null) {
    const { onSelect, onDeselect, multi, allowReselect } = this.props;
    const { selectedIds } = this.state;
    const newState = {
      isOpen: !!multi,
      selectedIds,
    };

    let callback = onSelect;
    if (multi) {
      // Multi select
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
      // Single select
    } else if (option) {
      // if option was clicked (could be null when Autocomplete receives a new string)
      if (selectedIds.includes(option.id)) {
        this.close();
        if (!allowReselect) {
          // if clicked on the selected item, exit and do nothing
          return;
        }
      } else {
        // if clicked on a new option, make it the selected
        newState.selectedIds = [option.id];
      }
    } else {
      // if non existing option selected, unselect existing ones
      newState.selectedIds = [];
    }

    this.setState(newState, () => callback(option));
  }

  render() {
    const {
      openTrigger,
      placement,
      options,
      children,
      showArrow,
      fixedFooter,
      fixedHeader,
      disabled,
      timeout,
      forceContentElementVisibility,
      style: inlineStyles,
      id,
      flip,
      fixed,
      moveBy,
      role,
      contentId,
      optionsContainerZIndex,
    } = this.props;
    const { isOpen, selectedIds } = this.state;
    const hasContent = Boolean(
      (options && options.length) || fixedHeader || fixedFooter,
    );
    const shown =
      forceContentElementVisibility || (isOpen && !disabled && hasContent);

    return (
      <Popover
        className={style(classes.root, { 'content-visible': shown })}
        placement={placement}
        shown={shown}
        showArrow={showArrow}
        timeout={timeout}
        onClick={
          !disabled && openTrigger === CLICK
            ? () => this.onPopoverClick()
            : undefined
        }
        onMouseEnter={
          !disabled && openTrigger === HOVER ? () => this.open() : undefined
        }
        onKeyDown={!disabled ? this.onKeyDown : undefined}
        onMouseLeave={
          !disabled && openTrigger === HOVER ? this.close : undefined
        }
        style={inlineStyles}
        id={id}
        flip={flip}
        fixed={fixed}
        moveBy={moveBy}
        role={role}
        zIndex={optionsContainerZIndex}
      >
        <Popover.Element>{children}</Popover.Element>
        <Popover.Content>
          <DropdownContent
            className={style.dropdownContent}
            data-hook="dropdown-content"
            ref={dropdownContent => (this.dropdownContentRef = dropdownContent)}
            options={options}
            fixedFooter={fixedFooter}
            fixedHeader={fixedHeader}
            selectedIds={selectedIds}
            onOptionClick={this.onOptionClick}
            onOptionHover={this.onOptionHover}
            onMouseDown={this._onContentMouseDown}
            optionsContainerId={contentId}
          />
        </Popover.Content>
      </Popover>
    );
  }
}

export const Dropdown = onClickOutside(DropdownComponent);
