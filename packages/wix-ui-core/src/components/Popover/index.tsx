import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {bool, string, func} from 'prop-types';
import PopperJS from 'popper.js';
import {buildChildrenObject, createComponentThatRendersItsChildren, ElementProps} from '../../utils';

export interface PopoverProps {
  shown: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export interface PopoverState {
  selfShown: boolean;
}

export interface SharedPopoverProps {
  placement: PopperJS.Placement;
}

export default class Popover extends React.Component<PopoverProps & SharedPopoverProps, PopoverState> {

  constructor(props: PopoverProps & SharedPopoverProps) {
    super(props);
    this.state = {selfShown: false};
  }

  static defaultProps = {
    shown: false,
    placement: 'auto'
  };

  static propTypes = {
    /** The location to display the content */
    placement: string.isRequired,
    /** Is the popover content shown */
    shown: bool.isRequired,
    /** Event handler for onMouseEnter event */
    onMouseEnter: func,
    /** Event handler for onMouseLeave event */
    onMouseLeave: func
  };

  static Element: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Popover.Element');
  static Content: React.SFC<ElementProps> = createComponentThatRendersItsChildren('Popover.Content');

  render() {
    const {placement, shown, onMouseEnter, onMouseLeave, children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});

    return (
      <Manager
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{display: 'inline-block'}}>
        <Target data-hook="popover-element">
          {childrenObject.Element}
        </Target>
        {
          (shown || this.state.selfShown) &&
            <Popper data-hook="popover-content" placement={placement}
                onMouseEnter={() => this.setState({selfShown: true})}
                onMouseLeave={() => this.setState({selfShown: false})}>
              <Arrow/>
              {childrenObject.Content}
            </Popper>
        }
      </Manager>
    );
  }
}
