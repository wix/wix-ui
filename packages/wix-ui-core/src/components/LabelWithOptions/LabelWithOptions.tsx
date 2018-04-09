import * as React from 'react';
import style from './LabelWithOptions.st.css';
import {arrayOf, bool, number, func, oneOfType, string, node, Requireable} from 'prop-types';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Checkbox} from '../Checkbox';
import {Option, optionPropType, OptionFactory} from '../../baseComponents/DropdownOption';
import {Label} from '../Label';
import {CLICK} from '../../baseComponents/Dropdown/constants';
import {noop} from '../../utils';

const createDivider = (value = null) =>
  OptionFactory.createDivider({className: style.divider, value});

export interface LabelWithOptionsProps {
  /** The dropdown options array */
  options: Array<Option>;
  /** Handler for when an option is selected */
  onSelect?: (option: Option) => void;
  /** Handler for when an option is deselected */
  onDeselect?: (option: Option | null) => void;
  /** initial selected option ids */
  initialSelectedIds?: Array<string | number>;
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** Makes the component disabled */
  disabled?: boolean;
  /** Placeholder to display */
  placeholder?: string;
  /** if set to true an error will be rendered when no options are selected */
  required?: boolean;
  /** Suffix */
  renderSuffix?: (isError: boolean) => React.ReactNode;
  checkbox?: boolean;
}

export interface LabelWithOptionsState {
  selectedOptions: Array<Option>;
  isDirty: boolean;
}

/**
 * LabelWithOptions
 */
export class LabelWithOptions extends React.PureComponent<LabelWithOptionsProps, LabelWithOptionsState> {
  static displayName = 'LabelWithOptions';
  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(optionPropType).isRequired,
    /** Handler for when an option is selected */
    onSelect: func,
    /** Handler for when an option is deselected */
    onDeselect: func,
    /** initial selected option ids */
    initialSelectedIds: arrayOf(oneOfType([number, string])),
    /** An element that always appears at the top of the options */
    fixedHeader: node,
    /** An element that always appears at the bottom of the options */
    fixedFooter: node,
    /** Makes the component disabled */
    disabled: bool,
    /** Placeholder to display */
    placeholder: string,
    /** if set to true an error will be rendered when no options are selected */
    required: bool,
    /** Suffix */
    renderSuffix: func
  };

  static defaultProps = {
    initialSelectedIds: [],
    onSelect: noop,
    onDeselect: noop,
    renderSuffix: noop
  };

  static createOption = OptionFactory.create;
  static createDivider = createDivider;
  public state = {isDirty: false, selectedOptions: []};

  onInitialSelectedOptionsSet = (options: Array<Option>) => {
    this.setState({
      selectedOptions: options
    });
  }

  onSelect = (option: Option) => {
    const {selectedOptions} = this.state;
    const {onSelect} = this.props;
    this.setState({
      selectedOptions: [...selectedOptions, option],
      isDirty: true
    }, () => onSelect(option));
  }

  onDeselect = (option: Option) => {
    const {selectedOptions} = this.state;
    const {onDeselect} = this.props;
    this.setState({
      selectedOptions: selectedOptions.filter(_option => option.id !== _option.id),
      isDirty: true
    }, () => onDeselect(option));
  }

  createOptions = () => {
    if (!this.props.checkbox) {
      return this.props.options;
    }
    return this.props.options.map(option => {
      let newOption = {id: option.id, isDisabled: option.isDisabled, isSelectable: option.isSelectable, value: option.value, render: null};
      newOption.render = value => <div className={style.optionCotainer}><Checkbox className={style.checkbox}></Checkbox>{option.render(value)}</div>;
      return newOption;
    });
  }

  render() {
    const {
      initialSelectedIds,
      options,
      placeholder,
      disabled,
      required,
      renderSuffix,
      fixedFooter,
      fixedHeader
    } = this.props;

    const {
      selectedOptions,
      isDirty
    } = this.state;

    const labelValue = selectedOptions.length ?
      selectedOptions.map(option => option.value).join(', ') :
      placeholder;

    const error = !disabled && required && isDirty && selectedOptions.length === 0;
    return (
      <Dropdown
        {...style('root', {required: required && !disabled, error, disabled}, this.props)}
        multi={true}
        placement="bottom-start"
        initialSelectedIds={initialSelectedIds}
        options={this.createOptions()}
        // options={options}
        openTrigger={CLICK}
        fixedFooter={fixedFooter}
        fixedHeader={fixedHeader}
        onInitialSelectedOptionsSet={this.onInitialSelectedOptionsSet}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        disabled={disabled}>
        <div className={style.selection}>
          <Label
            className={`${style.label} ${selectedOptions.length ? '' : style.placeholder}`.trim()}
            data-hook="label">
            {labelValue}
          </Label>
          {renderSuffix(error)}
        </div>
      </Dropdown>
    );
  }
}
