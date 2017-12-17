import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';

interface DropdownProps {
  trigger?: 'click' | 'hover';
  popoverShown?: boolean;
  placement: PopperJS.Placement;
}

interface DropdownState {
  popoverShown: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  public static defaultProps: Partial<DropdownProps> = {
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
        case Dropdown.Element : {
          acc.Element = child;
          break;
        }
        case Dropdown.Content : {
          acc.Content = child;
          break;
        }
        default : {
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
              <Arrow className="popper__arrow"/>
              {childrenObject.Content}
            </Popper>
        }
      </Manager>
    );
  }
}

export default Dropdown;
