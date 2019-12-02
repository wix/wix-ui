import * as React from 'react';
import { isEnzymeTestkitExists } from 'wix-ui-test-utils/enzyme';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { isTestkitExists } from 'wix-ui-test-utils/vanilla';
import { ToggleSwitch } from './';
import { toggleSwitchTestkitFactory } from '../../testkit';
import { toggleSwitchTestkitFactory as enzymeToggleSwitchTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';
import { toggleSwitchDriverFactory } from './ToggleSwitch.driver';
import { toggleSwitchUniDriverFactory } from "./ToggleSwitch.uni.driver";

describe('ToggleSwitch', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  describe('[sync]', () => {
      runTests(
          testContainer.createLegacyRenderer(toggleSwitchDriverFactory)
      );
  });

  function runTests(createDriver){
      describe('checked prop', () => {
          it('should be controlled', async () => {
              const driver = await createDriver(<ToggleSwitch />);
              expect(await driver.isChecked()).toBe(false);
              await driver.click();
              expect(await driver.isChecked()).toBe(false);
          });

          it('should pass down to input when checked', async () => {
              const driver = await createDriver(<ToggleSwitch checked />);
              expect(await driver.isChecked()).toBe(true);
          });

          it('should pass down to input when not checked', async () => {
              const driver = await createDriver(<ToggleSwitch checked={false} />);
              expect(await driver.isChecked()).toBe(false);
          });
      });

      describe('onChange prop', () => {
          it('should be called when the input is clicked', async () => {
              const onChange = jest.fn();
              const driver = await createDriver(
                  <ToggleSwitch checked={false} onChange={onChange} />,
              );

              await driver.click();
              expect(onChange).toBeCalled();
          });
      });

      describe('disabled prop', () => {
          it('should not be disabled by default', async () => {
              const driver = createDriver(<ToggleSwitch />);
              expect(driver.isDisabled()).toBe(false);
          });

          it('should not be clickable when disabled and unchecked', async () => {
              const onChange = jest.fn();
              const driver = await createDriver(
                  <ToggleSwitch checked={false} onChange={onChange} disabled />,
              );
              await driver.click();
              expect(onChange).toHaveBeenCalledTimes(0);
              expect(await driver.isChecked()).toBe(false);
          });

          it('should not be clickable when disabled and checked', async () => {
              const onChange = jest.fn();
              const driver = await createDriver(
                  <ToggleSwitch checked onChange={onChange} disabled />,
              );
              await driver.click();
              expect(onChange).toHaveBeenCalledTimes(0);
              expect(await driver.isChecked()).toBe(true);
          });
      });

      describe('attributes', () => {
          it('should apply user specified id', async () => {
              const testId = 'testId';
              const driver = await createDriver(<ToggleSwitch id={testId} />);
              expect(await driver.getId()).toBe(testId);
          });

          it('should have tabIndex=0 by default', async () => {
              const driver = await createDriver(<ToggleSwitch />);
              expect(await driver.getTabIndex()).toBe(0);
          });

          it('should apply user specified tabIndex', async () => {
              const driver = await createDriver(<ToggleSwitch tabIndex={7} />);
              expect(await driver.getTabIndex()).toBe(7);
          });
      });

      describe('icons', () => {
          it('should not have unchecked icon by default', async () => {
              const driver = await createDriver(<ToggleSwitch />);
              expect(await driver.getKnobIcon().innerHTML).toBe('');
          });

          it('should not have checked icon by default', async () => {
              const driver = await createDriver(<ToggleSwitch checked />);
              expect(await driver.getKnobIcon().innerHTML).toBe('');
          });

          it('should show uncheckedIcon when unchecked', async () => {
              const driver = await createDriver(
                  <ToggleSwitch checkedIcon="✅" uncheckedIcon="❎" />,
              );
              expect(await driver.getKnobIcon().innerHTML).toBe('❎');
          });

          it('should show checkedIcon when checked', async () => {
              const driver = await createDriver(
                  <ToggleSwitch checked checkedIcon="✅" uncheckedIcon="❎" />,
              );
              expect(await driver.getKnobIcon().innerHTML).toBe('✅');
          });
      });

      // describe('testkit', () => {
      //     it('should exist', async () => {
      //         expect(
      //             isTestkitExists(<ToggleSwitch />, toggleSwitchTestkitFactory),
      //         ).toBe(true);
      //     });
      // });
      //
      // describe('enzyme testkit', () => {
      //     it('should exist', async () => {
      //         expect(
      //             isEnzymeTestkitExists(
      //                 <ToggleSwitch />,
      //                 enzymeToggleSwitchTestkitFactory,
      //                 mount,
      //             ),
      //         ).toBe(true);
      //     });
      // });
  }
});


