import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';
import PopoverElement from './components/PopoverElement';
import PopoverContent from './components/PopoverContent';
import {createHOC} from '../../createHOC';

interface PopoverProps {
  trigger?: 'click' | 'hover';
  popoverShown?: boolean;
  placement: PopperJS.Placement;
}

interface PopoverState {
  popoverShown: boolean;
}

class Popover extends React.Component<PopoverProps, PopoverState> {
  public static defaultProps: Partial<PopoverProps> = {
    trigger: 'click',
    popoverShown: false
  };

  public static Element = PopoverElement;
  public static Content = PopoverContent;

  constructor(props) {
    super(props);

    const {popoverShown} = props;
    this.state = {
      popoverShown
    };
  }

  _getChildrenObject(children) {
    return React.Children.toArray(children).reduce((acc, child) => {
      if (!React.isValidElement(child)) {
        return acc;
      }

      switch (child.type) {
        case PopoverElement: {
          acc.Element = child;
          break;
        }
        case PopoverContent: {
          acc.Content = child;
          break;
        }
        default: {
          break;
        }
      }
      return acc;
    }, {
      Element: null,
      Content: null
    });
  }

  render() {
    const {trigger, placement, children} = this.props;
    const {popoverShown} = this.state;
    const childrenObject = this._getChildrenObject(children);

    return (
      <Manager>
        <Target
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
