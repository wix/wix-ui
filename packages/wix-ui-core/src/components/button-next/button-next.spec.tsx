import * as React from "react";
import { ReactDOMTestContainer } from "../../../test/dom-test-container";
import { buttonNextTestkitFactory } from "../../testkit";
import { buttonNextTestkitFactory as enzymeButtonNextTestkitFactory } from "../../testkit/enzyme";
import { ButtonNext } from "./";
import { isUniTestkitExists } from 'wix-ui-test-utils/vanilla';
import { isUniEnzymeTestkitExists } from 'wix-ui-test-utils/enzyme';
import { mount } from 'enzyme';
import { buttonNextPrivateDriverFactory } from './button-next.driver.private';

describe("ButtonNext", () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createUniRenderer(buttonNextPrivateDriverFactory);

  describe(`'onClick' prop`, () => {
    it("should be called on click", async () => {
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
    it("should render text", async () => {
      const text = "button";
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

  describe('testkits', () => {
    describe('vanilla', () => {
      it('should exist', async () => {
        expect(await isUniTestkitExists(<ButtonNext/>, buttonNextTestkitFactory)).toBe(true);
      });
    });

    describe('enzyme', () => {
      it('should exist', async () => {
        expect(await isUniEnzymeTestkitExists(<ButtonNext/>, enzymeButtonNextTestkitFactory, mount)).toBe(true);
      });
    });
  });
});
