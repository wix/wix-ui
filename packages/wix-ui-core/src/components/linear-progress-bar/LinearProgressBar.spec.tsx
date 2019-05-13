import * as React from 'react';
import {linearProgressBarDriverFactory} from './LinearProgressBar.driver';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {LinearProgressBar} from './';
import {LinearProgressBarProps} from './LinearProgressBar';
import {runTestkitExistsSuite} from '../../common/testkitTests';
import {linearProgressBarTestkitFactory} from '../../testkit';
import {linearProgressBarTestkitFactory as enzymeLinearProgressBarTestkitFactory} from '../../testkit/enzyme';
import {linearProgressBarPrivateUniDriverFactory} from './LinearProgressBar.private.uni.driver';

describe('ProgressBar', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  const defaultProps = {
    value: 40,
  };

  const createAsyncDriver = testContainer.createUniRenderer(
    linearProgressBarPrivateUniDriverFactory
  );

  describe('[sync]', () => {
    runTests(
      testContainer.createLegacyRenderer(linearProgressBarDriverFactory)
    );
  });

  describe('[async]', () => {
    runTests(createAsyncDriver);
  });

  describe('accessibility', () => {
    it('should have `progress` role', async () => {
      const driver = createAsyncDriver(<LinearProgressBar {...defaultProps} />);
      expect(await driver.getRoleAttribute()).toBe('progress');
    });

    it('should have aria-valuenow attribute', async () => {
      const driver = createAsyncDriver(<LinearProgressBar {...defaultProps} />);
      expect(await driver.getAriaAttr('valuenow')).toBe('40');
    });

    it('should have aria-valuemin attribute', async () => {
      // TODO - if we implement min/max attributes - should be link to them
      const driver = createAsyncDriver(<LinearProgressBar {...defaultProps} />);
      expect(await driver.getAriaAttr('valuemin')).toBe('0');
    });

    it('should have aria-valuemax attribute', async () => {
      // TODO - if we implement min/max attributes - should be link to them
      const driver = createAsyncDriver(<LinearProgressBar {...defaultProps} />);
      expect(await driver.getAriaAttr('valuemax')).toBe('100');
    });

    it('should allow passing aria-valuetext attribute', async () => {
      const textualValue = 'Forty percent';
      const driver = createAsyncDriver(
        <LinearProgressBar aria-valuetext={textualValue} {...defaultProps} />
      );
      expect(await driver.getAriaAttr('valuetext')).toBe(textualValue);
    });
  });

  function runTests(createDriver) {
    it('should exist', async () => {
      const driver = createDriver(<LinearProgressBar {...defaultProps} />);
      expect(await driver.exists()).toBe(true);
    });

    it(`should set the foreground progress bar layer to ${
      defaultProps.value
    }%`, async () => {
      const driver = createDriver(<LinearProgressBar {...defaultProps} />);
      expect(await driver.getWidth()).toBe(`${defaultProps.value}%`);
    });

    it('should not show success icon when reaching 100%', async () => {
      const driver = createDriver(
        <LinearProgressBar {...{...defaultProps, value: 100}} />
      );
      expect(await driver.isSuccessIconDisplayed()).toBe(false);
    });

    it('should not show percentages value while in progress', async () => {
      const driver = createDriver(
        <LinearProgressBar {...{...defaultProps, value: 50}} />
      );
      expect(await driver.isPercentagesProgressDisplayed()).toBe(false);
    });

    it('should not show error icon while in progress', async () => {
      const driver = createDriver(
        <LinearProgressBar {...{...defaultProps, error: true}} />
      );
      expect(await driver.isErrorIconDisplayed()).toBe(false);
    });

    describe('testkit methods', () => {
      it('should allow getting numeric value from component', async () => {
        const value = 50;
        const driver = createDriver(
          <LinearProgressBar {...{...defaultProps, value}} />
        );
        expect(await driver.getNumericValue()).toBe(value);
      });
    });

    describe('when with progress indication', () => {
      let driver;
      let props: LinearProgressBarProps = defaultProps;

      beforeEach(() => {
        props = {...defaultProps, showProgressIndication: true};
      });

      it('should show success icon when reaching 100%', async () => {
        driver = createDriver(
          <LinearProgressBar
            {...{...props, value: 100, successIcon: <div />}}
          />
        );
        expect(await driver.isSuccessIconDisplayed()).toBe(true);
      });

      it('should show success icon when reaching 100% and value passed as string', async () => {
        driver = createDriver(
          <LinearProgressBar
            {...{...props, value: '100' as any, successIcon: <div />}}
          />
        );
        expect(await driver.isSuccessIconDisplayed()).toBe(true);
      });

      it('should show percentages value when reaching 100% and success icon not provided', async () => {
        driver = createDriver(
          <LinearProgressBar {...{...props, value: 100}} />
        );
        expect(await driver.getValue()).toBe('100%');
      });

      it('should show error icon on failure', async () => {
        driver = createDriver(
          <LinearProgressBar {...{...props, error: true, errorIcon: <div />}} />
        );
        expect(await driver.isErrorIconDisplayed()).toBe(true);
      });

      it('should show percentages value when error icon not provided', async () => {
        driver = createDriver(
          <LinearProgressBar
            {...{...props, value: 33, error: true, errorIcon: null}}
          />
        );
        expect(await driver.isErrorIconDisplayed()).toBe(false);
        expect(await driver.getValue()).toBe('33%');
      });

      it('should show percentages value while in progress', async () => {
        driver = createDriver(<LinearProgressBar {...{...props, value: 50}} />);
        expect(await driver.getValue()).toBe('50%');
      });

      it('should show percentages value of 0 when passing value lesser than 0', async () => {
        driver = createDriver(<LinearProgressBar {...{...props, value: -1}} />);
        expect(await driver.getValue()).toBe('0%');
      });

      it('should show percentages value of 0 when not passing a value', async () => {
        driver = createDriver(
          <LinearProgressBar {...{showProgressIndication: true}} />
        );
        expect(await driver.getValue()).toBe('0%');
      });

      it('should show value in percentages rounded down', async () => {
        const floatValue = 3.9;
        const floatValueRoundDown = Math.floor(floatValue);

        driver = createDriver(
          <LinearProgressBar {...{...props, value: floatValue}} />
        );
        expect(await driver.getValue()).toBe(`${floatValueRoundDown}%`);
      });
    });
  }

  runTestkitExistsSuite({
    Element: <LinearProgressBar value={0} />,
    testkitFactory: linearProgressBarTestkitFactory,
    enzymeTestkitFactory: enzymeLinearProgressBarTestkitFactory,
  });
});
