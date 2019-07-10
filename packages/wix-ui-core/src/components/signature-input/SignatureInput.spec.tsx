import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {signatureInputUniDriverFactory} from './SignatureInput.uni.driver';
import {SignatureInputProps, SignatureInput} from './SignatureInput';

import 'jest-canvas-mock';

describe('SignatureInput', () => {
  const defaultProps: SignatureInputProps = {};
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();
  const createDriver = testContainer.createUniRenderer(
    signatureInputUniDriverFactory
  );
  it('Should exist', async () => {
    const driver = createDriver(<SignatureInput {...defaultProps} />);
    expect(await driver.exists()).toBe(true);
  });

  describe('Data-hook', () => {
    it('Should allow setting data-hook prop', async () => {
      const dataHook = 'my-signature-field';
      const driver = createDriver(
        <SignatureInput data-hook={dataHook} {...defaultProps} />
      );
      expect(await driver.getDataHook()).toEqual(dataHook);
    });
    it('Should not have data-hook by default', async () => {
      const driver = createDriver(<SignatureInput {...defaultProps} />);
      expect(await driver.getDataHook()).toEqual(null);
    });
  });

  describe('Label', () => {
    it('Should allow passing a label', async () => {
      const label = 'Please sign here';
      const driver = createDriver(
        <SignatureInput label={label} {...defaultProps} />
      );
      expect(await driver.hasLabel()).toBe(true);
      expect(await driver.getLabel()).toEqual(label);
    });
    it('Should not render label by default', async () => {
      const driver = createDriver(<SignatureInput {...defaultProps} />);
      expect(await driver.hasLabel()).toBe(false);
    });
  });

  describe('Canvas', () => {
    it('Should render canvas element by default', async () => {
      const driver = createDriver(<SignatureInput {...defaultProps} />);
      expect(await driver.isCanvasRendered()).toBe(true);
    });
    it('Should render with empty signature field by default', async () => {
      const driver = createDriver(<SignatureInput {...defaultProps} />);
      expect(await driver.isSignatureEmpty()).toBe(true);
    });
    it('Should allow drawing on canvas', async () => {
      const driver = createDriver(<SignatureInput {...defaultProps} />);
      await driver.clickOnCanvas();
      expect(await driver.isSignatureEmpty()).toBe(false);
    });
  });

  describe('Clear button', () => {
    it('Should allow clearing canvas', () => {});
  });
});
