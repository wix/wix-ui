import * as React from 'react';
import { style, classes } from './LabelWithOptions.st.css';
import { Dropdown } from '../dropdown';
import { Checkbox } from '../checkbox';
import { Option, OptionFactory } from '../dropdown-option';
import { Label } from '../deprecated/label';
import { CLICK } from '../dropdown/constants';
import { noop } from '../../utils';

const createDivider = (value = null) =>
  OptionFactory.createDivider({ className: classes.divider, value });

export interface LabelWithOptionsProps {
  /** The dropdown options array */
  options: Option[];
  /** set true for multiple selection, false for single */
  multi?: boolean;
  /** Handler for when an option is selected */
  onSelect?(option: Option): void;
  /** Handler for when an option is deselected */
  onDeselect?(option: Option | null): void;
  /** initial selected option ids */
  initialSelectedIds?: (string | number)[];
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
  renderSuffix?(isError: boolean): React.ReactNode;
  /** Display checkbox items in the dropdown menu*/
  checkbox?: boolean;
}

export interface LabelWithOptionsState {
  selectedIds: (string | number)[];
  isDirty: boolean;
}

/**
 * LabelWithOptions
 */
export class LabelWithOptions extends React.PureComponent<
  LabelWithOptionsProps,
  LabelWithOptionsState
> {
  static displayName = 'LabelWithOptions';
  static defaultProps = {
    initialSelectedIds: [],
    multi: false,
    onSelect: noop,
    onDeselect: noop,
    renderSuffix: noop,
  };

  static createOption = OptionFactory.create;
  static createDivider = createDivider;

  state = { isDirty: false, selectedIds: [] };

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
      ellipsis,
    } = this.props;

    const { selectedIds, isDirty } = this.state;

    const error = !disabled && required && isDirty && selectedIds.length === 0;
    return (
      <Dropdown
        className={style(classes.root, {
          required: required && !disabled,
          error,
          disabled,
          checkbox,
        })}
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
        <div className={classes.selection}>
          <Label
            className={`${classes.label} ${
              selectedIds && selectedIds.length ? '' : classes.placeholder
            }`.trim()}
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

  private readonly onInitialSelectedOptionsSet = (options: Option[]) => {
    this.setState({
      selectedIds: this.props.initialSelectedIds,
    });
  };

  private readonly onSelect = (option: Option) => {
    const { selectedIds } = this.state;
    const { onSelect, multi } = this.props;
    this.setState(
      {
        selectedIds: multi ? [...selectedIds, option.id] : [option.id],
        isDirty: true,
      },
      () => onSelect(option),
    );
  };

  private readonly onDeselect = (option: Option) => {
    this.setState(
      {
        selectedIds: this.state.selectedIds.filter(id => id !== option.id),
        isDirty: true,
      },
      () => this.props.onDeselect(option),
    );
  };

  private readonly createOptions = () => {
    if (!this.props.checkbox) {
      return this.props.options;
    }

    return this.props.options.map(option => {
      const newOption: Option = {
        id: option.id,
        isDisabled: option.isDisabled,
        isSelectable: option.isSelectable,
        value: option.value,
        render: null,
      };

      const checked = this.state.selectedIds.includes(option.id);

      newOption.render = option.isSelectable
        ? value => (
            <div
              className={classes.optionContainer}
              data-hook="checkbox-option-container"
            >
              <Checkbox
                disabled={option.isDisabled}
                checked={checked}
                className={classes.checkbox}
              />
              {option.render(value)}
            </div>
          )
        : option.render;
      return newOption;
    });
  };

  private readonly createLabel = () => {
    const { selectedIds } = this.state;
    return selectedIds && selectedIds.length
      ? this.props.options
          .filter(option => selectedIds.includes(option.id))
          .map(option => option.value)
          .join(', ')
      : this.props.placeholder;
  };
}
