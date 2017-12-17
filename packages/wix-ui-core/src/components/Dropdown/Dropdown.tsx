import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import PopperJS from 'popper.js';

interface DropdownProps {
  triggerType?: 'click' | 'hover';
  popoverShown?: boolean;
  placement: PopperJS.Placement;
}

interface DropdownState {
  popoverShown: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  public static defaultProps: Partial<DropdownProps> = {
    triggerType: 'click',
    popoverShown: false
  };

  constructor(props) {
    super(props);

    const {popoverShown} = props;
    this.state = {
      popoverShown
    };
  }

  render() {
    const {triggerType, placement} = this.props;
    const {popoverShown} = this.state;

    return (
      <Manager>
        <Target
          onClick={() => triggerType === 'click' && this.setState({popoverShown: !popoverShown})}
          onMouseEnter={() => triggerType === 'hover' && this.setState({popoverShown: true})}
          onMouseLeave={() => triggerType === 'hover' && this.setState({popoverShown: false})}
          style={{width: 120, height: 120, background: '#b4da55'}}>
          <div>
            Target Box
          </div>
        </Target>
        {popoverShown && <Popper placement={placement}>
          Right Content
          <Arrow className="popper__arrow"/>
        </Popper>}
      </Manager>
    );
  }
}

export default Dropdown;
