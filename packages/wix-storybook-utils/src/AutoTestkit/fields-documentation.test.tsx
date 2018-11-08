import { createFieldsDocumentationDriver } from './drivers';

describe('FieldsDocumentation', () => {
  const driver = createFieldsDocumentationDriver();
  it('renders text "(empty)"', () => {
    driver.create({ units: [] });

    expect(driver.get.content()).toBe('(empty)');
  });

  it('todo1', () => {
    const units = [
      {
        type: 'value',
        name: 'not-a-function',
      },
    ];

    driver.create({ units });

    expect(driver.get.count()).toBe(units.length);
    expect(driver.get.at(0).get.name()).toBe('not-a-function');
  });

  it('todo2', () => {
    const units = [
      {
        type: 'value',
        name: 'not-a-function',
      },
      {
        type: 'value',
        name: 'not-a-function2',
      },
    ];

    driver.create({ units });

    expect(driver.get.count()).toBe(units.length);
    units.forEach((unit, index) => {
      expect(driver.get.at(index).get.name()).toBe(unit.name);
    });
  });

  it('todo3', () => {
    const units = [
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

    driver.create({ units });

    expect(driver.get.count()).toBe(units.length);
    units.forEach((unit, index) => {
      expect(driver.get.at(index).get.name()).toBe(unit.name);
    });
  });

  it('silent failure', () => {
    const consoleError = console.error;
    console.error = jest.fn();

    const units = [
      {
        type: 'notFittingType',
        name: 'no name',
      },
    ];
    const spy = jest.fn();

    driver.create({ units }, spy);

    expect(spy).toHaveBeenCalled();

    console.error = consoleError;
  });

  it('has a property header', () => {
    const units = [
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

    driver.create({ units });
    expect(driver.get.header('property').tag()).toBe('th');
    expect(driver.get.header('property').text()).toBe('Property');
  });

  it('has a description header', () => {
    const units = [
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

    driver.create({ units });
    expect(driver.get.header('description').tag()).toBe('th');
    expect(driver.get.header('description').text()).toBe('Description');
  });
});
