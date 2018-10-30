import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from 'wix-ui-icons-common/system/Close';
import Dropdown from '../../ui/dropdown';
import RadioGroup from '../../ui/radio-group';
import Button from '../../ui/button';

import NO_VALUE_TYPE from '../../AutoExample/no-value-type';

const isThing = type => thing => typeof thing === type; // eslint-disable-line
const isUndefined = isThing('undefined');
const isFunction = isThing('function');
const isString = isThing('string');
const noop = () => {};

export default class List extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    values: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func,
    isRequired: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const options = this.createOptions(props.values || []);
    const currentValue =
      options.find(option => option.realValue === props.value) || {};

    this.state = {
      currentValue,
      currentFilter:
        props.defaultValue &&
        [props.defaultValue, props.defaultValue.type].some(isFunction)
          ? currentValue.value
          : props.defaultValue || '',
      isFiltering: false,
      options,
    };
  }

  createOptions = values =>
    values.map((option, id) => {
      option = option || {};
      return {
        id: option.id || id,

        // `value` is used in InputWithOptions as displayed value in dropdown
        // however, it's possible `value` is complex react component. instead of
        // displaying that component, we save it in `realValue` and
        // show `value` as some string representation of component instead
        value: option.label || (option.type && option.type.name) || '' + option,
        realValue: isUndefined(option.value) ? option : option.value,
      };
    });

  getFilteredOptions = () =>
    this.state.isFiltering
      ? this.state.options.filter(
          ({ value }) =>
            this.state.currentFilter.length
              ? value.toLowerCase().includes(this.state.currentFilter)
              : true,
        )
      : this.state.options;

  clearValue = () =>
    this.setState({ currentValue: {}, currentFilter: '' }, () =>
      this.props.onChange(NO_VALUE_TYPE),
    );

  clearIcon = (
    <span
      onClick={this.clearValue}
      style={{ color: '#3899ec', cursor: 'pointer', marginLeft: '-20px' }}
      children={<CloseIcon size="7px" />}
    />
  );

  clearButton = (
    <div style={{ padding: '1em 0' }}>
      <Button children="Clear" onClick={this.clearValue} />
    </div>
  );

  getSelectedOption = () => {
    const selectedOption =
      this.state.options.find(
        option => option.id === this.state.currentValue.id,
      ) || {};
    return selectedOption;
  };

  onOptionChange = ({ id }) => {
    const currentValue =
      this.state.options.find(option => option.id === id) || {};

    this.setState(
      {
        currentValue,
        currentFilter: currentValue.value,
        isFiltering: false,
      },
      () => this.props.onChange(currentValue.realValue),
    );
  };

  onFilterChange = currentFilter =>
    this.setState({ currentFilter, isFiltering: true });

  dropdown() {
    return (
      <Dropdown
        value={this.state.currentFilter}
        options={this.getFilteredOptions()}
        selectedOption={this.getSelectedOption()}
        placeholder={
          isString(this.props.defaultValue) ? this.props.defaultValue : ''
        }
        onSelect={option => (option ? this.onOptionChange(option) : noop)}
        onChange={this.onFilterChange}
        onClear={!this.props.isRequired ? this.clearValue : noop}
      />
    );
  }

  radios() {
    return (
      <div>
        <RadioGroup
          value={this.state.currentValue.id}
          onChange={id => this.onOptionChange({ id })}
          radios={this.state.options}
        />

        {!this.props.isRequired &&
          this.state.currentValue.value &&
          this.clearButton}
      </div>
    );
  }

  render() {
    return this.props.values.length > 3 ? this.dropdown() : this.radios();
  }
}
