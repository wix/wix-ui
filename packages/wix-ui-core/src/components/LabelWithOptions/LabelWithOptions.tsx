import * as React from 'react';
import style from './LabelWithOptions.st.css';
import {arrayOf, bool, number, func, oneOfType, string, node, Requireable} from 'prop-types';
import {Dropdown} from '../../baseComponents/Dropdown';
import {Option, optionPropType} from '../../baseComponents/DropdownOption';
import {Label} from '../Label';
import {CLICK} from '../../baseComponents/Dropdown/constants';
import {Placement} from '../../baseComponents/Popover';

export interface LabelWithOptionsProps {
  /** rendered when no options are selected */
  placeholder?: string;
  /** The location to display the content */
  placement?: Placement;
  /** The dropdown options array */
  options: Array<Option>;
  /** If set to true, content element will always be visible, used for preview mode */
  forceContentElementVisibility?: boolean;
  /** initial selected option ids */
  initialSelectedIds?: Array<string | number>;
  /** Handler for when an option is selected */
  onSelect?: (option: Option | null) => void;
  /** Handler for when an option is deselected */
  onDeselect?: (option: Option | null) => void;
  /** A callback for when initial selected options are set */
  onInitialSelectedOptionsSet: (options: Array<Option>) => void;
  /** Makes the component disabled */
  disabled?: boolean;
  /** if set to true an error will be rendered when no options are selected */
  required?: boolean;
  /** Suffix */
  renderSuffix?: (isInvalid: boolean) => React.ReactNode;
}

export interface LabelWithOptionsState {
  selectedOptions: Array<Option>;
  isDirty: boolean;
}

/**
 * LabelWithOptions
 */
export class LabelWithOptions extends React.PureComponent<LabelWithOptionsProps, LabelWithOptionsState> {
  static propTypes = {
    placeholder: string,
    placement: string,
    /** The dropdown options array */
    options: arrayOf(optionPropType).isRequired,
    forceContentElementVisibility: bool,
    /** initial selected option ids */
    initialSelectedIds: arrayOf(oneOfType([number, string])),
    onSelect: func,
    onDeselect: func,
    onInitialSelectedOptionsSet: func,
    disabled: bool,
    required: bool,
    renderSuffix: func,
  };

  static displayName = 'LabelWithOptions';

  static defaultProps = {
    options: [],
    initialSelectedIds: [],
    forceContentElementVisibility: false,
    placeholder: '',
    placement: 'bottom',
    onSelect: () => null,
    onDeselect: () => null,
    onInitialSelectedOptionsSet: () => null,
    disabled: false,
    required: false,
    renderSuffix: () => null
  };

  constructor(props) {
    super(props);
    const {
      initialSelectedIds: ids,
      options,
    } = props;
    const selectedOptions = options.filter(option => ids.includes(option.id));
    this.state = {
      selectedOptions,
      isDirty: false
    };
  }

  handleSelect = (option) => {
    const {selectedOptions} = this.state;
    const {onSelect} = this.props;
    this.setState({
      selectedOptions: selectedOptions.concat(option),
      isDirty: true
    }, () => onSelect(option));
  }

  handleDeselect = (option) => {
    const {selectedOptions} = this.state;
    const {onDeselect} = this.props;
    const modifiedOptions = selectedOptions.filter(_option => option.id !== _option.id);
    this.setState({
      selectedOptions: modifiedOptions,
      isDirty: true
    }, () => onDeselect(option));
  }

  render() {
    const {
      forceContentElementVisibility,
      initialSelectedIds,
      options,
      placeholder,
      onInitialSelectedOptionsSet,
      disabled,
      required,
      renderSuffix,
      placement,
    } = this.props;

    const {
      selectedOptions,
      isDirty
    } = this.state;

    const labelValue = selectedOptions.length > 0 ?
      selectedOptions.map(option => option.value).join(', ') :
      placeholder;

    const invalid = required && isDirty && selectedOptions.length === 0;
    return (
      <Dropdown
        {...style('root', {}, this.props)}
        multi={true}
        placement={placement}
        initialSelectedIds={initialSelectedIds}
        options={options}
        openTrigger={CLICK}
        onSelect={this.handleSelect}
        onInitialSelectedOptionsSet={onInitialSelectedOptionsSet}
        onDeselect={this.handleDeselect}
        disabled={disabled}
        forceContentElementVisibility={forceContentElementVisibility}>
        <div {...style('selection', {required, invalid, disabled}, this.props)}>
          <Label
            {...style('label', {required, invalid, disabled}, this.props)}
            data-hook="label">
            {labelValue}
          </Label>
          {renderSuffix(invalid)}
        </div>
      </Dropdown>
    );
  }
}
