import { flatten } from './flatten';
import { createDriverDocumentationDriver } from './drivers';

describe('DriverDocumentation', () => {
  const driver = createDriverDocumentationDriver();

  it('has h2 for name', () => {
    const descriptor = [];
    driver.create({
      descriptor,
      title: 'a',
    });

    expect(driver.get.tag('name')).toBe('h2');
  });

  describe('case when there is a name but no descriptor', () => {
    const descriptor = [];
    beforeEach(() => {
      driver.create({
        descriptor,
        title: 'a',
      });
    });

    it('has a name', () => {
      expect(driver.get.name()).toBe('a');
    });

    it('has no descriptor', () => {
      expect(driver.get.fields().get.content()).toBe('(empty)');
    });
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
