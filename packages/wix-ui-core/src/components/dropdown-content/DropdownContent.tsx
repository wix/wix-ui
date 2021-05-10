import * as React from 'react';
import { st, classes } from './DropdownContent.st.css';
import { Option, DropdownOption } from '../dropdown-option';

const NOT_HOVERED_INDEX = -1;

export interface IDOMid {
  _DOMid: string;
}

export interface DropdownContentProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  /** Component class name */
  className?: string;
  /** The dropdown options array */
  options: Option[];
  /** A callback for when hovering an option */
  onOptionHover?(option: (Option & IDOMid) | null): void;
  /** A callback for when clicking an option */
  onOptionClick(option: Option | null): void;
  /** A callback for mouse down event */
  onMouseDown?(e: React.MouseEvent): void;
  /** Array of the selected ids */
  selectedIds: (string | number)[];
  /** An element that always appears at the top of the options */
  fixedHeader?: React.ReactNode;
  /** An element that always appears at the bottom of the options */
  fixedFooter?: React.ReactNode;
  /** DOM id of optionsContainer element */
  optionsContainerId?: string;
}

export interface DropdownContentState {
  hoveredIndex: number;
}

/**
 * DropdownContent
 */
export class DropdownContent extends React.PureComponent<
  DropdownContentProps,
  DropdownContentState
> {
  static displayName = 'DropdownContent';
  private optionsContainerRef: HTMLDivElement | null = null;
  private readonly mouseCoords = { screenX: -1, screenY: -1 };

  constructor(props: DropdownContentProps) {
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onOptionHover = this.onOptionHover.bind(this);
  }

  state = { hoveredIndex: NOT_HOVERED_INDEX };

  componentDidMount() {
    if (this.props.selectedIds.length) {
      const selectedIndex = this.props.options.findIndex(
        (option) => option.id === this.props.selectedIds[0],
      );

      if (selectedIndex > -1) {
        const selectedOption = this.optionsContainerRef.childNodes[
          selectedIndex
        ] as HTMLElement;
        const parentRect = this.optionsContainerRef.getBoundingClientRect();
        const selectedRect = selectedOption.getBoundingClientRect();

        if (selectedRect.bottom > parentRect.bottom) {
          this.optionsContainerRef.scrollTop = Math.min(
            selectedOption.offsetTop +
              selectedOption.clientHeight / 2 -
              this.optionsContainerRef.offsetHeight / 2,
            this.optionsContainerRef.scrollHeight,
          );
        }

        this.setHoveredIndex(selectedIndex);
      }
    }
  }

  setHoveredIndex(index: number) {
    if (this.state.hoveredIndex !== index) {
      this.setState(
        {
          hoveredIndex: index,
        },
        this.onOptionHover,
      );
    }
  }

  onOptionHover() {
    if (this.props.onOptionHover) {
      this.props.onOptionHover(this.getSelectedOption());
    }
  }

  isValidOptionForSelection(option: Option) {
    return option.isSelectable && !option.isDisabled;
  }

  hoverNextItem(interval: number) {
    const { options } = this.props;
    if (!options.find(this.isValidOptionForSelection)) {
      return;
    }

    let { hoveredIndex } = this.state;
    // tslint:disable-next-line:no-constant-condition
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
      const hoveredOption = this.optionsContainerRef.childNodes[
        hoveredIndex
      ] as HTMLElement;
      const hoveredOptionHeight = hoveredOption.offsetHeight;
      const hoveredOptionTop = hoveredOption.offsetTop - 1;

      const {
        scrollTop: optionsContainerScrollTop,
        clientHeight: optionsContainerClientHeight,
      } = this.optionsContainerRef;

      // If hovered option is not visible
      if (
        !(
          optionsContainerScrollTop <= hoveredOptionTop &&
          optionsContainerScrollTop + optionsContainerClientHeight >
            hoveredOptionTop + hoveredOptionHeight
        )
      ) {
        if (this.optionsContainerRef.scrollTop < hoveredOptionTop) {
          this.optionsContainerRef.scrollTop =
            hoveredOptionHeight +
            hoveredOptionTop -
            optionsContainerClientHeight;
        } else {
          this.optionsContainerRef.scrollTop = hoveredOptionTop;
        }
      }
    }

    this.setHoveredIndex(hoveredIndex);
  }

  getOptionDOMid(option: Pick<Option, 'id'>): string {
    const optionsContainerId = this.props.optionsContainerId;

    return optionsContainerId
      ? `${optionsContainerId}_option-${option.id}`
      : null;
  }

  getSelectedOption(): (Option & IDOMid) | null {
    const { options } = this.props;
    const { hoveredIndex } = this.state;
    const isValidIndex = hoveredIndex >= 0 && hoveredIndex < options.length;
    return isValidIndex
      ? {
          ...options[hoveredIndex],
          _DOMid: this.getOptionDOMid(options[hoveredIndex]),
        }
      : null;
  }

  onKeyDown(eventKey: string, evt: React.KeyboardEvent<HTMLElement>) {
    switch (eventKey) {
      case 'ArrowUp': {
        evt.preventDefault();
        return this.hoverNextItem(-1);
      }
      case 'ArrowDown': {
        evt.preventDefault();
        return this.hoverNextItem(1);
      }
      case 'ArrowLeft':
      case 'ArrowRight': {
        return;
      }
      default:
        this.setHoveredIndex(NOT_HOVERED_INDEX);
    }
  }

  onMouseMove(evt: React.MouseEvent<HTMLDivElement>) {
    this.mouseCoords.screenX = evt.screenX;
    this.mouseCoords.screenY = evt.screenY;
  }

  onMouseDown(e) {
    const { onMouseDown } = this.props;
    onMouseDown && onMouseDown(e);
  }

  onMouseEnter(evt: React.MouseEvent<HTMLDivElement>, index: number) {
    if (
      this.mouseCoords.screenX !== evt.screenX ||
      this.mouseCoords.screenY !== evt.screenY
    ) {
      this.setHoveredIndex(index);
    }
  }

  render() {
    const {
      fixedHeader,
      fixedFooter,
      options,
      selectedIds,
      onOptionClick,
      optionsContainerId,
      className,
    } = this.props;
    const { hoveredIndex } = this.state;

    return (
      <div
        className={st(classes.root, className)}
        data-hook={this.props['data-hook']}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
      >
        {fixedHeader}
        <div
          role="menu"
          className={classes.optionsContainer}
          id={optionsContainerId}
          ref={(optionsContainer) =>
            (this.optionsContainerRef = optionsContainer)
          }
        >
          {(options || []).map((option, index) => (
            <DropdownOption
              className={classes.dropdownOption}
              dataHook="option"
              key={option.id}
              id={this.getOptionDOMid(option)}
              option={option}
              isHovered={hoveredIndex === index}
              isSelected={(selectedIds || []).includes(option.id)}
              onClickHandler={
                this.isValidOptionForSelection(option)
                  ? () => onOptionClick(option)
                  : undefined
              }
              onMouseEnterHandler={
                this.isValidOptionForSelection(option)
                  ? (evt) => this.onMouseEnter(evt, index)
                  : undefined
              }
              onMouseLeaveHandler={() => {
                this.setHoveredIndex(NOT_HOVERED_INDEX);
              }}
            />
          ))}
        </div>
        {fixedFooter}
      </div>
    );
  }
}
