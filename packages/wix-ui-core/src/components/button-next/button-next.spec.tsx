import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { ButtonNext } from './';
import { buttonNextPrivateDriverFactory } from './button-next.driver.private';

describe('ButtonNext', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRendererAsync(buttonNextPrivateDriverFactory);

  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  describe(`'onClick' prop`, () => {
    it('should be called on click', async () => {
      const onClick = jest.fn();
      const driver = await createDriver(<ButtonNext onClick={onClick} />);
      await driver.click();
      expect(onClick).toBeCalled();
    });

    it(`should not call 'onClick' when 'disabled'`, async () => {
      const onClick = jest.fn();
      const driver = await createDriver(
        <ButtonNext onClick={onClick} disabled />,
      );
      await driver.click();
      expect(onClick).not.toBeCalled();
    });
  });

  describe('"focus" method', () => {
    it('should allow to focus on button using the focus method on its ref', async () => {
      const ref = React.createRef<any>();
      const driver = await createDriver(<ButtonNext ref={ref} />);
      expect(await driver.isFocused()).toEqual(false);
      ref.current.focus();
      expect(await driver.isFocused()).toEqual(true);
    });
  });

  describe(`'children' prop`, () => {
    it('should render text', async () => {
      const text = 'button';
      const driver = await createDriver(<ButtonNext children={text} />);
      expect(await driver.getButtonTextContent()).toBe(text);
    });
  });

  describe(`'type' prop`, () => {
    it('should be button by default', async () => {
      await testContainer.render(<ButtonNext />);
      const htmlTag = testContainer.componentNode.getAttribute('type');
      expect(htmlTag).toBe('button');
    });
  });

  describe(`'suffixIcon' and 'prefixIcon' props`, () => {
    const suffixInternalClass = 'suffix-internal-class';
    const suffix = (
      <div data-hook="suffix" className={suffixInternalClass}>
        suffix
      </div>
    );
    const prefixInternalClass = 'prefix-internal-class';
    const prefix = (
      <div data-hook="prefix" className={prefixInternalClass}>
        prefix
      </div>
    );

    it(`should render 'suffix' with its class name when given`, async () => {
      const driver = await createDriver(<ButtonNext suffixIcon={suffix} />);

      expect(await driver.prefixExists()).toBeFalsy();
      expect(await driver.suffixExists()).toBeTruthy();
      expect(await driver.hasSuffixClass(suffixInternalClass)).toBe(true);
    });

    it(`should render 'prefix' with its class name when given`, async () => {
      const driver = await createDriver(<ButtonNext prefixIcon={prefix} />);

      expect(await driver.suffixExists()).toBeFalsy();
      expect(await driver.prefixExists()).toBeTruthy();
      expect(await driver.hasPrefixClass(prefixInternalClass)).toBe(true);
    });
  });

  describe(`'as' prop`, () => {
    const Test = (props) => <span {...props} />;
    class TestReact extends React.Component {
      render() {
        return <p>{this.props.children}</p>;
      }
    }
    it('should render by default as html button', async () => {
      await testContainer.render(<ButtonNext />);
      const htmlTag = testContainer.componentNode.tagName;
      expect(htmlTag).toBe('BUTTON');
    });

    it('should render custom html tag', async () => {
      await testContainer.render(<ButtonNext as="a" />);
      const htmlTag = testContainer.componentNode.tagName;
      expect(htmlTag).toBe('A');
    });

    it('should render custom functional react component', async () => {
      await testContainer.render(<ButtonNext as={Test} />);
      const htmlTag = testContainer.componentNode.tagName;
      expect(htmlTag).toBe('SPAN');
    });

    it('should render custom react class component', async () => {
      await testContainer.render(<ButtonNext as={TestReact} />);
      const htmlTag = testContainer.componentNode.tagName;
      expect(htmlTag).toBe('P');
    });
  });

  describe(`Disabled`, () => {
    describe('isButtonDisabled', () => {
      it('should NOT be disabled by default', async () => {
        const driver = await createDriver(<ButtonNext />);
        expect(await driver.isButtonDisabled()).toBeFalsy();
      });

      it('should be disabled when disabled is passed', async () => {
        const driver = await createDriver(<ButtonNext disabled />);

        expect(await driver.isButtonDisabled()).toBeTruthy();
      });

      it('should be disabled when href is provided', async () => {
        const driver = await createDriver(
          <ButtonNext as="a" disabled href="wix" />,
        );
        expect(await driver.isButtonDisabled()).toBeTruthy();
      });
    });

    it('should render component with tabIndex -1 when disabled', async () => {
      await testContainer.render(<ButtonNext disabled />);

      const htmlTag = testContainer.componentNode.getAttribute('tabindex');
      expect(htmlTag).toBe('-1');
    });

    it('should render aria-disabled as true when disabled', async () => {
      await testContainer.render(<ButtonNext disabled />);

      const htmlTag = testContainer.componentNode.getAttribute('aria-disabled');
      expect(htmlTag).toBe('true');
    });

    it('should render href as undefined when disabled', async () => {
      await testContainer.render(<ButtonNext as="a" disabled href="wix" />);

      const htmlTag = testContainer.componentNode.getAttribute('href');
      expect(!!htmlTag).toBe(false);
    });

    describe('disabled attribute', () => {
      it(`should have 'disabled' attribute when disabled`, async () => {
        await testContainer.render(<ButtonNext disabled />);

        const disabledAttribute =
          testContainer.componentNode.getAttribute('disabled');
        expect(disabledAttribute).not.toBeNull();
      });

      it(`should NOT have 'disabled' attribute when disabled and 'href' is provided`, async () => {
        await testContainer.render(<ButtonNext as="a" disabled href="wix" />);

        const disabledAttribute =
          testContainer.componentNode.getAttribute('disabled');
        expect(disabledAttribute).toBeNull();
      });
    });
  });
});
