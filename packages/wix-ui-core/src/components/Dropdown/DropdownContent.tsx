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
  hoveredIndex: number;
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

  private optionsContainerRef: HTMLDivElement;

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this._renderOption = this._renderOption.bind(this);
    this.state = {
      hoveredIndex: NOT_HOVERED_INDEX
    };
  }

  componentDidMount() {
    this.optionsContainerRef.focus();
  }

  _onOptionClick(option, evt) {
    this.props.onOptionClick(option, evt);
  }

  _setHoveredIndex(index) {
    if (this.state.hoveredIndex !== index) {
      this.setState({
        hoveredIndex: index
      });
    }
  }

  _isValidOptionForSelection(option: Option) {
    return option.type === OPTION && !option.isDisabled;
  }

  _hoverNextItem(interval) {
    const {options} = this.props;
    let {hoveredIndex} = this.state;
    while (true) {
      hoveredIndex += interval;
      if (hoveredIndex === options.length) {
        hoveredIndex = 0;
      } else if (hoveredIndex === -1) {
        hoveredIndex = options.length - 1;
      }

      if (this._isValidOptionForSelection(options[hoveredIndex])) {
        break;
      }
    }

    this.setState({
      hoveredIndex
    });
  }

  onKeyDown(evt: React.KeyboardEvent<HTMLElement>) {
    switch (evt.key) {
      case 'ArrowDown': {
        this._hoverNextItem(1);
        break;
      }

      case 'ArrowUp': {
        this._hoverNextItem(-1);
        break;
      }

      case 'Enter': {
        this._onOptionClick(this.props.options[this.state.hoveredIndex], evt);
        break;
      }

      default: {
        return false;
      }
    }
  }

  _renderOption(option, index) {
    const {selectedIds} = this.props;
    const {hoveredIndex} = this.state;

    switch (option.type) {
      case OPTION:
        return (
          <div
            className={classNames({
              selected: !option.isDisabled && selectedIds.includes(option.id),
              hover: hoveredIndex === index
            })}
            onMouseEnter={!option.isDisabled ? () => this._setHoveredIndex(index) : null}
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
      <div
        data-hook="options-container"
        tabIndex={1000}
        onKeyDown={this.onKeyDown}
        ref={r => this.optionsContainerRef = r}>
        {(this.props.options || []).map(this._renderOption)}
      </div>
    );
  }
}

export default DropdownContent;
