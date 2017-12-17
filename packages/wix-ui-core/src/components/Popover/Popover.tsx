import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';

type PopoverClasses = {
  element: string;
  content: string;
  arrow: string;
};

interface PopoverProps {
  classes: PopoverClasses;
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

  public static Element = props => props.children;
  public static Content = props => props.children;

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
        case Popover.Element: {
          acc.Element = child;
          break;
        }
        case Popover.Content: {
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
    const {classes, trigger, placement, children} = this.props;
    const {popoverShown} = this.state;
    const childrenObject = this._getChildrenObject(children);

    return (
      <Manager>
        <Target
          className={classes.element}
          onClick={() => trigger === 'click' && this.setState({popoverShown: !popoverShown})}
          onMouseEnter={() => trigger === 'hover' && this.setState({popoverShown: true})}
          onMouseLeave={() => trigger === 'hover' && this.setState({popoverShown: false})}>
          {childrenObject.Element}
        </Target>
        {
          popoverShown &&
            <Popper className={classes.content} placement={placement}>
              <Arrow className={classes.arrow}/>
              {childrenObject.Content}
            </Popper>
        }
      </Manager>
    );
  }
}

export default Popover;
