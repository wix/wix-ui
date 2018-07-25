import * as React from 'react';
import {mount} from 'enzyme';

import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';

import {withFocusable, focusableStates} from './FocusableHOC';

declare global {
  interface Window { Event: any; }
}

interface IPureChildComponentProps {
  id: string;
  focusableOnFocus: any;
  focusableOnBlur: any;
}

export class PureChildComponent extends React.PureComponent<IPureChildComponentProps> {
  private id: string;

  constructor(props) {
    super(props);
    this.id = props.id;
    this.boundMethod = this.boundMethod.bind(this);
  }

  static staticVariable = 'staticVariable';
  static staticMethod = () => 'staticMethod';

  unboundMethod = () =>  'unboundMethod'

  boundMethod = () => this.id;

  render() {
    return (
      <div
        onFocus={this.props.focusableOnFocus}
        onBlur={this.props.focusableOnBlur}
        {...focusableStates(this.props)}
      >
        Hello
      </div>
    );
  }
}

const focusableDriverFactory = ({ element, eventTrigger }) => {
  return {
    exists: () => true,
    focus: () => eventTrigger.focus(element),
    blur: () => eventTrigger.blur(element),
    hasFocusState: () => !!element.getAttribute('data-focus'),
    hasFocusVisibleState: () => !!element.getAttribute('data-focus-visible')
  };
};

const driverFactory = createDriverFactory(focusableDriverFactory);

export const createDriver = Component => {
  const driver = driverFactory(Component);
  const fireMouseDown = () => window.dispatchEvent(new window.Event('mousedown'));
  const fireMouseUp = () => window.dispatchEvent(new window.Event('mouseup'));
  const fireKeyDown = () => window.dispatchEvent(new window.Event('keydown'));
  const fireKeyUp = () => window.dispatchEvent(new window.Event('keyup'));
  const tabOut = () => {
    fireKeyDown();
    driver.blur();
    fireKeyUp();
  };
  const tabIn = () => {
    fireKeyDown();
    driver.focus();
    fireKeyUp();
  };
  const click = () => {
    fireMouseDown();
    driver.focus();
    fireMouseUp();
  };

  return {
    ...driver,
    fireMouseDown,
    fireKeyDown,
    fireKeyUp,
    tabOut,
    tabIn,
    click
  };
};

export const WithFocusableComp = withFocusable(PureChildComponent);
