import * as React from 'react';
import {func, object, arrayOf, oneOfType, number, string, node} from 'prop-types';
import * as classNames from 'classnames';
import {createHOC} from '../../createHOC';
import {Option} from '../DropdownOption';

const NOT_HOVERED_INDEX = -1;

export type DropdownContentClasses = {
  optionsContainer: string;
  option: string;
};

export interface DropdownContentProps {
  options: Array<Option>;
  onOptionClick: (option: Option) => void;
  selectedIds: Array<string | number>;
  classes?: DropdownContentClasses;
  keyboardEvent?: string;
  fixedHeader?: React.ReactNode;
  fixedFooter?: React.ReactNode;
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
    classes: object.isRequired,
    /** An element that always appears at the top of the options */
    fixedHeader: node,
    /** An element that always appears at the bottom of the options */
    fixedFooter: node
  };

  constructor(props) {
    super(props);

    this.state = {
      hoveredIndex: NOT_HOVERED_INDEX
    };
  }

  componentWillMount() {
    this.onKeyDown(this.props.keyboardEvent);
  }

  componentWillReceiveProps(nextProps) {
    this.onKeyDown(nextProps.keyboardEvent);
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
    if (!options.find(this.isValidOptionForSelection)) {
      return;
    }

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

  onKeyDown(keyboardEvent: string) {
    if (!keyboardEvent) {
      return;
    }
    if (keyboardEvent.startsWith('ArrowDown')) {
      this.hoverNextItem(1);
    } else if (keyboardEvent.startsWith('ArrowUp')) {
      return this.hoverNextItem(-1);
    } else if (keyboardEvent.startsWith('Enter')) {
      const {options} = this.props;
      const {hoveredIndex} = this.state;
      if (hoveredIndex >= 0 && hoveredIndex < options.length) {
        this.onOptionClick(options[hoveredIndex]);
      }
    }
  }

  render() {
    const {selectedIds, classes, fixedHeader, fixedFooter, options} = this.props;
    const {hoveredIndex} = this.state;

    return (
      <div
        className={classes.optionsContainer}
        tabIndex={1000}>
        {fixedHeader}
        {
          (options || []).map((option, index) => (
            <div
              data-hook="option"
              key={option.id}
              className={classNames(classes.option, {
                selected: !option.isDisabled && selectedIds.includes(option.id),
                hover: hoveredIndex === index,
                disabled: option.isDisabled
              })}
              onClick={this.isValidOptionForSelection(option) ? () => this.onOptionClick(option) : null}
              onMouseEnter={this.isValidOptionForSelection(option) ? () => this.setHoveredIndex(index) : null}>
              {option.render()}
            </div>
          ))
        }
        {fixedFooter}
      </div>
    );
  }
}

export default createHOC(DropdownContent);
