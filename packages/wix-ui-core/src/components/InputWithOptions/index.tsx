import * as React from 'react';
import style from './InputWithOptionsStyle.st.css';
import {Dropdown, TriggerElementProps} from '../../baseComponents/Dropdown';
import {Placement, PlacementPropType} from '../../baseComponents/Popover';
import {Option} from '../../baseComponents/DropdownOption';
import {CLICK, HOVER, OPEN_TRIGGER_TYPE} from '../../baseComponents/Dropdown/constants';
import {bool, object, arrayOf, string, func, oneOfType, number, node, oneOf} from 'prop-types';
import {Input} from '../Input';

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
  /** Input value */
  inputValue?: string;
  /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list, this function will return a suggested option as the second parameter if found one */
  onManualInput?: (value: string) => void;
  /** Event handler for when the input changes */
  onInputChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  /** Event handler for when the input loses focus */
  onBlur?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;
  /** Event handler for when the input gains focus */
  onFocus?: React.EventHandler<React.FocusEvent<HTMLInputElement>>;
}

export interface InputWithOptionsState {
  inputValue: string;
}

/**
 * InputWithOptions
 */
export class InputWithOptions extends React.PureComponent<InputWithOptionsProps, InputWithOptionsState> {
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
    /** Input value */
    inputValue: string,
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list, this function will return a suggested option as the second parameter if found one */
    onManualInput: func,
    /** Event handler for when the input changes */
    onInputChange: func,
    /** Event handler for when the input loses focus */
    onBlur: func,
    /** Event handler for when the input gains focus */
    onFocus: func
  };

  constructor(props: InputWithOptionsProps) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.state = {inputValue: props.inputValue || ''};
  }

  componentWillReceiveProps(nextProps: InputWithOptionsProps) {
    if (this.state.inputValue !== nextProps.inputValue) {
      this.setState({
        inputValue: nextProps.inputValue
      });
    }
  }

  onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: event.target.value
    });

    const {onInputChange} = this.props;
    onInputChange && onInputChange(event);
  }

  onInputKeyDown(event: React.KeyboardEvent<HTMLElement>, onDropdownKeyDown: (evt: React.KeyboardEvent<HTMLElement>) => void) {
    onDropdownKeyDown(event);
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
      onFocus,
      onBlur,
      onSelect,
      onDeselect} = this.props;
    const {inputValue} = this.state;

    return (
      <Dropdown
        {...style('root', {}, this.props)}
        placement={placement}
        openTrigger={openTrigger}
        onSelect={onSelect}
        showArrow={false}
        optionsMaxHeight={optionsMaxHeight}
        fixedFooter={fixedFooter}
        fixedHeader={fixedHeader}
        onDeselect={onDeselect}
        initialSelectedIds={initialSelectedIds}
        options={options}
        closeOnSelect={closeOnSelect}>
        {
          ({onKeyDown}: TriggerElementProps) =>
            <Input
              data-hook="dropdown-input"
              onFocus={onFocus}
              onBlur={onBlur}
              value={inputValue}
              onChange={this.onInputChange}
              onKeyDown={event => this.onInputKeyDown(event, onKeyDown)}/>
        }
      </Dropdown>
    );
  }
}
