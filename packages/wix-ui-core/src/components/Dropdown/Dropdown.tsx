import * as React from 'react';
import Popover, {Placement} from '../Popover';
import {string} from 'prop-types';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';

interface DropdownProps {
  openTrigger: 'click' | 'hover';
  placement: Placement;
}

interface DropdownState {
  isOpen: boolean;
}

class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {

  static Element = createComponentThatRendersItsChildren('Dropdown.Element');
  static Content = createComponentThatRendersItsChildren('Dropdown.Content');

  static defaultProps = {
    openTrigger: 'click',
    placement: 'bottom-start'
  };

  static propTypes = {
    /** Trigger type to show the content */
    openTrigger: string,
    /** The location to display the content */
    placement: string
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
    const {openTrigger, placement, children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const {isOpen} = this.state;

    return (
      <Popover placement={placement} shown={isOpen}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={openTrigger === 'click' ? () => this.setState({isOpen: !isOpen}) : null}
            onMouseEnter={openTrigger === 'hover' ? () => this.setState({isOpen: true}) : null}
            onMouseLeave={openTrigger === 'hover' ? () => this.setState({isOpen: false}) : null}>
            {childrenObject.Element}
          </div>
        </Popover.Element>
        <Popover.Content>
          {childrenObject.Content}
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(onClickOutside(Dropdown));
