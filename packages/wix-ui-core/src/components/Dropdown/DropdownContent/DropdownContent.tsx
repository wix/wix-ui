import * as React from 'react';
import {func, object, arrayOf, oneOfType, number, string} from 'prop-types';
import {NOT_HOVERED_INDEX} from '../constants';
import * as classNames from 'classnames';
import {createHOC} from '../../../createHOC';

type DropdownContentClasses = {
  optionsContainer: string;
  option: string;
};

export interface Option {
  id: number | string;
  isDisabled: boolean;
  isSelectable: boolean;
  render: () => React.ReactNode;
}

interface DropdownContentProps {
  options: Array<Option>;
  onOptionClick: (option: Option) => void;
  selectedIds: Array<string | number>;
  classes: DropdownContentClasses;
  keyboardEvent?: string;
}

interface DropdownContentState {
  hoveredIndex: number;
}

class DropdownContent extends React.PureComponent<DropdownContentProps, DropdownContentState> {

  static defaultProps = {
    options: [],
    onOptionClick: () => null,
    selectedIds: []
  };

  static propTypes = {
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is clicked */
    onOptionClick: func.isRequired,
    /** Selected Ids array */
    selectedIds: oneOfType([arrayOf(number), arrayOf(string)]).isRequired,
    /** Keyboard event key */
    keyboardEvent: string,
    /** Classes object */
    classes: object.isRequired
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
    const {keyboardEvent} = nextProps;
    if (keyboardEvent) {
      this.onKeyDown(keyboardEvent);
    }
  }

  onOptionClick(option: Option) {
    this.props.onOptionClick(option);
  }

  setHoveredIndex(index: number) {
    if (this.state.hoveredIndex !== index) {
      this.setState({
        hoveredIndex: index
      });
    }
  }

  isValidOptionForSelection(option: Option) {
    return option.isSelectable && !option.isDisabled;
  }

  hoverNextItem(interval: number) {
    const {options} = this.props;
    let {hoveredIndex} = this.state;
    while (true) {
      hoveredIndex += interval;
      if (hoveredIndex === options.length) {
        hoveredIndex = 0;
      } else if (hoveredIndex < 0) {
        hoveredIndex = options.length - 1;
      }

      if (this.isValidOptionForSelection(options[hoveredIndex])) {
        break;
      }
    }

    this.setHoveredIndex(hoveredIndex);
  }

  onKeyDown(key) {
    if (key.startsWith('ArrowDown')) {
      this.hoverNextItem(1);
    } else if (key.startsWith('ArrowUp')) {
      return this.hoverNextItem(-1);
    } else if (key.startsWith('Enter')) {
      const {options} = this.props;
      const {hoveredIndex} = this.state;
      if (hoveredIndex >= 0 && hoveredIndex < options.length) {
        this.onOptionClick(options[hoveredIndex]);
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
              onClick={this.isValidOptionForSelection(option) ? () => this.onOptionClick(option) : null}
              onMouseEnter={this.isValidOptionForSelection(option) ? () => this.setHoveredIndex(index) : null}>
              {option.render()}
            </div>
        ))
      }
      </div>
    );
  }
}

export default createHOC(DropdownContent);
