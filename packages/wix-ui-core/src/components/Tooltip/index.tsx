import * as React from 'react';
import style from './TooltipStyle.st.css';
import {Popover, Placement, PlacementPropType} from '../../baseComponents/Popover';
import {createComponentThatRendersItsChildren, ElementProps} from '../../utils';

export type Point = {
  x: number;
  y: number;
};

export interface TooltipProps {
  /** The location to display the content */
  placement?: Placement;

  textAlign?: string;
  children?: any;
  content?: any;
  showDelay?: number;
  hideDelay?: number;
  maxWidth?: string | number;
  minWidth?: string | number;
  color?: string;
  lineHeight?: string;
  zIndex?: number;
  moveBy?: Point;
  moveArrowTo?: number;
  padding?: string | number;
}

export interface TooltipState {
  isOpen: boolean;
}

/**
 * Tooltip
 */
export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  static Element: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Tooltip.Element');
  static Content: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Tooltip.Content');

  static displayName = 'Tooltip';
  static defaultProps = {
    placement: 'top'
  };

  static propTypes = {
    /** The location to display the content */
    placement: PlacementPropType,
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      isOpen: false
    };
  }

  open() {
    if (!this.state.isOpen) {
      this.setState({isOpen: true});
    }
  }

  close() {
    if (this.state.isOpen) {
      this.setState({isOpen: false});
    }
  }

  render () {
    const {placement, textAlign, maxWidth, content, children, moveBy,
           minWidth, color, lineHeight, zIndex, padding} = this.props;
    const {isOpen} = this.state;

    return (
      <Popover
        {...style('root', {}, this.props)}
        placement={placement}
        shown={isOpen}
        showArrow={true}
        onMouseEnter={this.open}
        onMouseLeave={this.close}
        moveBy={moveBy}>
        <Popover.Element>
          {children}
        </Popover.Element>
        <Popover.Content>
          <div style={{minWidth, textAlign, maxWidth, color, lineHeight, zIndex, padding}}>
            {content}
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}
