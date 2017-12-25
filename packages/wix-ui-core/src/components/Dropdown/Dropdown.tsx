import * as React from 'react';
import Popover, {Placement} from '../Popover';
import {string, arrayOf, object, func} from 'prop-types';
import {createHOC} from '../../createHOC';
import onClickOutside from '../../onClickOutside';

export const OPTION = 'option';
export type OPTION_TYPE = 'option';

export const SEPARATOR = 'separator';
export type SEPARATOR_TYPE = 'separator';

export const CLICK = 'click';
export type CLICK_TYPE = 'click';

export const HOVER = 'hover';
export type HOVER_TYPE = 'hover';

interface Option {
  id: number;
  value: any;
  displayName: any;
  type: OPTION_TYPE | SEPARATOR_TYPE;
  isDisabled: boolean;
}

interface DropdownProps {
  openTrigger?: CLICK_TYPE | HOVER_TYPE;
  placement?: Placement;
  options: Array<Option>;
  onOptionClick: (option: Option, evt: React.MouseEvent<HTMLDivElement>) => void;
}

interface DropdownState {
  isOpen: boolean;
}

class Dropdown extends React.PureComponent<DropdownProps, DropdownState> {

  static defaultProps = {
    openTrigger: CLICK,
    placement: 'bottom-start',
    options: []
  };

  static propTypes = {
    /** Trigger type to show the content */
    openTrigger: string,
    /** The location to display the content */
    placement: string,
    /** The dropdown options array */
    options: arrayOf(object).isRequired,
    /** Handler for when an option is selected */
    onOptionClick: func
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

  _onOptionClick(option, evt) {
    this.setState({isOpen: false});
    this.props.onOptionClick(option, evt);
  }

  render () {
    const {openTrigger, placement, options, children} = this.props;
    const {isOpen} = this.state;

    return (
      <Popover
        placement={placement}
        shown={isOpen}
        onMouseEnter={openTrigger === HOVER ? () => this.setState({isOpen: true}) : null}
        onMouseLeave={openTrigger === HOVER ? () => this.setState({isOpen: false}) : null}>
        <Popover.Element>
          <div
            data-hook="dropdown-element"
            onClick={openTrigger === CLICK ? () => this.setState({isOpen: !isOpen}) : null}
            style={{display: 'inline-block'}}>
            {children}
          </div>
        </Popover.Element>
        <Popover.Content>
          <div>
          {
            options.map(x =>
              <div
                key={x.id}
                onClick={x.isDisabled || x.type === SEPARATOR ? null : evt => this._onOptionClick(x, evt)}>
                {x.type === SEPARATOR ? '------' : x.displayName}
              </div>)
          }
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(onClickOutside(Dropdown));
