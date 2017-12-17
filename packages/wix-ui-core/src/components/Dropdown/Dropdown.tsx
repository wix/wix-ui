import * as React from 'react';
import {Manager, Target, Popper, Arrow} from 'react-popper';

interface DropdownProps {
  triggerType?: 'click' | 'hover';
  popoverShown?: boolean;
}

interface DropdownState {
  popoverShown: boolean;
}

interface DefaultProps extends Partial<DropdownProps> {
  triggerType: 'click';
  popoverShown: false;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  public static defaultProps: DefaultProps;

  constructor(props) {
    super(props);

    const {popoverShown} = props;
    this.state = {
      popoverShown
    };
  }

  render() {
    const {triggerType} = this.props;
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
        {popoverShown && <Popper placement="right" className="popper">
          Right Content
          <Arrow className="popper__arrow"/>
        </Popper>}
      </Manager>
    );
  }
}

export default Dropdown;
