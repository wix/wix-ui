import * as React from 'react';
import { mount } from 'enzyme';
import { PrimitiveDocumentation } from './primitive-documentation';
import { MethodDocumentation } from './method-documentation';
import { ErrorSpy } from './error-spy';
import { FieldsDocumentation } from './fields-documentation';
import { DriverDocumentation } from './driver-documentation';
import { AutoTestkit } from './auto-testkit';

export class AutoTestkitDriver {
  private component;
  private select = hook =>
    this.component.find(`[data-hook="auto-testkit-${hook}"]`);

  when = {
    created: data => {
      this.component = mount(<AutoTestkit component={data} />);
      return this;
    },
  };

  get = {
    driverAt: index => {
      const driverDoc = this.select('driver').at(index);
      return new DriverDocumentationDriver().given.component(driverDoc);
    },
    heading: () => this.select('heading').text(),
    tag: hook => this.select(hook).name(),
    rootClass: () => this.component.childAt(0).props().className,
  };
}

export class DriverDocumentationDriver {
  private component;
  private spy = () => {};
  private select = subject =>
    this.component.find(`[data-hook="auto-testkit-driver-${subject}"]`);

  when = {
    created: data => {
      const { descriptor, name } = data;
      const mounted = mount(
        <ErrorSpy spy={this.spy}>
          <DriverDocumentation descriptor={descriptor} name={name} />
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
      return new FieldsDocumentationDriver().given.component(component);
    },
    tag: hook => this.select(hook).name(),
  };
}

export class FieldsDocumentationDriver {
  private component;
  private spy = () => {};

  when = {
    created: data => {
      const mounted = mount(
        <ErrorSpy spy={this.spy}>
          <FieldsDocumentation data={data} />
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
      switch (component.props().data.type) {
        case 'value':
        case 'object':
          return new PrimitiveDocumentationDriver().given.component(component);
        case 'function':
          return new MethodDocumentationDriver().given.component(component);
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

  when = {
    created: data => {
      this.component = mount(
        <table>
          <tbody>
            <MethodDocumentation data={data} />
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

  when = {
    created: data => {
      this.component = mount(
        <table>
          <tbody>
            <PrimitiveDocumentation data={data} />
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
