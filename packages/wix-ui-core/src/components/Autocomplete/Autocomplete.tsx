import * as React from 'react';
import style from './Autocomplete.st.css';
import {InputWithOptions} from '../../baseComponents/InputWithOptions';
import {Option, OptionFactory, optionPropType} from '../../baseComponents/DropdownOption/OptionFactory';
import {Divider} from '../Divider';
import {func , bool, object, arrayOf, number, string, oneOfType, node, oneOf, Requireable} from 'prop-types';
import {InputProps} from '../Input';

const createDivider = (value = null) =>
  OptionFactory.createDivider({className: style.divider, value});

export interface AutocompleteProps {
  /** The dropdown options array */
  options: Array<Option>;
  /** Handler for when an option is selected */
  onSelect?: (option: Option) => void;
  /** initial selected option id */
  initialSelectedId?: string | number;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
  onManualInput?: (value: string) => void;
  /** Input prop types */
  inputProps?: InputProps;
}

export interface AutocompleteState {
  inputValue: string;
}

export class Autocomplete extends React.PureComponent<AutocompleteProps, AutocompleteState> {
  static displayName = 'Autocomplete';
  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(optionPropType).isRequired,
    /** Handler for when an option is selected */
    onSelect: func,
    /** initial selected option id */
    initialSelectedId: oneOfType([number, string]),
    /** An element that always appears at the top of the options */
    fixedHeader: node,
    /** An element that always appears at the bottom of the options */
    fixedFooter: node,
    /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
    onManualInput: func,
    /** Input prop types */
    inputProps: object
  };

  static createOption = OptionFactory.create;
  static createDivider = createDivider;

  constructor(props: AutocompleteProps) {
    super(props);

    this.state = {
      inputValue: (props.inputProps && props.inputProps.value) || ''
    };

    this._onSelect = this._onSelect.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInitialSelectedOptionsSet = this._onInitialSelectedOptionsSet.bind(this);
  }

  _onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.state.inputValue !== event.target.value) {
      this.setState({
        inputValue: event.target.value
      });
    }
  }

  _onSelect(option: Option) {
    if (this.state.inputValue !== option.value) {
      this.setState({
        inputValue: option.value
      });

      const {onSelect} = this.props;
      onSelect && onSelect(option);
    }
  }

  _createInputProps() {
    const {inputValue} = this.state;
    return Object.assign(
      {},
      this.props.inputProps,
      {
        value: inputValue,
        onChange: this._onInputChange
      });
  }

  _onInitialSelectedOptionsSet(options: Array<Option>) {
    const selectedValue = options.length ? options[0].value : '';
    if (this.state.inputValue !== selectedValue) {
      this.setState({
        inputValue: selectedValue
      });
    }
  }

  render() {
    const {options, initialSelectedId, fixedHeader, fixedFooter, onManualInput} = this.props;
    const {inputValue} = this.state;
    const inputProps = this._createInputProps();

    return (
      <InputWithOptions
        {...style('root', {}, this.props)}
        onSelect={this._onSelect}
        initialSelectedIds={initialSelectedId || initialSelectedId === 0 ? [initialSelectedId] : null}
        onInitialSelectedOptionsSet={this._onInitialSelectedOptionsSet}
        fixedHeader={fixedHeader}
        fixedFooter={fixedFooter}
        onManualInput={onManualInput}
        options={options}
        inputProps={inputProps}
      />
    );
  }
}
