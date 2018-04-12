import * as React from 'react';
import style from './LabelWithOptions.st.css';
import {arrayOf, bool, number, func, oneOfType, string, node, Requireable} from 'prop-types';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Option, optionPropType, OptionFactory} from '../../baseComponents/DropdownOption';
import {Label} from '../Label';
import {CLICK} from '../../baseComponents/Dropdown/constants';

const createDivider = (value = null) =>
  OptionFactory.createDivider({className: style.divider, value});

export interface LabelWithOptionsProps {
  /** The dropdown options array */
  options: Array<Option>;
  /** set true for multiple selection, false for single */
  multi?: boolean;
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
    /** set true for multiple selection, false for single */
    multi: bool,
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
    multi: false,
    onSelect: () => null,
    onDeselect: () => null,
    renderSuffix: () => null
  };

  static createOption = OptionFactory.create;
  static createDivider = createDivider;

  constructor(props: LabelWithOptionsProps) {
    super(props);

    this.state = {
      isDirty: false,
      selectedOptions: []
    };

    this._onSelect = this._onSelect.bind(this);
    this._onDeselect = this._onDeselect.bind(this);
    this._onInitialSelectedOptionsSet = this._onInitialSelectedOptionsSet.bind(this);
  }

  _onInitialSelectedOptionsSet(options: Array<Option>) {
    this.setState({
      selectedOptions: options
    });
  }

  _onSelect(option: Option) {
    const {selectedOptions} = this.state;
    const {onSelect, multi} = this.props;
    this.setState({
      selectedOptions: multi ? [...selectedOptions, option] : [option],
      isDirty: true
    }, () => onSelect(option));
  }

  _onDeselect(option: Option) {
    const {selectedOptions} = this.state;
    const {onDeselect} = this.props;
    this.setState({
      selectedOptions: selectedOptions.filter(_option => option.id !== _option.id),
      isDirty: true
    }, () => onDeselect(option));
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
      fixedHeader,
      multi
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
        multi={multi}
        placement="bottom-start"
        initialSelectedIds={initialSelectedIds}
        options={options}
        openTrigger={CLICK}
        fixedFooter={fixedFooter}
        fixedHeader={fixedHeader}
        onInitialSelectedOptionsSet={this._onInitialSelectedOptionsSet}
        onSelect={this._onSelect}
        onDeselect={this._onDeselect}
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
