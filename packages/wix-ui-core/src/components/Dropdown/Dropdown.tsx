import * as React from 'react';
import Popover from '../Popover';
import {string} from 'prop-types';
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

  static defaultProps = {
    openTrigger: 'click'
  };

  static propTypes = {
    openTrigger: string
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render () {
    const {openTrigger, children} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const {isOpen} = this.state;

    return (
      <Popover placement="bottom" shown={isOpen}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={() => openTrigger === 'click' && this.setState({isOpen: !isOpen})}
            onMouseEnter={() => openTrigger === 'hover' && this.setState({isOpen: true})}
            onMouseLeave={() => openTrigger === 'hover' && this.setState({isOpen: false})}>
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
