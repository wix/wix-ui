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
  /** If set to true, the label will display an ellipsis when overflowing */
  ellipsis?: boolean;
  /** Suffix */
  renderSuffix?: (isError: boolean) => React.ReactNode;
  /** Display checkbox items in the dropdown menu*/
  checkbox?: boolean;
}

export interface LabelWithOptionsState {
  selectedIds: Array<string | number>;
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
    /** If set to true, the label will display an ellipsis when overflowing */
    ellipsis: bool,
    /** Suffix */
    renderSuffix: func,
    /** Display checkbox items in the dropdown menu*/
    checkbox: bool
  };

  static defaultProps = {
    initialSelectedIds: [],
    multi: false,
    onSelect: noop,
    onDeselect: noop,
    renderSuffix: noop
  };

  static createOption = OptionFactory.create;
  static createDivider = createDivider;

  state = {isDirty: false, selectedIds: []};

  public render() {
    const {
      initialSelectedIds,
      disabled,
      required,
      renderSuffix,
      fixedFooter,
      fixedHeader,
      multi,
      checkbox,
      ellipsis
    } = this.props;

    const {
      selectedIds,
      isDirty
    } = this.state;

    const error = !disabled && required && isDirty && selectedIds.length === 0;
    return (
      <Dropdown
        {...style('root', {required: required && !disabled, error, disabled, checkbox}, this.props)}
        multi={multi}
        placement="bottom-start"
        initialSelectedIds={initialSelectedIds}
        options={this.createOptions()}
        openTrigger={CLICK}
        fixedFooter={fixedFooter}
        fixedHeader={fixedHeader}
        onInitialSelectedOptionsSet={this.onInitialSelectedOptionsSet}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
        disabled={disabled}
      >
        <div className={style.selection}>
          <Label
            className={`${style.label} ${selectedIds && selectedIds.length ? '' : style.placeholder}`.trim()}
            ellipsis={ellipsis}
            data-hook="label"
          >
            {this.createLabel()}
          </Label>
          {renderSuffix(error)}
        </div>
      </Dropdown>
    );
  }

  private onInitialSelectedOptionsSet = (options: Array<Option>) => {
    this.setState({
      selectedIds: this.props.initialSelectedIds
    });
  }

  private onSelect = (option: Option) => {
    const {selectedIds} = this.state;
    const {onSelect, multi} = this.props;
    this.setState({
      selectedIds: multi ? [...selectedIds, option.id] : [option.id],
      isDirty: true
    }, () => onSelect(option));
  }

  private onDeselect = (option: Option) => {
    this.setState({
      selectedIds: this.state.selectedIds.filter(id => id !== option.id),
      isDirty: true
    }, () => this.props.onDeselect(option));
  }

  private createOptions = () => {
    if (!this.props.checkbox) {
      return this.props.options;
    }

    return this.props.options.map(option => {
      const newOption: Option = {
        id: option.id,
        isDisabled: option.isDisabled,
        isSelectable: option.isSelectable,
        value: option.value,
        render: null
      };

      const checked = this.state.selectedIds.includes(option.id);

      newOption.render = option.isSelectable ?
        value => (
          <div className={style.optionContainer} data-hook="checkbox-option-container">
            <Checkbox disabled={option.isDisabled} checked={checked} className={style.checkbox}/>{option.render(value)}
          </div>)
        : option.render;
      return newOption;
    });
  }

  private createLabel = () => {
    const {selectedIds} = this.state;
    return (selectedIds && selectedIds.length) ?
      this.props.options.filter(option => selectedIds.includes(option.id)).map(option => option.value).join(', ') :
      this.props.placeholder;
  }
}
