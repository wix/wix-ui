import * as React from 'react';
import { PrimitiveDocumentation } from './primitive-documentation';
import { MethodDocumentation } from './method-documentation';
import { Driver, r } from './driver';
import { FieldsDocumentation } from './fields-documentation';
import { DriverDocumentation } from './driver-documentation';
import { AutoTestkit } from './auto-testkit';

class DriverDocumentationDriver extends Driver {
  constructor() {
    super(DriverDocumentation, 'driver-');
  }

  get = {
    name: () => this.select('name').text(),
    descriptor: () => this.select('descriptor').text(),
    fields: () => {
      const component = this.select('descriptor').childAt(0);
      return createFieldsDocumentationDriver().reuse(component);
    },
    tag: hook => this.select(hook).name(),
  };
}

class AutoTestkitDriver extends Driver {
  constructor() {
    super(AutoTestkit, '');
  }

  get = {
    driverAt: index => {
      const driverDoc = this.select('driver').at(index);
      return createDriverDocumentationDriver().reuse(driverDoc);
    },
    heading: () => this.select('heading').text(),
    tag: hook => this.select(hook).name(),
    rootClass: () => this.selectRoot().props().className,
  };
}

class FieldsDocumentationDriver extends Driver {
  constructor() {
    super(FieldsDocumentation, '');
  }

  get = {
    isEmpty: () => this.selectRoot().length === 0,
    at: index => {
      const component = this.selectRoot()
        .childAt(0)
        .childAt(index + 1);
      switch (component.props().unit.type) {
        case 'value':
        case 'object':
          return createPrimitiveDocumentationDriver().reuse(component);
        case 'function':
          return createMethodDocumentationDriver().reuse(component);
        default:
          return this;
      }
    },
    count: () =>
      this.selectRoot()
        .childAt(0)
        .children().length - 1,
    header: hook => {
      const header = this.select(`${hook}-header`);
      return {
        tag: () => header.name(),
        text: () => header.text(),
      };
    },
  };
}

class MethodDocumentationDriver extends Driver {
  private static Component = props => (
    <table>
      <tbody>
        <MethodDocumentation {...props} />
      </tbody>
    </table>
  );

  constructor() {
    super(MethodDocumentationDriver.Component, 'function-');
  }

  get = {
    name: () => this.select('name').text(),
    arguments: () => this.select('arguments').text(),
    argumentNames: () => this.select('argument-name').map(name => name.text()),
    argumentTypes: () => this.select('argument-type').map(type => type.text()),
    description: () => this.select('description').text(),
  };
}

class PrimitiveDocumentationDriver extends Driver {
  private static Component = props => (
    <table>
      <tbody>
        <PrimitiveDocumentation {...props} />
      </tbody>
    </table>
  );

  constructor() {
    super(PrimitiveDocumentationDriver.Component, 'primitive-');
  }

  get = {
    name: () => this.select('name').text(),
    description: () => this.select('description').text(),
    tag: hook => this.select(hook).name(),
  };
}

export const createPrimitiveDocumentationDriver = () =>
  r(new PrimitiveDocumentationDriver());
export const createMethodDocumentationDriver = () =>
  r(new MethodDocumentationDriver());
export const createFieldsDocumentationDriver = () =>
  r(new FieldsDocumentationDriver());
export const createAutoTestkitDriver = () => r(new AutoTestkitDriver());
export const createDriverDocumentationDriver = () =>
  r(new DriverDocumentationDriver());
