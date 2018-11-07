import { MethodDocumentationDriver } from './drivers';

describe('MethodDocumentation', () => {
  const functionData = {
    name: 'method',
    type: 'function',
    args: [
      {
        name: 'param1',
        type: 'string',
      },
    ],
  };

  it('has a function name', () => {
    const driver = new MethodDocumentationDriver();

    driver.when.created(functionData);

    expect(driver.get.name()).toBe('method');
  });

  describe('no arguments', () => {
    const driver = new MethodDocumentationDriver();

    driver.when.created({
      ...functionData,
      args: [],
    });

    it(`has an empty string`, () => {
      expect(driver.get.arguments()).toBe('');
    });
  });

  describe('arguments with types', () => {
    describe('one', () => {
      const driver = new MethodDocumentationDriver();
      driver.when.created(functionData);
      it('has name', () => {
        expect(driver.get.argumentNames()[0]).toBe('param1');
      });

      it('has type', () => {
        expect(driver.get.argumentTypes()[0]).toBe(':string');
      });
    });

    describe('multiple', () => {
      const driver = new MethodDocumentationDriver();

      const functionDataWithMultipleArgsModel = {
        ...functionData,
        args: [
          { name: 'str1', type: 'string' },
          { name: 'str2', type: 'string' },
        ],
      };
      driver.when.created(functionDataWithMultipleArgsModel);

      it('has a list of arguments', () => {
        expect(driver.get.argumentNames().length).toBe(2);
      });

      it('has names', () => {
        const names = driver.get.argumentNames();
        expect(names.length).toBe(
          functionDataWithMultipleArgsModel.args.length,
        );
        functionDataWithMultipleArgsModel.args.forEach((argument, index) => {
          expect(names[index]).toBe(argument.name);
        });
      });

      it('has types', () => {
        const types = driver.get.argumentTypes();
        expect(types.length).toBe(
          functionDataWithMultipleArgsModel.args.length,
        );
        functionDataWithMultipleArgsModel.args.forEach((argument, index) => {
          expect(types[index]).toBe(`:${argument.type}`);
        });
      });
    });
  });

  describe('arguments without types', () => {
    const driver = new MethodDocumentationDriver();

    const functionWithoutArgTypesModel = {
      ...functionData,
      args: [
        {
          name: 'str1',
        },
        {
          name: 'str2',
        },
      ],
    };

    driver.when.created(functionWithoutArgTypesModel);

    it('has arguments names', () => {
      expect(driver.get.argumentNames().length).toBe(2);
    });

    it(`doesn't render argument types`, () => {
      expect(driver.get.argumentTypes().length).toBe(0);
    });
  });

  describe('description', () => {
    const driver = new MethodDocumentationDriver();
    const functionWithDescription = {
      ...functionData,
      args: [],
      description: 'some description',
    };

    it('can have a description', () => {
      driver.when.created(functionWithDescription);

      expect(driver.get.description()).toBe(
        functionWithDescription.description,
      );
    });

    it('renders empty cell when theres no description', () => {
      driver.when.created(functionData);

      expect(driver.get.description()).toBe('');
    });
  });
});
