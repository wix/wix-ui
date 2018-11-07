import * as React from 'react';
import { mount } from 'enzyme';
import { PrimitiveDocumentation } from './primitive-documentation';
import { MethodDocumentation } from './method-documentation';
import { ErrorSpy } from './error-spy';
import { FieldsDocumentation } from './fields-documentation';
import { DriverDocumentation } from './driver-documentation';
import { AutoTestkit } from './auto-testkit';

class Driver {
  private component;
  private spy;
  private hookPrefix;
  private Component;

  constructor(Component, hookPrefix) {
    this.Component = Component;
    this.hookPrefix = hookPrefix;
    this.reset();
  }

  protected selectRoot = () => this.component.childAt(0);

  protected select = hook =>
    this.component.find(`[data-hook="auto-testkit-${this.hookPrefix}${hook}"]`);

  when = {
    reused: component => {
      this.component = component;
      return this;
    },
    created: props => {
      const { Component } = this;

      const mounted = mount(
        <ErrorSpy spy={this.spy}>
          <Component {...props} />
        </ErrorSpy>,
      );
      return this.when.reused(mounted.childAt(0));
    },
  };

  reset = () => {
    this.component = undefined;
    this.spy = () => {};
  };
}
class AutoTestkitDriver extends Driver {
  constructor() {
    super(AutoTestkit, '');
  }

  get = {
    driverAt: index => {
      const driverDoc = this.select('driver').at(index);
      return DriverDocumentationDriver.create().given.component(driverDoc);
    },
    heading: () => this.select('heading').text(),
    tag: hook => this.select(hook).name(),
    rootClass: () => this.selectRoot().props().className,
  };
}

export const createAutoTestkitDriver = () => {
  const driver = new AutoTestkitDriver();
  afterEach(() => driver.reset());
  return driver;
};

export class DriverDocumentationDriver {
  private component;
  private spy;
  private select = subject =>
    this.component.find(`[data-hook="auto-testkit-driver-${subject}"]`);

  private constructor() {
    this.reset();
  }

  static create() {
    const driver = new DriverDocumentationDriver();
    afterEach(() => driver.reset());
    return driver;
  }

  reset = () => {
    this.spy = () => {};
    this.component = undefined;
  };

  when = {
    created: props => {
      const mounted = mount(
        <ErrorSpy spy={this.spy}>
          <DriverDocumentation {...props} />
        </ErrorSpy>,
      );
      return this.given.component(mounted.childAt(0));
    },
  };

  given = {
    spy: spy => {
      this.spy = spy;
      return this;
    },
    component: component => {
      this.component = component;
      return this;
    },
  };

  get = {
    name: () => this.select('name').text(),
    descriptor: () => this.select('descriptor').text(),
    fields: () => {
      const component = this.select('descriptor').childAt(0);
      return FieldsDocumentationDriver.create().given.component(component);
    },
    tag: hook => this.select(hook).name(),
  };
}

export class FieldsDocumentationDriver {
  private component;
  private spy;

  private constructor() {
    this.reset();
  }

  static create() {
    const driver = new FieldsDocumentationDriver();
    afterEach(() => driver.reset());
    return driver;
  }

  reset = () => {
    this.spy = () => {};
    this.component = undefined;
  };

  when = {
    created: props => {
      const mounted = mount(
        <ErrorSpy spy={this.spy}>
          <FieldsDocumentation {...props} />
        </ErrorSpy>,
      );
      this.given.component(mounted.childAt(0));
      return this;
    },
  };

  given = {
    spy: spy => {
      this.spy = spy;
      return this;
    },

    component: component => {
      this.component = component;
      return this;
    },
  };

  get = {
    html: () => this.component.html(),
    at: index => {
      const component = this.component
        .childAt(0)
        .childAt(0)
        .childAt(index);
      switch (component.props().unit.type) {
        case 'value':
        case 'object':
          return PrimitiveDocumentationDriver.create().given.component(
            component,
          );
        case 'function':
          return MethodDocumentationDriver.create().given.component(component);
        default:
          return this;
      }
    },
    name: () => null,
    count: () =>
      this.component
        .childAt(0)
        .childAt(0)
        .children().length,
  };
}

export class MethodDocumentationDriver {
  private component;
  private select = hook =>
    this.component.find(`[data-hook="auto-testkit-function-${hook}"]`);

  private constructor() {
    this.reset();
  }

  static create() {
    const driver = new MethodDocumentationDriver();
    afterEach(() => driver.reset());
    return driver;
  }

  reset = () => {
    this.component = undefined;
  };

  when = {
    created: props => {
      this.component = mount(
        <table>
          <tbody>
            <MethodDocumentation {...props} />
          </tbody>
        </table>,
      );
      return this;
    },
  };

  given = {
    component: component => {
      this.component = component;
      return this;
    },
  };

  get = {
    name: () => this.select('name').text(),
    arguments: () => this.select('arguments').text(),
    argumentNames: () => this.select('argument-name').map(name => name.text()),
    argumentTypes: () => this.select('argument-type').map(type => type.text()),
    description: () => this.select('description').text(),
  };
}

export class PrimitiveDocumentationDriver {
  private component;
  private select = hook =>
    this.component.find(`[data-hook="auto-testkit-primitive-${hook}"]`);

  private constructor() {
    this.reset();
  }

  static create() {
    const driver = new PrimitiveDocumentationDriver();
    afterEach(() => driver.reset());
    return driver;
  }

  reset = () => {
    this.component = undefined;
  };

  when = {
    created: props => {
      this.component = mount(
        <table>
          <tbody>
            <PrimitiveDocumentation {...props} />
          </tbody>
        </table>,
      );
      return this;
    },
  };

  given = {
    component: component => {
      this.component = component;
      return this;
    },
  };

  get = {
    name: () => this.select('name').text(),
    description: () => this.select('description').text(),
    tag: hook => this.select(hook).name(),
  };
}
