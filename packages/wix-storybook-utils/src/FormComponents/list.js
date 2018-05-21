import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from 'wix-style-react/dist/src/Icons/dist/components/CloseThin';
import InputWithOptions from 'wix-style-react/InputWithOptions';
import {default as WixRadioGroup} from 'wix-style-react/RadioGroup';

import NO_VALUE_TYPE from '../AutoExample/no-value-type';

const isUndefined = a => typeof a === 'undefined';

export default class List extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    values: PropTypes.arrayOf(PropTypes.any),
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      currentValue: {},
      currentFilter: props.defaultValue || '',
      isFiltering: false
    };
  }

  componentWillMount() {
    this.setState({options: this.createOptions()});
  }

  view = e => typeof e === 'function' ? React.createElement(e) : e;

  createOptions = () =>
    (this.props.defaultValue ? [this.props.defaultValue] : [])
      .concat(this.props.values)
      .map((option, id) => ({
        id: option.id || id,

        // `value` is used in InputWithOptions as displayed value in dropdown
        // however, it's possible `value` is complex react component. instead of
        // displaying that component, we save it in `realValue` and
        // show `value` as some string representation of component instead
        value: option.label || (option.type && option.type.name) || '' + option,
        realValue: isUndefined(option.value) ? option : option.value
      }));


  getFilteredOptions = () =>
    this.state.isFiltering ?
      this.state.options
        .filter(({value}) =>
          this.state.currentFilter.length ?
            value.toLowerCase().includes(this.state.currentFilter) :
            true
        ) : this.state.options;

  clearValue = () =>
    this.setState(
      {currentValue: {}, currentFilter: ''},
      () => this.props.onChange(NO_VALUE_TYPE)
    );

  clearButton =
    <span
      onClick={this.clearValue}
      style={{color: '#3899ec', cursor: 'pointer'}}
      children={<CloseIcon size="8px"/>}
      />;

  getSelectedId = () => {
    const id = this.state.options.find(option => option.id === this.state.currentValue.id);
    return id || 0;
  }

  onOptionChange = ({id}) => {
    const currentValue = this.state.options.find(option => option.id === id) || {};

    this.setState(
      {
        currentValue,
        currentFilter: currentValue.value,
        isFiltering: false
      },
      () => this.props.onChange(currentValue.realValue)
    );
  }

  onFilterChange = ({target: {value: currentFilter}}) =>
    this.setState({currentFilter, isFiltering: true})

  dropdown() {
    return (
      <InputWithOptions
        value={this.state.currentFilter}
        options={this.getFilteredOptions()}
        selectedId={this.getSelectedId()}
        onSelect={this.onOptionChange}
        onChange={this.onFilterChange}
        placeholder={this.props.defaultValue || ''}
        {...(this.state.currentFilter ? {suffix: this.clearButton} : {})}
        />
    );
  }

  radios() {
    const {values, onChange} = this.props;

    return (
      <WixRadioGroup
        value={this.state && this.state.selected}
        onChange={ev => {
          this.setState({selected: ev});
          onChange(this.view(values[ev]));
        }}
        >
        {values.map((value, i) =>
          <WixRadioGroup.Radio
            key={i}
            value={i}
            children={this.view(values[i])}
            />
        )}
      </WixRadioGroup>
    );
  }

  render() {
    return this.props.values.length > 3 ? this.dropdown() : this.radios();
  }
}

