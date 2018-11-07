import { FieldsDocumentationDriver } from './drivers';

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
