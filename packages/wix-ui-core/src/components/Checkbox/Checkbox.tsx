import * as React from 'react';
import * as uniqueId from 'lodash/uniqueId';
import style from './Checkbox.st.css';
import {bool, func, string, number, array, node} from 'prop-types';

export interface OnChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  checked: boolean;
}

export interface OnClickEvent extends React.MouseEvent<HTMLDivElement> {
  checked: boolean;
}

export interface OnKeydownEvent extends React.KeyboardEvent<HTMLDivElement> {
  checked: boolean;
}

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.EventHandler<OnChangeEvent | OnClickEvent | OnKeydownEvent>;
  id?: string;
  tabIndex?: number;
  tickIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  children?: React.ReactNode;
  error?: boolean;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  indeterminate?: boolean;
  autoFocus?: boolean;
  ['aria-controls']?: string[];
}

export interface CheckboxState {
  isFocused: boolean;
}

/**
 * Checkbox
 */
export default class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {
  public static displayName: string = 'Checkbox';

  public static propTypes: Object = {
    /** Whether the checkbox is checked or not */
    checked: bool,
    /** Disabled */
    disabled: bool,
    /** The onChange function will be called with a new checked value */
    onChange: func,
    /** The component ID */
    id: string,
    /** The tab-index of the component */
    tabIndex: number,
    /** An element to be displayed when the checkbox is checked */
    tickIcon: node,
    /** An element to be displayed when the checkbox is in indeterminate state */
    indeterminateIcon: node,
    /** Children to be rendered (usually a label) */
    children: node,
    /** Whether checkbox should be in error state */
    error: bool,
    /** Name of the checkbox */
    name: string,
    /** Whether the checkbox is readOnly */
    readOnly: bool,
    /** Whether the checkbox is required */
    required: bool,
    /** Whether the checkbox is indeterminate */
    indeterminate: bool,
    /** Whether the checkbox should be auto focused */
    autoFocus: bool,
    /** An string array of ARIA controls to be placed on the native checkbox */
    ['aria-controls']: array
  };

  public static defaultProps: Partial<CheckboxProps> = {
    tickIcon: (
      <span
        className={`${style.icon} ${style.tickIcon}`}
        data-hook="CHECKBOX_TICKMARK"
      />
    ),
    indeterminateIcon: (
      <span
        className={`${style.icon} ${style.indeterminateIcon}`}
        data-hook="CHECKBOX_INDETERMINATE"
      />
    ),
    // tslint:disable-next-line:no-empty
    onChange: () => { },
    checked: false,
    indeterminate: false,
    tabIndex: 0
  };

  public id: string;
  private checkbox: HTMLInputElement;

  constructor(props: CheckboxProps) {
    super(props);

    this.state = {isFocused: false};
    this.id = this.props.id || uniqueId('Checkbox');
  }

  private handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = e => {
    const SPACEBAR = ' ';
    const LEGACY_SPACEBAR = 'Spacebar';
    if (e.key === SPACEBAR || e.key === LEGACY_SPACEBAR) {
      e.preventDefault();
      this.handleChange(e);
    }
  }

  private handleClick: React.MouseEventHandler<HTMLDivElement> = e => {
    this.handleChange(e);
    this.checkbox && this.checkbox.focus();
    this.setState({isFocused: false});
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (!this.props.disabled && !this.props.readOnly) {
      this.props.onChange({checked: this.props.indeterminate ? true : !this.props.checked, ...e});
    }
  }

  // handleInputClick will be called only on pressing "space" key when nativeInput has focus
  private handleInputClick: React.MouseEventHandler<HTMLInputElement> = e => {
    e.stopPropagation();
    this.setState({isFocused: true});
  }

  private handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    this.state.isFocused && this.setState({isFocused: false});
  }

  private handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    !this.state.isFocused && this.setState({isFocused: true});
  }

  render()  {
    const {checked, disabled} = this.props;

    return (
      <div {...style('root', {checked, disabled}, this.props) }
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
        role="checkbox"
        tabIndex={0}
        aria-checked={this.props.indeterminate ? 'mixed' : this.props.checked}
        >
          <input
            data-hook="NATIVE_CHECKBOX"
            type="checkbox"
            className={style.nativeCheckbox}
            checked={this.props.checked}
            disabled={this.props.disabled}
            onClick={this.handleInputClick}
            onChange={this.handleChange}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            id={this.props.id}
            tabIndex={this.props.tabIndex}
            autoFocus={this.props.autoFocus}
            name={this.props.name}
            aria-controls={this.props['aria-controls']}
            ref={ref => this.checkbox = ref!}
          />

          <span
            className={style.box}
            data-hook="CHECKBOX_BOX"
          >
            {this.props.indeterminate ?
              this.props.indeterminateIcon : (this.props.checked && this.props.tickIcon)}
          </span>

          {this.props.children ? (
            <div
              data-hook="CHECKBOX_CHILD_CONTAINER"
              className={style.childContainer}
            >
              {this.props.children}
            </div>
          ) : null
          }
      </div>
    );
  }
}
