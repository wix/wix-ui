import * as React from 'react';
import { style, classes } from './InputWithOptions.st.css';
import { Dropdown, DropdownProps } from '../dropdown';
import { Placement, PopoverProps } from '../popover';
import { Option, OptionFactory } from '../dropdown-option';
import { IDOMid } from '../dropdown-content';
import { OPEN_TRIGGER_TYPE } from '../dropdown/constants';
import { Input, InputProps } from '../input';

export const DataHooks = {
  input: 'input',
  emptyState: 'input-with-options-empty-state',
};

export type InputWithOptionsProps = Pick<
  PopoverProps,
  'fixed' | 'flip' | 'moveBy'
> &
  Pick<DropdownProps, 'onContentMouseDown'> & {
    /** The location to display the content */
    placement?: Placement;
    /** The dropdown options array */
    options: Option[];
    /** Trigger type to open the content */
    openTrigger?: OPEN_TRIGGER_TYPE;
    /** Handler for when an option is selected */
    onSelect?(option: Option): void;
    /** Handler for when an option is deselected */
    onDeselect?(option: Option): void;
    /** initial selected option ids */
    initialSelectedIds?: (string | number)[];
    /** A callback for when initial selected options are set */
    onInitialSelectedOptionsSet?(options: Option[]): void;
    /** set true for multiple selection, false for single */
    multi?: boolean;
    /** An element that always appears at the top of the options */
    fixedHeader?: React.ReactNode;
    /** An element that always appears at the bottom of the options */
    fixedFooter?: React.ReactNode;
    /** Animation timer */
    timeout?: number;
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
    onManualInput?(value: string): void;
    /** Should mark the text that matched the filter */
    highlightMatches?: boolean;
    /** If set to true, content element will always be visible, used for preview mode */
    forceContentElementVisibility?: boolean;
    /** Input prop types */
    inputProps?: InputProps;
    /** Inline styles */
    style?: object;
    /** Id */
    id?: string;
    /** Allow onSelect event to be triggered upon re-selecting an option */
    allowReselect?: boolean;
    /** Filter by predicate */
    filterPredicate?(inputValue: string, optionValue: string): Boolean;
    /** Empty state message to be displayed in case all options are filtered out */
    emptyStateMessage?: string;
    /** Inline style to be passed to empty state message */
    emptyStateStyle?: React.CSSProperties;
    /** Options box z-index */
    optionsContainerZIndex?: number;

    className?: string;
  };

interface InputWithOptionsState {
  ariaActivedescendant: string | null;
  ariaExpanded: boolean;
}

/**
 * InputWithOptions
 */
export class InputWithOptions extends React.PureComponent<
  InputWithOptionsProps,
  InputWithOptionsState
> {
  dropDownRef: InstanceType<typeof Dropdown> | null = null;
  static displayName = 'InputWithOptions';
  static defaultProps = {
    openTrigger: 'click',
    placement: 'bottom-start',
    multi: false,
    initialSelectedIds: [],
    highlightMatches: true,
    onSelect: () => null,
    onDeselect: () => null,
    onManualInput: () => null,
    onInitialSelectedOptionsSet: () => null,
    filterPredicate: (inputValue, optionValue) =>
      optionValue.toLowerCase().includes(inputValue.toLowerCase()),
  };
  static bypassDefaultPropsTypecheck;
  isEditing: boolean = false;
  state = {
    ariaActivedescendant: null,
    ariaExpanded: false,
  };

  _setDropDownRef = (ref: InstanceType<typeof Dropdown>) => {
    this.dropDownRef = ref;
  };

  open() {
    // Using getInstance() is here because closeOutside HOC
    this.dropDownRef && this.dropDownRef.getInstance().open();
  }

  close() {
    this.dropDownRef && this.dropDownRef.getInstance().close();
  }

  changeExpanded = (isExpanded: boolean) => {
    this.setState({ ariaExpanded: isExpanded });
  };

  _filterOptions(): Option[] {
    const {
      highlightMatches,
      inputProps,
      options,
      filterPredicate,
      emptyStateMessage,
      emptyStateStyle,
    } = this.props;
    if (!inputProps.value || !this.isEditing) {
      return options;
    }

    const filteredOptions = options.filter(
      (option: Option) =>
        (!option.isSelectable && option.value) ||
        (option.isSelectable &&
          option.value &&
          filterPredicate(inputProps.value, option.value)),
    );

    if (!highlightMatches) {
      return filteredOptions;
    }

    if (emptyStateMessage && filteredOptions.length === 0) {
      return [
        OptionFactory.create({
          render: () => (
            <div data-hook={DataHooks.emptyState} style={emptyStateStyle || {}}>
              {emptyStateMessage}
            </div>
          ),
          isDisabled: true,
        }),
      ];
    }

    return filteredOptions.map((option: Option) =>
      option.isSelectable && option.value
        ? OptionFactory.createHighlighted(option, inputProps.value)
        : option,
    );
  }

  onOptionHover = (option: (Option & IDOMid) | null) => {
    const ariaActivedescendant = option ? option._DOMid : null;

    this.setState({ ariaActivedescendant });
  };

  _onSelect = (option: Option | null) => {
    this.isEditing = false;
    const { onSelect, onManualInput, inputProps } = this.props;
    if (option) {
      onSelect(option);
    } else {
      onManualInput(inputProps.value);
    }

    this.setState({ ariaActivedescendant: null });
  };

  _onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!event.key.startsWith('Arrow')) {
      this.isEditing = true;
      this.setState({ ariaActivedescendant: null });
    }

    const { onKeyDown } = this.props.inputProps;
    onKeyDown && onKeyDown(event);
  };

  _onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.isEditing = false;
    const { onFocus } = this.props.inputProps;
    onFocus && onFocus(event);
  };

  _onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.isEditing) {
      this._onSelect(null);
    }
    const { onBlur } = this.props.inputProps;
    onBlur && onBlur(event);
  };

  _onContentMouseDown = e => {
    const { onContentMouseDown } = this.props;
    this.isEditing = false;
    onContentMouseDown && onContentMouseDown(e);
  };

  render() {
    const {
      placement,
      openTrigger,
      initialSelectedIds,
      onInitialSelectedOptionsSet,
      multi,
      fixedFooter,
      fixedHeader,
      timeout,
      onDeselect,
      inputProps,
      forceContentElementVisibility,
      style: inlineStyles,
      id,
      allowReselect,
      flip,
      fixed,
      moveBy,
      optionsContainerZIndex,
    } = this.props;

    const contentId = id ? `${id}-content` : null;

    return (
      <Dropdown
        className={style(classes.root, {}, this.props.className)}
        placement={placement}
        openTrigger={openTrigger}
        disabled={inputProps.disabled}
        onSelect={this._onSelect}
        onOptionHover={this.onOptionHover}
        fixedFooter={fixedFooter}
        fixedHeader={fixedHeader}
        onDeselect={onDeselect}
        initialSelectedIds={initialSelectedIds}
        onInitialSelectedOptionsSet={onInitialSelectedOptionsSet}
        options={this._filterOptions()}
        timeout={timeout}
        multi={multi}
        forceContentElementVisibility={forceContentElementVisibility}
        style={inlineStyles}
        id={id}
        ref={this._setDropDownRef}
        allowReselect={allowReselect}
        flip={flip}
        fixed={fixed}
        moveBy={moveBy}
        onContentMouseDown={this._onContentMouseDown}
        contentId={contentId}
        onExpandedChange={this.changeExpanded}
        optionsContainerZIndex={optionsContainerZIndex}
      >
        <Input
          data-hook={DataHooks.input}
          {...inputProps}
          role="combobox"
          aria-autocomplete="both"
          aria-owns={contentId}
          aria-expanded={this.state.ariaExpanded}
          aria-activedescendant={this.state.ariaActivedescendant}
          onKeyDown={this._onKeyDown}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          className={classes.inputComponent}
        />
      </Dropdown>
    );
  }
}
