import { createMethodDocumentationDriver } from './drivers';

describe('MethodDocumentation', () => {
  const driver = createMethodDocumentationDriver();
  const method = {
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
    driver.create({ unit: method });

    expect(driver.get.name()).toBe('method');
  });

  describe('no arguments', () => {
    beforeEach(() => {
      driver.create({
        unit: {
          ...method,
          args: [],
        },
      });
    });

    it(`has an empty string`, () => {
      expect(driver.get.arguments()).toBe('');
    });
  });

  describe('arguments', () => {
    describe('with types', () => {
      describe('one', () => {
        beforeEach(() => {
          driver.create({ unit: method });
        });

        it('has name', () => {
          expect(driver.get.argumentNames()[0]).toBe('param1');
        });

        it('has type', () => {
          expect(driver.get.argumentTypes()[0]).toBe(': string');
        });
      });

      describe('multiple', () => {
        const unit = {
          ...method,
          args: [
            { name: 'str1', type: 'string' },
            { name: 'str2', type: 'string' },
          ],
        };
        beforeEach(() => {
          driver.create({ unit });
        });

        it('has a list of arguments', () => {
          expect(driver.get.argumentNames().length).toBe(2);
        });

        it('has names', () => {
          const names = driver.get.argumentNames();
          expect(names.length).toBe(unit.args.length);
          unit.args.forEach((argument, index) => {
            expect(names[index]).toBe(argument.name);
          });
        });

        it('has types', () => {
          const types = driver.get.argumentTypes();
          expect(types.length).toBe(unit.args.length);
          unit.args.forEach((argument, index) => {
            expect(types[index]).toBe(`: ${argument.type}`);
          });
        });

        it('are comma separated', () => {
          const args = driver.get.arguments();

          expect(args).toBe('str1: string, str2: string');
        });
      });
    });

    describe('without types', () => {
      beforeEach(() => {
        driver.create({
          unit: {
            ...method,
            args: [
              {
                name: 'str1',
              },
              {
                name: 'str2',
              },
            ],
          },
        });
      });

      it('has arguments names', () => {
        expect(driver.get.argumentNames().length).toBe(2);
      });

      it(`doesn't render argument types`, () => {
        expect(driver.get.argumentTypes().length).toBe(0);
      });

      it('are comma separated', () => {
        const args = driver.get.arguments();

        expect(args).toBe('str1, str2');
      });
    });
  });

  describe('description', () => {
    it('can have a description', () => {
      const description = 'some description';
      driver.create({
        unit: {
          ...method,
          description,
        },
      });

      expect(driver.get.description()).toBe(description);
    });

    it('renders empty cell when theres no description', () => {
      driver.create({ unit: method });

      expect(driver.get.description()).toBe('');
    });
  });
});
