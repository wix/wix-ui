import * as React from 'react';
import { mount } from 'enzyme';

interface IErrorSpy {
  spy: Function;
}

class ErrorSpy extends React.Component<IErrorSpy, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(err, info) {
    this.props.spy(err, info);
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export class Driver {
  private component;
  private readonly hookPrefix;
  private readonly Component;

  constructor(Component, hookPrefix) {
    this.Component = Component;
    this.hookPrefix = hookPrefix;
    this.reset();
  }

  protected selectRoot = () => this.component.childAt(0);

  protected select = hook =>
    this.component.find(`[data-hook="auto-testkit-${this.hookPrefix}${hook}"]`);

  create = (
    props,
    spy = err => {
      console.log(err.stack);
    },
  ) => {
    const { Component } = this;
    const mounted = mount(
      <ErrorSpy spy={spy}>
        <Component {...props} />
      </ErrorSpy>,
    );

    return this.reuse(mounted.childAt(0));
  };

  reuse = component => {
    this.component = component;
    return this;
  };

  reset = () => {
    this.component = undefined;
  };
}

export const r = driver => {
  afterEach(() => driver.reset());
  return driver;
};
