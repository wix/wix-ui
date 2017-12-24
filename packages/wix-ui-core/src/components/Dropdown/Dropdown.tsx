import * as React from 'react';
import {string} from 'prop-types';
import Popover, {Placement} from '../Popover';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {createHOC} from '../../createHOC';

interface DropdownProps {
  openTrigger: 'click' | 'hover';
}

interface DropdownState {
  isOpen: boolean;
}

class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {

  static Element = createComponentThatRendersItsChildren('Dropdown.Element');
  static Content = createComponentThatRendersItsChildren('Dropdown.Content');

  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render () {
    const {children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const {isOpen} = this.state;

    return (
      <Popover placement="bottom" popoverShown={isOpen}>
        <Popover.Element>
          <div
            data-hook="Dropdown-element"
            onMouseEnter={() => this.setState({isOpen: true})}
            onMouseLeave={() => this.setState({isOpen: false})}>
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

export default createHOC(Dropdown);
