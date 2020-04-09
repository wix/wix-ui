import * as React from 'react';
import { style, classes } from './Autocomplete.st.css';
import { InputWithOptions } from '../input-with-options';
import { Option, OptionFactory } from '../dropdown-option/OptionFactory';
import { InputProps, AriaAutoCompleteType } from '../input';

const createDivider = (value = null) =>
  OptionFactory.createDivider({ className: style.divider, value });

export interface AutocompleteProps {
  /** The dropdown options array */
  options: Option[];
  /** Handler for when an option is selected */
  onSelect?(option: Option): void;
  /** initial selected option id */
  initialSelectedId?: string | number;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Callback when the user pressed the Enter key or Tab key after he wrote in the Input field - meaning the user selected something not in the list  */
  onManualInput?(value: string): void;
  /** Standard React Input autoFocus (focus the element on mount) */
  autoFocus?: boolean;
  /** Makes the component disabled */
  disabled?: boolean;
  /** Standard input onBlur callback */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Standard input onChange callback */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Standard input onFocus callback */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /** Placeholder to display */
  placeholder?: string;
  /** Is in error state */
  error?: string | boolean;
  /** Prefix */
  prefix?: React.ReactNode;
  /** Suffix */
  suffix?: React.ReactNode;
  inputProps?: InputProps;
}

export interface AutocompleteState {
  inputValue: string;
}

export class Autocomplete extends React.PureComponent<
  AutocompleteProps,
  AutocompleteState
> {
  static displayName = 'Autocomplete';

  static createOption = OptionFactory.create;
  static createDivider = createDivider;

  state = { inputValue: '' };

  _onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.inputValue !== event.target.value) {
      this.setState({
        inputValue: event.target.value,
      });
      const { onChange } = this.props;
      onChange && onChange(event);
    }
  };

  _onSelect = (option: Option) => {
    if (this.state.inputValue !== option.value) {
      this.setState({
        inputValue: option.value,
      });
      const { onSelect } = this.props;
      onSelect && onSelect(option);
    }
  };

  _createInputProps() {
    const { inputValue } = this.state;
    const {
      autoFocus,
      disabled,
      onBlur,
      onFocus,
      placeholder,
      error,
      prefix,
      suffix,
      inputProps,
    } = this.props;
    return {
      ...inputProps,
      value: inputValue,
      onChange: this._onInputChange,
      autoFocus,
      disabled,
      onBlur,
      onFocus,
      placeholder,
      error,
      suffix,
      prefix,
      'aria-autocomplete': 'both' as AriaAutoCompleteType,
    };
  }

  _onInitialSelectedOptionsSet = (options: Option[]) => {
    const selectedValue = options.length ? options[0].value : '';
    if (selectedValue && this.state.inputValue !== selectedValue) {
      this.setState({
        inputValue: selectedValue,
      });
    }
  };

  render() {
    const {
      options,
      initialSelectedId,
      fixedHeader,
      fixedFooter,
      onManualInput,
      disabled,
    } = this.props;
    const inputProps = this._createInputProps();
    return (
      <InputWithOptions
        className={style(classes.root, { disabled })}
        onSelect={this._onSelect}
        initialSelectedIds={
          initialSelectedId || initialSelectedId === 0
            ? [initialSelectedId]
            : null
        }
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
