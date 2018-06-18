import * as React from 'react'
import { circularProgressBarDriverFactory } from './CircularProgressBar.driver'
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { CircularProgressBar } from './';
import { CircularProgressBarProps } from './CircularProgressBar';
import { runTestkitExistsSuite } from '../../common/testkitTests';
import { circularProgressBarTestkitFactory } from '../../testkit';
import { circularProgressBarTestkitFactory as enzymeCircularProgressBarTestkitFactory } from '../../testkit/enzyme';

describe('CircularProgressBar', () => {

  const createDriver = new ReactDOMTestContainer().unmountAfterEachTest()
    .createLegacyRenderer(circularProgressBarDriverFactory);

  const defaultProps = {
    value: 40
  }

  it('should exist', () => {
    const driver = createDriver(<CircularProgressBar {...defaultProps} />);
    expect(driver.exists()).toBe(true);
  })

  it(`should set the foreground progress bar layer to ${defaultProps.value}%`, () => {
    const driver = createDriver(<CircularProgressBar {...defaultProps} />);
    expect(driver.getWidth()).toBe(`${defaultProps.value}%`);
  })

  it('should not show success icon when reaching 100%', () => {
    const driver = createDriver(<CircularProgressBar {...{ ...defaultProps, value: 100 }} />);
    expect(driver.isSuccessIconDisplayed()).toBe(false);
  })

  it('should not show percentages value while in progress', () => {
    const driver = createDriver(<CircularProgressBar {...{ ...defaultProps, value: 50 }} />);
    expect(driver.isPercentagesProgressDisplayed()).toBe(false);
  })

  it('should not show error icon while in progress', () => {
    const driver = createDriver(<CircularProgressBar {...{ ...defaultProps, error: true }} />);
    expect(driver.isErrorIconDisplayed()).toBe(false);
  })

  describe('when with progress indication', () => {
    let driver;
    let props: CircularProgressBarProps = defaultProps;

    beforeEach(() => {
      props = { ...defaultProps, showProgressIndication: true };
    });

    it('should show success icon when reaching 100%', () => {
      driver = createDriver(<CircularProgressBar {...{ ...props, value: 100, successIcon: <div /> }} />);
      expect(driver.isSuccessIconDisplayed()).toBe(true);
    })

    it('should show success icon when reaching 100% and value passed as string', () => {
      driver = createDriver(<CircularProgressBar {...{ ...props, value: '100' as any, successIcon: <div /> }} />);
      expect(driver.isSuccessIconDisplayed()).toBe(true);
    })

    it('should show percentages value when reaching 100% and success icon not provided', () => {
      driver = createDriver(<CircularProgressBar {...{ ...props, value: 100 }} />);
      expect(driver.getValue()).toBe('100%');
    })

    it('should show error icon on failure', () => {
      driver = createDriver(<CircularProgressBar {...{ ...props, error: true, errorIcon: <div /> }} />);
      expect(driver.isErrorIconDisplayed()).toBe(true);
    })

    it('should show percentages value when error icon not provided', () => {
      driver = createDriver(<CircularProgressBar {...{ ...props, value: 33, error: true, errorIcon: null }} />);
      expect(driver.isErrorIconDisplayed()).toBe(false);
      expect(driver.getValue()).toBe('33%');
    })

    it('should show percentages value while in progress', () => {
      driver = createDriver(<CircularProgressBar {...{ ...props, value: 50 }} />);
      expect(driver.getValue()).toBe('50%');
    })

    it('should show percentages value of 0 when passing value lesser than 0', () => {
      driver = createDriver(<CircularProgressBar {...{ ...props, value: -1 }} />);
      expect(driver.getValue()).toBe('0%');
    })

    it('should show percentages value of 0 when not passing a value', () => {
      driver = createDriver(<CircularProgressBar {...{ showProgressIndication: true}} />);
      expect(driver.getValue()).toBe('0%');
    })

    it('should show value in percentages rounded down', () => {
      const floatValue = 3.9;
      const floatValueRoundDown = Math.floor(floatValue);

      driver = createDriver(<CircularProgressBar {...{ ...props, value: floatValue }} />);
      expect(driver.getValue()).toBe(`${floatValueRoundDown}%`);
    })
  });

  runTestkitExistsSuite({
    Element: <CircularProgressBar value={0} />,
    testkitFactory: circularProgressBarTestkitFactory,
    enzymeTestkitFactory: enzymeCircularProgressBarTestkitFactory
  });
});
