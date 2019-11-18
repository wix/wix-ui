import * as React from 'react';

import { Driver, r } from './driver';
import { PrimitiveDocumentation } from './primitive-documentation';
import { MethodDocumentation } from './method-documentation';
import { FieldsDocumentation } from './fields-documentation';
import { DriverDocumentation } from './driver-documentation';

import { AutoTestkit } from './index';
import Markdown from '../Markdown';

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

    allFields: () => {
      const components = this.select('fields');

      const allFields = components.reduce((fields, component) => {
        const field = createFieldsDocumentationDriver().reuse(component);
        const count = field.get.count();

        let i = 0;
        while (i < count) {
          fields.push(field.get.at(i));
          i++;
        }

        return fields;
      }, []);

      return allFields;
    },

    tag: (hook: string) => this.select(hook).name(),
    importCode: () => this.find('[data-hook="metadata-import-markdown"]').prop('source'),
  };
}

class AutoTestkitDriver extends Driver {
  constructor() {
    super(AutoTestkit, '');
  }

  get = {
    driverAt: (index: number) => {
      const driverDoc = this.select('driver').at(index);
      return driverDoc.length === 0
        ? null
        : createDriverDocumentationDriver().reuse(driverDoc);
    },
    heading: () => this.select('heading').text(),
    tag: (hook: string) => this.select(hook).name(),
    rootClass: () => this.selectRoot().props().className,
    warning: () =>
      this.select('warning')
        .find(Markdown)
        .prop('source'),
  };
}

class FieldsDocumentationDriver extends Driver {
  constructor() {
    super(FieldsDocumentation, '');
  }

  get = {
    content: () => this.select('fields').text(),

    at: (index: number) => {
      const component = this.select('field').at(index);

      switch (component.props().unit.type) {
        case 'value':
        case 'error':
        case 'object':
          return createPrimitiveDocumentationDriver().reuse(component);
        case 'function':
          return createMethodDocumentationDriver().reuse(component);
        default:
          return this;
      }
    },

    count: () => this.find('tbody tr').length,

    header: (hook: string) => {
      const header = this.select(`${hook}-header`);
      return {
        tag: () => header.name(),
        text: () => header.text(),
      };
    },
  };
}

class MethodDocumentationDriver extends Driver {
  private static readonly Component = props => (
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
  private static readonly Component = props => (
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
    tag: (hook: string) => this.select(hook).name(),
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
