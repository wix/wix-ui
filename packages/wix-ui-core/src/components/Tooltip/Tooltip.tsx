import * as React from 'react';
import {string, object} from 'prop-types';
import Popover, {Placement} from '../Popover';
import {buildChildrenObject, createComponentThatRendersItsChildren} from '../../utils';
import {createHOC} from '../../createHOC';

interface TooltipProps {
  placement?: Placement;
  classes: TooltipClasses;
}

interface TooltipState {
  isHover: boolean;
}

type TooltipClasses = {
  tooltip: string;
}

class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {

  static Element = createComponentThatRendersItsChildren('Tooltip.Element');
  static Content = createComponentThatRendersItsChildren('Tooltip.Content');

  static propTypes = {
    /** The location to display the content */
    placement: string,
    /** Classes object */
    classes: object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isHover: false
    };
  }

  _setHover(isHover) {
    this.setState({isHover});
  }

  render () {
    const {placement, children, classes} = this.props;
    const childrenObject = buildChildrenObject(children, {Element: null, Content: null});
    const {isHover} = this.state;

    return (
      <Popover placement={placement} shown={isHover}>
        <Popover.Element>
          <div
            data-hook="tooltip-element"
            onMouseEnter={() => this._setHover(true)}
            onMouseLeave={() => this._setHover(false)}>
            {childrenObject.Element}
          </div>
        </Popover.Element>
        <Popover.Content>
          <div className={classes.tooltip}>
            {childrenObject.Content}
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}

export default createHOC(Tooltip);
