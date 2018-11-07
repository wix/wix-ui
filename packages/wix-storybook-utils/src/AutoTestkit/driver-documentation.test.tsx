import { flatten } from './driver-documentation';
import { DriverDocumentationDriver } from './drivers';

describe('DriverDocumentation', () => {
  it('has h2 for name', () => {
    const descriptor = [];
    const driver = new DriverDocumentationDriver().when.created({
      descriptor,
      name: 'a',
    });

    expect(driver.get.tag('name')).toBe('h2');
  });

  describe('case when there is a name but no descriptor', () => {
    const descriptor = [];
    const driver = new DriverDocumentationDriver().when.created({
      descriptor,
      name: 'a',
    });

    it('has a name', () => {
      expect(driver.get.name()).toBe('a');
    });

    it('has no descriptor', () => {
      expect(driver.get.descriptor()).toBe('(empty)');
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
        new DriverDocumentationDriver().given.spy(spy).when.created({
          descriptor,
          name: invalidName,
        });

        expect(spy).toHaveBeenCalled();

        console.error = consoleError;
      },
    );
  });

  describe('shallow driver descriptor', () => {
    const driver = new DriverDocumentationDriver();
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
        driver.when.created({
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
        driver.when.created({ name, descriptor });

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
    const driver = new DriverDocumentationDriver();
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

      driver.when.created({ name, descriptor: nestedDescriptor });

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
