import * as React from 'react';
import {toggleSwitchDriverFactory} from './ToggleSwitch.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import {ToggleSwitch} from './';
import {stylableToggleSwitchTestkitFactory as toggleSwitchTestkitFactory} from '../../testkit';
import {stylableToggleSwitchTestkitFactory as enzymeToggleSwitchTestkitFactory} from '../../testkit/enzyme';
import {activeViewBox, activePathD, inactiveViewBox, inactivePathD} from './utils';
import {mount} from 'enzyme';

describe('ToggleSwitch', () => {

  const createDriver = createDriverFactory(toggleSwitchDriverFactory);
  const noop = () => null;

  describe('checked prop', () => {
    it('should be controlled', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop}/>);
      expect(driver.isChecked()).toBe(false);
      driver.click();

      expect(driver.isChecked()).toBe(false);
    });

    it('should pass down to input when checked', () => {
      const driver = createDriver(<ToggleSwitch checked onChange={noop}/>);
      expect(driver.isChecked()).toBeTruthy();
    });

    it('should pass down to input when not checked', () => {
      const driver = createDriver(<ToggleSwitch checked={false} onChange={noop}/>);
      expect(driver.isChecked()).toBeFalsy();
    });
  });

  describe('onChange prop', () => {
    it('should be called when the input is clicked', () => {
      const onChange = jest.fn();
      const driver = createDriver(<ToggleSwitch checked={false} onChange={onChange}/>);

      driver.click();
      expect(onChange).toBeCalled();
    });
  });

  describe('disabled prop', () => {
    it('should not be disabled by default', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop}/>);
      expect(driver.isDisabled()).toBe(false);
    });

    it('should not be clickable when disabled and unchecked', () => {
      const onChange = jest.fn();
      const driver = createDriver(<ToggleSwitch checked={false} onChange={onChange} disabled/>);
      driver.click();
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(driver.isChecked()).toBe(false);
    });

    it('should not be clickable when disabled and checked', () => {
      const onChange = jest.fn();
      const driver = createDriver(<ToggleSwitch checked onChange={onChange} disabled/>);
      driver.click();
      expect(onChange).toHaveBeenCalledTimes(0);
      expect(driver.isChecked()).toBe(true);
    });
  });

  //TODO: This should be removed/modified when the ToggleSwitch will receive an svg instead of having one within it
  //See issue https://github.com/wix/wix-ui/issues/38
  describe('toggleIcon', () => {
    it('should be the checked icon when the toggleSwitch is checked', () => {
      const driver = createDriver(<ToggleSwitch checked onChange={noop}/>);
      expect(driver.getToggleIcon().getAttribute('viewBox')).toBe(activeViewBox);
      expect(driver.getToggleIcon().querySelector('path').getAttribute('d')).toBe(activePathD);
    });

    it('should be the unchecked icon when the toggleSwitch is unchecked', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop}/>);
      expect(driver.getToggleIcon().getAttribute('viewBox')).toBe(inactiveViewBox);
      expect(driver.getToggleIcon().querySelector('path').getAttribute('d')).toBe(inactivePathD);
    });
  });

  describe('id prop', () => {
    it('should apply arbitrary unique id be default', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop}/>);
      expect(driver.getId()).toBeDefined();
    });

    it('should apply user specified id', () => {
      const testId = 'testId';
      const driver = createDriver(<ToggleSwitch onChange={noop} id={testId}/>);
      expect(driver.getId()).toBe(testId);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<ToggleSwitch onChange={noop}/>, toggleSwitchTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<ToggleSwitch onChange={noop}/>, enzymeToggleSwitchTestkitFactory, mount)).toBe(true);
    });
  });
});
