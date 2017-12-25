import * as React from 'react';
import Popover, {Placement} from '../Popover';
import {string, arrayOf, object} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';

interface Option {
  id: number;
  value: any;
  displayName: any;
}

interface DropdownProps {
  openTrigger: 'click' | 'hover';
  placement: Placement;
  options: Array<Option>;
}

interface DropdownState {
  isOpen: boolean;
}

class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {

  static defaultProps = {
    openTrigger: 'click',
    placement: 'bottom-start',
    options: []
  };

  static propTypes = {
    /** Trigger type to show the content */
    openTrigger: string,
    /** The location to display the content */
    placement: string,
    /** The dropdown options array */
    options: arrayOf(object)
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleClickOutside() {
    this.setState({isOpen: false});
  }

  render () {
    const {openTrigger, placement, options, children} = this.props;
    const {isOpen} = this.state;

    return (
      <Popover
        placement={placement}
        shown={isOpen}
        onMouseEnter={openTrigger === 'hover' ? () => this.setState({isOpen: true}) : null}
        onMouseLeave={openTrigger === 'hover' ? () => this.setState({isOpen: false}) : null}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={openTrigger === 'click' ? () => this.setState({isOpen: !isOpen}) : null}
            style={{display: 'inline-block'}}>
            {children}
          </div>
        </Popover.Element>
        <Popover.Content>
          <div>
          {
            options.map(x =>
              <div key={x.id}>
                {x.displayName}
              </div>)
          }
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(onClickOutside(Dropdown));
