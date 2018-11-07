import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { ErrorSpy } from './error-spy';
import { DriverDocumentation, flatten } from './driver-documentation';
import { FieldsDocumentationDriver } from './fields-documentation.test';

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
