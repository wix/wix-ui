import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';
import {createHOC} from '../../createHOC';
import {getChildrenObject, generateDefaultChildComponent} from '../../utils';

interface PopoverProps {
  trigger?: 'click' | 'hover';
  popoverShown?: boolean;
  placement: PopperJS.Placement;
}

interface PopoverState {
  popoverShown: boolean;
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  static defaultProps: Partial<PopoverProps> = {
    trigger: 'click',
    popoverShown: false
  };

  static Element = generateDefaultChildComponent('Popover.Element');
  static Content = generateDefaultChildComponent('Popover.Content');

  constructor(props) {
    super(props);

    const {popoverShown} = props;
    this.state = {
      popoverShown
    };
  }

  render() {
    const {trigger, placement, children} = this.props;
    const {popoverShown} = this.state;
    const childrenObject = getChildrenObject(children, {Element: null, Content: null});

    return (
      <Manager>
        <Target
          data-hook="target"
          onClick={() => trigger === 'click' && this.setState({popoverShown: !popoverShown})}
          onMouseEnter={() => trigger === 'hover' && this.setState({popoverShown: true})}
          onMouseLeave={() => trigger === 'hover' && this.setState({popoverShown: false})}
          style={{display: 'inline-block'}}>
          {childrenObject.Element}
        </Target>
        {
          popoverShown &&
            <Popper placement={placement}>
              <Arrow/>
              {childrenObject.Content}
            </Popper>
        }
      </Manager>
    );
  }
}

export default createHOC(Popover);
