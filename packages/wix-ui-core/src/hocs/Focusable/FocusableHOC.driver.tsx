import * as React from 'react';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import { StylableDOMUtil } from '@stylable/dom-test-kit';

import { withFocusable } from './FocusableHOC';
import * as stylesheet from './Focusable.st.css';

declare global {
  interface Window {
    Event: any;
  }
}

export interface IPureChildComponentProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  className?: string;
  id: string;
  focusableOnFocus: any;
  focusableOnBlur: any;
}

const stylableUtil = new StylableDOMUtil(stylesheet);

const hasFocusState = (element) => stylableUtil.hasStyleState(element, 'focus');
const hasFocusVisibleState = (element) =>
  stylableUtil.hasStyleState(element, 'focus-visible');

export class PureChildComponent extends React.PureComponent<IPureChildComponentProps> {
  private readonly id: string;

  constructor(props) {
    super(props);
    this.id = props.id;
    this.boundMethod = this.boundMethod.bind(this);
  }

  static staticVariable = 'staticVariable';
  static staticMethod = () => 'staticMethod';

  unboundMethod = () => 'unboundMethod';

  boundMethod = () => this.id;

  render() {
    return (
      <div
        onFocus={this.props.focusableOnFocus}
        onBlur={this.props.focusableOnBlur}
        className={stylesheet.st(stylesheet.classes.root, this.props.className)}
        data-hook={this.props['data-hook']}
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
    hasFocusState: () => hasFocusState(element),
    hasFocusVisibleState: () => hasFocusVisibleState(element),
  };
};

const driverFactory = createDriverFactory(focusableDriverFactory);

export const createDriver = (Component) => {
  const driver = driverFactory(Component);
  const fireMouseDown = () =>
    window.dispatchEvent(new window.Event('mousedown'));
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
    click,
  };
};

export const WithFocusableComp = withFocusable(PureChildComponent);
