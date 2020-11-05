import * as React from 'react';
import { circularProgressBarDriverFactory } from './CircularProgressBar.driver';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { CircularProgressBar } from './';
import { runTestkitExistsSuite } from '../../common/testkitTests';
import { circularProgressBarTestkitFactory } from '../../testkit';
import { circularProgressBarTestkitFactory as enzymeCircularProgressBarTestkitFactory } from '../../testkit/enzyme';
import { circularProgressBarUniDriverFactory } from './CircularProgressBar.private.uni.driver';

const createCircularProgressBar = (props = {}) => {
  return <CircularProgressBar {...props} />;
};

describe('CircularProgressBar', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  const defaultProps = {
    value: 40,
  };

  describe('[sync]', () => {
    runTests(
      testContainer.createLegacyRenderer(circularProgressBarDriverFactory),
    );
  });

  describe('[async]', () => {
    const render = testContainer.createUniRendererAsync(
      circularProgressBarUniDriverFactory,
    );

    runTests(render);

    it('should support data- attributes', async () => {
      const driver = await render(
        createCircularProgressBar({
          'data-hello': 'world',
          'hello-data': 'i should not exist!',
        }),
      );
      expect(await driver.getAttribute('data-hello')).toBe('world');
      expect(await driver.getAttribute('hello-data')).toBe(null);
    });
  });

  function runTests(render) {
    it('should render', async () => {
      const driver = await render(createCircularProgressBar(defaultProps));
      expect(await driver.exists()).toBe(true);
    });

    describe('on completion', () => {
      const successProps = {
        successIcon: <div />,
      };

      it('should display success icon when reaching 100% and value passed as NUMBER', async () => {
        const props = {
          value: 100,
        };

        const driver = await render(
          createCircularProgressBar({ ...props, ...successProps }),
        );
        expect(await driver.isSuccessIconDisplayed()).toBe(true);
      });

      it('should display success icon when reaching 100% and value passed as STRING', async () => {
        const props = {
          value: '100' as any,
          showProgressIndication: true /* was in original test. I think it can be removed */,
        };

        const driver = await render(
          createCircularProgressBar({ ...props, ...successProps }),
        );
        expect(await driver.isSuccessIconDisplayed()).toBe(true);
      });

      it('should display "100%" percentage when reaching 100% and showProgressIndication is true', async () => {
        const props = {
          value: 100,
          showProgressIndication: true,
        };
        const driver = await render(
          createCircularProgressBar({ ...props, ...successProps }),
        );
        expect(await driver.getValue()).toBe('100%');
      });

      it('should display "100%" percentage when passing value above 100 and showProgressIndication is true', async () => {
        const props = {
          value: 140,
          showProgressIndication: true,
        };
        const driver = await render(
          createCircularProgressBar({ ...props, ...successProps }),
        );
        expect(await driver.getValue()).toBe('100%');
      });

      it('should display success icon when passing value above 100', async () => {
        const props = {
          value: 140,
        };
        const driver = await render(
          createCircularProgressBar({ ...props, ...successProps }),
        );
        expect(await driver.isSuccessIconDisplayed()).toBe(true);
      });
    });

    describe('on error', () => {
      const errorProps = {
        error: true,
      };

      it('should display error icon', async () => {
        const props = {
          errorIcon: <div />,
        };

        const driver = await render(
          createCircularProgressBar({
            ...defaultProps,
            ...errorProps,
            ...props,
          }),
        );
        expect(await driver.isErrorIconDisplayed()).toBe(true);
      });

      it('should show percentage when error label and icon are not provided', async () => {
        const props = {
          errorIcon: null,
          showProgressIndication: true,
        };

        const driver = await render(
          createCircularProgressBar({
            ...defaultProps,
            ...errorProps,
            ...props,
          }),
        );
        expect(await driver.isErrorIconDisplayed()).toBe(false);
        expect(await driver.getValue()).toBe('40%');
      });

      it('should show errorLabel when error icon is not provided', async () => {
        const props = {
          errorLabel: 'Failed',
          errorIcon: null,
          showProgressIndication: true,
        };

        const driver = await render(
          createCircularProgressBar({
            ...defaultProps,
            ...errorProps,
            ...props,
          }),
        );
        expect(await driver.isErrorIconDisplayed()).toBe(false);
        expect(await driver.getValue()).toBe('Failed');
      });

      it('should show error icon and percentage when encountering an error without an errorLabel', async () => {
        const props = {
          value: 50,
          errorIcon: <div />,
          showProgressIndication: true,
        };
        const driver = await render(
          createCircularProgressBar({ ...props, ...errorProps }),
        );
        expect(await driver.isErrorIconDisplayed()).toBe(true);
        expect(await driver.getValue()).toBe('50%');
      });

      it('should show error icon and errorLabel when encountering an error', async () => {
        const props = {
          value: 50,
          errorLabel: 'Failed',
          errorIcon: <div />,
          showProgressIndication: true,
        };
        const driver = await render(
          createCircularProgressBar({ ...props, ...errorProps }),
        );
        expect(await driver.isErrorIconDisplayed()).toBe(true);
        expect(await driver.getValue()).toBe('Failed');
      });
    });

    describe('in progress', () => {
      it('should display percentages value', async () => {
        const props = {
          showProgressIndication: true,
        };
        const driver = await render(
          createCircularProgressBar({ ...defaultProps, ...props }),
        );
        expect(await driver.getValue()).toBe('40%');
      });

      it('should display percentages value of 0 when passing value below 0', async () => {
        const props = {
          value: -1,
          showProgressIndication: true,
        };
        const driver = await render(createCircularProgressBar({ ...props }));
        expect(await driver.getValue()).toBe('0%');
      });

      it('should show percentages value of 0 when not passing a value', async () => {
        const props = {
          showProgressIndication: true,
        };
        const driver = await render(createCircularProgressBar({ ...props }));
        expect(await driver.getValue()).toBe('0%');
      });

      it('should show value in percentages rounded down', async () => {
        const floatValue = 3.9;
        const floatValueRoundDown = Math.floor(floatValue);
        const props = {
          value: floatValue,
          showProgressIndication: true,
        };

        const driver = await render(createCircularProgressBar({ ...props }));
        expect(await driver.getValue()).toBe(`${floatValueRoundDown}%`);
      });

      it('should not display percentages value by default', async () => {
        const driver = await render(createCircularProgressBar(defaultProps));
        expect(await driver.isPercentagesProgressDisplayed()).toBe(false);
      });
    });

    describe('label', () => {
      it('should display label when received', async () => {
        const props = {
          label: 'Label',
        }
        const driver = await render(createCircularProgressBar(props));
        expect(await driver.isLabelDisplayed()).toBe(true);
      });

      it('should get the label content', async () => {
        const label = 'custom label';
        const props = {
          label,
        }
        const driver = await render(createCircularProgressBar(props));
        expect(await driver.getTextContent()).toEqual(label);
      });

      it('should not display progress inidicator when received label', async () => {
        const props = {
          showProgressIndication: true,
          value: 40,
          label: 'Label',
        }
        const driver = await render(createCircularProgressBar(props));
        expect(await driver.isPercentagesProgressDisplayed()).toBe(false);
      });
    })
  }

  runTestkitExistsSuite({
    Element: <CircularProgressBar value={0} />,
    testkitFactory: circularProgressBarTestkitFactory,
    enzymeTestkitFactory: enzymeCircularProgressBarTestkitFactory,
  });
});
