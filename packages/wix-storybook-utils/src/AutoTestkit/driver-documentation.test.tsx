import { flatten } from './driver-documentation';
import { createDriverDocumentationDriver } from './drivers';

describe('DriverDocumentation', () => {
  const driver = createDriverDocumentationDriver();

  it('has h2 for name', () => {
    const descriptor = [];
    driver.create({
      descriptor,
      name: 'a',
    });

    expect(driver.get.tag('name')).toBe('h2');
  });

  describe('case when there is a name but no descriptor', () => {
    const descriptor = [];
    beforeEach(() => {
      driver.create({
        descriptor,
        name: 'a',
      });
    });

    it('has a name', () => {
      expect(driver.get.name()).toBe('a');
    });

    it('has no descriptor', () => {
      expect(driver.get.fields().get.content()).toBe('(empty)');
    });
  });

  describe('cases when there is no valid name', () => {
    it.each([[null], [undefined], [''], [5], [true], [{}]])(
      'fails if name is not a valid string (%p)',
      invalidName => {
        const consoleError = console.error;
        console.error = i => i;

        const descriptor = [];
        const spy = jest.fn();
        driver.create(
          {
            descriptor,
            name: invalidName,
          },
          spy,
        );

        expect(spy).toHaveBeenCalled();

        console.error = consoleError;
      },
    );
  });

  describe('shallow driver descriptor', () => {
    const name = 'name';
    describe('single item in the descriptor', () => {
      it('renders fields documentation for a given descriptor', () => {
        const descriptor = [
          {
            name: 'click',
            args: [],
            type: 'function',
          },
        ];
        driver.create({
          descriptor,
          name,
        });
        expect(
          driver.get
            .fields()
            .get.at(0)
            .get.name(),
        ).toBe('click');
      });
    });

    describe('multiple items in the descriptor', () => {
      it('renders fields documentation for value and function descriptors', () => {
        const descriptor = [
          {
            name: 'click',
            args: [],
            type: 'function',
          },
          {
            name: 'some-value',
            args: [],
            type: 'value',
          },
        ];
        driver.create({ name, descriptor });

        descriptor.forEach((item, index) => {
          expect(
            driver.get
              .fields()
              .get.at(index)
              .get.name(),
          ).toBe(item.name);
        });
        expect(driver.get.fields().get.count()).toBe(descriptor.length);
      });
    });
  });

  describe('deep driver descriptor', () => {
    const name = 'nested';

    it('renders a flattened out fields documentation', () => {
      const nestedDescriptor = [
        {
          type: 'object',
          name: 'wrapper',
          props: [
            {
              name: 'click',
              args: [],
              type: 'function',
            },
            {
              name: 'some-value',
              args: [],
              type: 'value',
            },
          ],
        },
      ];

      driver.create({ name, descriptor: nestedDescriptor });

      flatten(nestedDescriptor).forEach((item, index) => {
        expect(
          driver.get
            .fields()
            .get.at(index)
            .get.name(),
        ).toBe(item.name);
      });
    });
  });
});
