import * as React from 'react';
import style from './InputWithOptions.st.css';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Placement} from '../../baseComponents/Popover';
import {Option} from '../../baseComponents/DropdownOption';
import {OPEN_TRIGGER_TYPE} from '../../baseComponents/Dropdown/constants';
import {bool, object, arrayOf, string, func, oneOfType, number, node, oneOf, Requireable} from 'prop-types';
import {Input, InputProps} from '../Input';

export interface InputWithOptionsProps {
  /** The location to display the content */
  placement?: Placement;
  /** The dropdown options array */
  options: Array<Option>;
  /** Trigger type to open the content */
  openTrigger?: OPEN_TRIGGER_TYPE;
  /** Handler for when an option is selected */
  onSelect?: (option: Option) => void;
  /** Handler for when an option is deselected */
  onDeselect?: (option: Option) => void;
  /** initial selected option ids */
  initialSelectedIds?: Array<string | number>;
  /** Should close content on select */
  closeOnSelect?: boolean;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Callback for when the editing is changed */
  onEditingChanged?: (isEditing: boolean) => void;
  /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
  onManualInput?: (value: string) => void;
  /** Input prop types */
  inputProps: InputProps;
  /** Input component */
  InputComponent?: React.ComponentClass<InputProps> | React.SFC<InputProps>;
  /** Makes the component disabled */
  disabled?: boolean;
}

/**
 * InputWithOptions
 */
export class InputWithOptions extends React.PureComponent<InputWithOptionsProps> {
  static displayName = 'InputWithOptions';
  static defaultProps = {
    openTrigger: 'click',
    placement: 'bottom-start',
    closeOnSelect: true,
    initialSelectedIds: [],
    onSelect: () => null,
    onDeselect: () => null,
    onManualInput: () => null,
    InputComponent: Input
  };

  static propTypes = {
    /** The location to display the content */
    placement: oneOf(['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']),
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Trigger type to open the content */
    openTrigger: oneOf(['click', 'hover']),
    /** Handler for when an option is selected */
    onSelect: func,
    /** Handler for when an option is deselected */
    onDeselect: func,
    /** initial selected option ids */
    initialSelectedIds: oneOfType([arrayOf(number), arrayOf(string)]),
    /** Should close content on select */
    closeOnSelect: bool,
    /** An element that always appears at the top of the options */
    fixedHeader: node,
    /** An element that always appears at the bottom of the options */
    fixedFooter: node,
    /** Callback for when the editing is changed */
    onEditingChanged: func,
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
    onManualInput: func,
    /** Input prop types */
    inputProps: object.isRequired,
    /** Input component */
    InputComponent: func,
    /** Makes the component disabled */
    disabled: bool
  };

  dropdownRef;

  constructor() {
    super();

    this.onFocus = this.onFocus.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onSelect(option: Option) {
    const {onSelect, onManualInput, inputProps} = this.props;
    if (option) {
      onSelect(option);
    } else {
      inputProps.value && onManualInput(inputProps.value);
    }
  }

  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      const {onEditingChanged} = this.props;
      onEditingChanged && onEditingChanged(true);
    }

    const {onKeyDown} = this.props.inputProps;
    onKeyDown && onKeyDown(event);
  }

  onFocus(event) {
    const {onEditingChanged} = this.props;
    onEditingChanged && onEditingChanged(false);

    const {onFocus} = this.props.inputProps;
    onFocus && onFocus(event);
  }

  render () {
    const {
      placement,
      options,
      openTrigger,
      initialSelectedIds,
      closeOnSelect,
      fixedFooter,
      fixedHeader,
      onDeselect,
      disabled,
      InputComponent,
      inputProps} = this.props;

    return (
      <Dropdown
        {...style('root', {}, this.props)}
        ref={dropdown => this.dropdownRef = dropdown}
        placement={placement}
        openTrigger={openTrigger}
        disabled={disabled}
        onSelect={this.onSelect}
        showArrow={false}
        fixedFooter={fixedFooter}
        fixedHeader={fixedHeader}
        onDeselect={onDeselect}
        initialSelectedIds={initialSelectedIds}
        options={options}
        closeOnSelect={closeOnSelect}>
        <InputComponent
          {...inputProps}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
          disabled={disabled}
        />
      </Dropdown>
    );
  }
}
