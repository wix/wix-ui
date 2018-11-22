import { createFieldsDocumentationDriver } from './drivers';

describe('FieldsDocumentation', () => {
  const driver = createFieldsDocumentationDriver();
  describe('with no content', () => {
    it('renders text "(empty)"', () => {
      driver.create({ units: [] });

      expect(driver.get.content()).toBe('(empty)');
    });
  });

  it('renders primitives', () => {
    const units = [
      {
        type: 'value',
        name: 'not-a-function',
      },
      {
        type: 'object',
        name: 'not-a-function-either',
      },
      {
        type: 'error',
        name: 'failure during parsing',
      },
    ];

    driver.create({ units });

    expect(driver.get.count()).toBe(units.length);
    units.forEach((unit, i) => {
      expect(driver.get.at(i).get.name()).toBe(unit.name);
    });
  });

  it('renders functions', () => {
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

  it('renders combinations of values and functions', () => {
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

  it('fails when invalid unit type is given', () => {
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
