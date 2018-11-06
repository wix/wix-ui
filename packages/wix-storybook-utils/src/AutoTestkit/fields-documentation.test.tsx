import * as React from 'react';
import { mount } from 'enzyme';
import { FieldsDocumentation } from './fields-documentation';
import { ValueDocumentationDriver } from './value-documentation.test';
import { MethodDocumentationDriver } from './method-documentation.test';
import { ErrorSpy } from './error-spy';

class FieldsDocumentationDriver {
  component;
  data;
  spy = () => {};
  when = {
    created: data => {
      this.data = data;
      this.component = mount(
        <ErrorSpy spy={this.spy}>
          <FieldsDocumentation data={data} />
        </ErrorSpy>,
      );
      return this;
    },
  };

  given = {
    spy: spy => {
      this.spy = spy;
      return this;
    },
  };
  get = {
    html: () => this.component.html(),
    at: index => {
      const component = this.component
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .childAt(index);
      switch (component.props().data.type) {
        case 'value':
          return new ValueDocumentationDriver().given(component);
        case 'function':
          return new MethodDocumentationDriver().given(component);
        default:
          return this;
      }
    },
    name: () => null,
    count: () =>
      this.component
        .childAt(0)
        .childAt(0)
        .childAt(0)
        .children().length,
  };
}

describe('FieldsDocumentation', () => {
  const fieldsDriver = new FieldsDocumentationDriver();
  it('renders', () => {
    fieldsDriver.when.created([]);
    expect(fieldsDriver.get.html()).toBe(null);
  });

  it('todo1', () => {
    const data = [
      {
        type: 'value',
        name: 'not-a-function',
      },
    ];

    fieldsDriver.when.created(data);

    expect(fieldsDriver.get.count()).toBe(data.length);
    expect(fieldsDriver.get.at(0).get.name()).toBe('not-a-function');
  });

  it('todo2', () => {
    const data = [
      {
        type: 'value',
        name: 'not-a-function',
      },
      {
        type: 'value',
        name: 'not-a-function2',
      },
    ];
    fieldsDriver.when.created(data);

    expect(fieldsDriver.get.count()).toBe(data.length);
    data.forEach((value, index) => {
      expect(fieldsDriver.get.at(index).get.name()).toBe(value.name);
    });
  });

  it('todo3', () => {
    const data = [
      {
        type: 'value',
        name: 'not-a-function',
      },
      {
        type: 'function',
        args: [],
        name: 'func',
      },
    ];
    fieldsDriver.when.created(data);
    expect(fieldsDriver.get.count()).toBe(data.length);

    data.forEach((field, index) => {
      expect(fieldsDriver.get.at(index).get.name()).toBe(field.name);
    });
  });

  it('silent failure', () => {
    const consoleError = console.error;
    console.error = jest.fn();

    const data = [
      {
        type: 'notFittingType',
        name: 'no name',
      },
    ];
    const spy = jest.fn();
    fieldsDriver.given.spy(spy);

    fieldsDriver.when.created(data);

    expect(spy).toHaveBeenCalled();

    console.error = consoleError;
  });
});
