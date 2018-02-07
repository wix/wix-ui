import * as React from 'react';
import style from './InputWithOptions.st.css';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Placement, PlacementPropType} from '../../baseComponents/Popover';
import {Option} from '../../baseComponents/DropdownOption';
import {CLICK, HOVER, OPEN_TRIGGER_TYPE} from '../../baseComponents/Dropdown/constants';
import {bool, object, arrayOf, string, func, oneOfType, number, node, oneOf} from 'prop-types';
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
  /** Maximum height of the options */
  optionsMaxHeight?: number;
  /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
  onManualInput?: (value: string) => void;
  /** Input prop types */
  inputProps?: InputProps;
}

/**
 * InputWithOptions
 */
export class InputWithOptions extends React.PureComponent<InputWithOptionsProps> {
  static displayName = 'InputWithOptions';
  static defaultProps = {
    openTrigger: CLICK as any,
    placement: 'bottom-start' as any,
    closeOnSelect: true,
    initialSelectedIds: [],
    onSelect: () => null,
    onDeselect: () => null
  };

  static propTypes = {
    /** The location to display the content */
    placement: PlacementPropType,
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Trigger type to open the content */
    openTrigger: oneOf([CLICK, HOVER]),
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
    /** Maximum height of the options */
    optionsMaxHeight: number,
    /** Input prop types */
    inputProps: object
  };

  private dropdownRef;

  constructor() {
    super();

    this.onSelect = this.onSelect.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
    this.dropdownRef.getInstance().onKeyDown(evt);
    const {inputProps} = this.props;
    inputProps && inputProps.onKeyDown && inputProps.onKeyDown(evt);
  }

  onSelect(option: Option) {
    const {onSelect, onManualInput, inputProps} = this.props;
    if (option) {
      onSelect && onSelect(option);
    } else {
      onManualInput && inputProps && inputProps.value && onManualInput(inputProps.value);
    }
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
      optionsMaxHeight,
      onDeselect,
      inputProps} = this.props;

    return (
      <Dropdown
        {...style('root', {}, this.props)}
        ref={dropdown => this.dropdownRef = dropdown}
        placement={placement}
        openTrigger={openTrigger}
        onSelect={this.onSelect}
        showArrow={false}
        optionsMaxHeight={optionsMaxHeight}
        fixedFooter={fixedFooter}
        fixedHeader={fixedHeader}
        onDeselect={onDeselect}
        initialSelectedIds={initialSelectedIds}
        options={options}
        closeOnSelect={closeOnSelect}>
        <Input
          {...inputProps}
          data-hook="dropdown-input"
          onKeyDown={this.onKeyDown}
        />
      </Dropdown>
    );
  }
}
