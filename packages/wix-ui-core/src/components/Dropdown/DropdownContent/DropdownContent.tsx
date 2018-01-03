import * as React from 'react';
import {func, object, arrayOf, oneOfType, number, string} from 'prop-types';
import {NOT_HOVERED_INDEX} from '../constants';
import * as classNames from 'classnames';
import {createHOC} from '../../../createHOC';

export type DropdownContentClasses = {
  optionsContainer: string;
  option: string;
};

export interface Option {
  id: number | string;
  isDisabled: boolean;
  isSelectable: boolean;
  render: () => React.ReactNode;
}

export interface DropdownContentProps {
  options: Array<Option>;
  onOptionClick: (option: Option, evt: React.SyntheticEvent<HTMLElement>) => void;
  selectedIds: Array<string | number>;
  classes: DropdownContentClasses;
  keyboardEvent: React.KeyboardEvent<HTMLElement>;
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

  constructor(props) {
    super(props);

    this.state = {
      hoveredIndex: NOT_HOVERED_INDEX
    };
  }

  componentWillMount() {
    const {keyboardEvent} = this.props;
    if (keyboardEvent) {
      this.onKeyDown(keyboardEvent);
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextKeyboardEvent = nextProps.keyboadEvent;
    if (nextKeyboardEvent) {
      this.onKeyDown(nextKeyboardEvent);
    }
  }

  _onOptionClick(option: Option, evt: React.SyntheticEvent<HTMLElement>) {
    this.props.onOptionClick(option, evt);
  }

  _setHoveredIndex(index: number) {
    if (this.state.hoveredIndex !== index) {
      this.setState({
        hoveredIndex: index
      });
    }
  }

  _isValidOptionForSelection(option: Option) {
    return option.isSelectable && !option.isDisabled;
  }

  _hoverNextItem(interval: number) {
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

    this._setHoveredIndex(hoveredIndex);
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

  render() {
    const {selectedIds, classes} = this.props;
    const {hoveredIndex} = this.state;

    return (
      <div
        className={classes.optionsContainer}
        data-hook="options-container"
        tabIndex={1000}>
        {
          (this.props.options || []).map((option, index) => (
            <div
              key={option.id}
              className={classNames(classes.option, {
                selected: !option.isDisabled && selectedIds.includes(option.id),
                hover: hoveredIndex === index
              })}
              onClick={this._isValidOptionForSelection(option) ? evt => this._onOptionClick(option, evt) : null}
              onMouseEnter={this._isValidOptionForSelection(option) ? () => this._setHoveredIndex(index) : null}>
              {option.render()}
            </div>
        ))
      }
      </div>
    );
  }
}

export default createHOC(DropdownContent);
