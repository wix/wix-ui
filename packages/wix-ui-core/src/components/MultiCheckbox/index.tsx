import * as React from 'react';
import style from './MultiCheckboxStyle.st.css';
import {arrayOf, object, func} from 'prop-types';
import {InputWithOptions} from '../InputWithOptions';
import {Option} from '../../baseComponents/DropdownOption';

export interface MultiCheckboxProps {
  /** The dropdown options array */
  options: Array<Option>;
  /** Handler for when an option is selected */
  onSelect?: (option: Option) => void;
  /** Handler for when an option is deselected */
  onDeselect?: (option: Option) => void;
}

export interface MultiCheckboxState {
  inputValue: string;
  displayedOptions: Array<Option>;
}

export class MultiCheckbox extends React.PureComponent<MultiCheckboxProps, MultiCheckboxState> {

  static displayName = 'MultiCheckbox';
  static defaultProps = {
    onSelect: () => null,
    onDeselect: () => null
  };

  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is selected */
    onSelect: func,
    /** Handler for when an option is deselected */
    onDeselect: func,
  };

  constructor(props: MultiCheckboxProps) {
    super(props);

    this.state = {
      inputValue: '',
      displayedOptions: props.options
    };

    this.onSelect = this.onSelect.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onDeselect(option: Option) {
    const {onDeselect} = this.props;
    const {inputValue} = this.state;
    this.setState({
      inputValue: (inputValue || '').split(' ').filter(x => x !== option.value).join(' ').trim()
    });

    onDeselect(option);
  }

  onSelect(option: Option) {
    const {onSelect} = this.props;
    const {inputValue} = this.state;
    this.setState({
      inputValue: [...((inputValue || '').split(' ')), option.value].join(' ').trim()
    });

    onSelect(option);
  }

  onInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const {options} = this.props;
    const {value} = evt.target;
    this.setState({
      inputValue: value,
      displayedOptions: options.filter(x => !x.value || x.value.includes(value))
    });
  }

  render() {
    const {inputValue, displayedOptions} = this.state;

    return (
      <InputWithOptions
        {...style('root', {}, this.props)}
        closeOnSelect={false}
        inputValue={inputValue}
        options={displayedOptions}
        onInputChange={this.onInputChange}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        />
    );
  }
}
