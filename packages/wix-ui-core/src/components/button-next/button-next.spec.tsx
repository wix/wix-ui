import * as React from 'react';
import * as eventually from 'wix-eventually';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { ButtonNext } from './';
import { buttonNextPrivateDriverFactory } from './button-next.driver.private';

describe('ButtonNext', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(buttonNextPrivateDriverFactory);

  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  describe(`'onClick' prop`, () => {
    it('should be called on click', async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonNext onClick={onClick} />);
      await driver.click();
      expect(onClick).toBeCalled();
    });

    it(`should not call 'onClick' when 'disabled'`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonNext onClick={onClick} disabled />);
      await driver.click();
      expect(onClick).not.toBeCalled();
    });
  });

  describe(`'children' prop`, () => {
    it('should render text', async () => {
      const text = 'button';
      const driver = createDriver(<ButtonNext children={text} />);
      expect(await driver.getButtonTextContent()).toBe(text);
    });
  });

  describe(`'suffixIcon' and 'prefixIcon' props`, () => {
    const suffix = <div data-hook="suffix">suffix</div>;
    const prefix = <div data-hook="prefix">prefix</div>;

    it(`should render 'suffix' when given`, async () => {
      const driver = createDriver(<ButtonNext suffixIcon={suffix} />);
      expect(await driver.suffixExists()).toBeTruthy();
      expect(await driver.prefixExists()).toBeFalsy();
    });

    it(`should render 'prefix' when given`, async () => {
      const driver = createDriver(<ButtonNext prefixIcon={prefix} />);
      expect(await driver.prefixExists()).toBeTruthy();
      expect(await driver.suffixExists()).toBeFalsy();
    });
  });

  describe(`'as' prop`, () => {
    const Test = props => <span {...props} />;
    it('should render by default as html button', async () => {
      testContainer.renderSync(<ButtonNext />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.tagName;
        expect(htmlTag).toBe('BUTTON');
      });
    });
    it('should render custom html tag', async () => {
      testContainer.renderSync(<ButtonNext as="a" />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.tagName;
        expect(htmlTag).toBe('A');
      });
    });
    it('should render custom react component', async () => {
      testContainer.renderSync(<ButtonNext as={Test} />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.tagName;
        expect(htmlTag).toBe('SPAN');
      });
    });
  });

  describe(`'disabled' prop`, () => {
    it('when given should render component with tabIndex -1', async () => {
      testContainer.renderSync(<ButtonNext disabled />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.getAttribute('tabindex');
        expect(htmlTag).toBe('-1');
      });
    });

    it('when given should render aria-disabled as true', async () => {
      testContainer.renderSync(<ButtonNext disabled />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.getAttribute(
          'aria-disabled'
        );
        expect(htmlTag).toBe('true');
      });
    });
  });

  describe(`'type' prop`, () => {
    it('should render value `button` when props `as` and `type` are undefined', async () => {
      testContainer.renderSync(<ButtonNext />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.getAttribute('type');
        expect(htmlTag).toBe('button');
      });
    });
    it('should render value `submit` when prop `type="submit"` and `as` is undefined', async () => {
      testContainer.renderSync(<ButtonNext type="submit" />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.getAttribute('type');
        expect(htmlTag).toBe('submit');
      });
    });

    it('should render prop `type` undefined if as prop is `a`', async () => {
      testContainer.renderSync(<ButtonNext as="a" />);

      await eventually(() => {
        const htmlTag = testContainer.componentNode.getAttribute('type');
        expect(!!htmlTag).toBe(false);
      });
    });
  });
});
