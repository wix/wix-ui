import * as React from 'react';
import * as classNames from 'classnames';
import {func, object, arrayOf, oneOfType, number, string, node} from 'prop-types';
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
  maxHeight?: number;
}

interface DropdownContentState {
  hoveredIndex: number;
}

class DropdownContent extends React.PureComponent<DropdownContentProps, DropdownContentState> {

  static defaultProps = {
    options: [],
    onOptionClick: () => null,
    selectedIds: [],
    maxHeight: 260,
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
    fixedFooter: node,
    /** Maximum height of the content */
    maxHeight: number
  };

  private optionsContainerRef: HTMLDivElement;

  constructor(props) {
    super(props);

    this.state = {
      hoveredIndex: NOT_HOVERED_INDEX
    };
  }

  componentWillMount() {
    this.onKeyDown(this.props.keyboardEvent);
  }

  componentWillReceiveProps(nextProps: DropdownContentProps) {
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

    if (this.optionsContainerRef) {
      const hoveredOption = this.optionsContainerRef.childNodes[hoveredIndex] as HTMLElement;
      const hoveredOptionHeight = hoveredOption.offsetHeight;
      const hoveredOptionTop = hoveredOption.offsetTop - 1;

      const {scrollTop: optionsContainerScrollTop, clientHeight: optionsContainerClientHeight} = this.optionsContainerRef;

      // If hovered option is not visible
      if (!(optionsContainerScrollTop <= hoveredOptionTop && (optionsContainerScrollTop + optionsContainerClientHeight) > hoveredOptionTop + hoveredOptionHeight)) {
        if (this.optionsContainerRef.scrollTop < hoveredOptionTop) {
          this.optionsContainerRef.scrollTop = hoveredOptionHeight + hoveredOptionTop - optionsContainerClientHeight;
        } else {
          this.optionsContainerRef.scrollTop = hoveredOptionTop;
        }
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
    const {selectedIds, classes, fixedHeader, fixedFooter, options, maxHeight} = this.props;
    const {hoveredIndex} = this.state;

    return (
      <div
        data-hook="dropdown-content"
        tabIndex={1000}>
        {fixedHeader}
        {
          <div
            style={{maxHeight: `${maxHeight}px`}}
            className={classes.optionsContainer}
            ref={optionsContainer => this.optionsContainerRef = optionsContainer}>
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
          </div>
        }
        {fixedFooter}
      </div>
    );
  }
}

export default createHOC(DropdownContent);
