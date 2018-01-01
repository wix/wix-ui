import * as React from 'react';
import {func, object, arrayOf, oneOfType, number, string} from 'prop-types';
import * as uniqueId from 'lodash/uniqueId';
import {OPTION, SEPARATOR, OPTION_TYPE, SEPARATOR_TYPE, NOT_HOVERED_INDEX} from './constants';
import * as classNames from 'classnames';
import Divider from '../Divider';

export interface Option {
  id: number;
  value: any;
  type: OPTION_TYPE | SEPARATOR_TYPE;
  isDisabled: boolean;
}

export interface DropdownContentProps {
  options: Array<Option>;
  onOptionClick: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
  selectedIds: Array<string | number>;
}

export interface DropdownContentState {
  hoveredId: string | number;
}

class DropdownContent extends React.PureComponent<DropdownContentProps, DropdownContentState> {

  static defaultProps = {
    options: [],
    onOptionClick: () => null
  };

  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is clicked */
    onOptionClick: func.isRequired,
    /**  */
    selectedIds: oneOfType([arrayOf(number), arrayOf(string)]).isRequired
  };

  constructor(props) {
    super(props);

    this._renderOption = this._renderOption.bind(this);
    this.state = {
      hoveredId: NOT_HOVERED_INDEX
    };
  }

  _onOptionClick(option, evt) {
    this.props.onOptionClick(option, evt);
  }

  _setHoveredId(index) {
    if (this.state.hoveredId !== index) {
      this.setState({
        hoveredId: index
      });
    }
  }

  _renderOption(option, index) {
    const {selectedIds} = this.props;
    const {hoveredId} = this.state;

    switch (option.type) {
      case OPTION:
        return (
          <div
            className={classNames({
              selected: !option.isDisabled && selectedIds.includes(option.id),
              hover: hoveredId === index
            })}
            onMouseEnter={!option.isDisabled ? () => this._setHoveredId(index) : null}
            key={option.id}
            onClick={option.isDisabled ? null : evt => this._onOptionClick(option, evt)}>
            {option.displayName}
          </div>
        );
      case SEPARATOR:
        return <Divider key={uniqueId(SEPARATOR)} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div data-hook="options-container">
        {(this.props.options || []).map(this._renderOption)}
      </div>
    );
  }
}

export default DropdownContent;
