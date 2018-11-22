import * as React from 'react';
import {toggleSwitchDriverFactory} from './ToggleSwitch.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {ToggleSwitch} from './';
import {toggleSwitchTestkitFactory} from '../../testkit';
import {toggleSwitchTestkitFactory as enzymeToggleSwitchTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('ToggleSwitch', () => {

  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(toggleSwitchDriverFactory);

  describe('checked prop', () => {
    it('should be controlled', () => {
      const driver = createDriver(<ToggleSwitch />);
      expect(driver.isChecked()).toBe(false);
      driver.click();

      expect(driver.isChecked()).toBe(false);
    });

    it('should pass down to input when checked', () => {
      const driver = createDriver(<ToggleSwitch checked />);
      expect(driver.isChecked()).toBe(true);
    });

    it('should pass down to input when not checked', () => {
      const driver = createDriver(<ToggleSwitch checked={false} />);
      expect(driver.isChecked()).toBe(false);
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
      const driver = createDriver(<ToggleSwitch />);
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

  describe('attributes', () => {
    it('should apply user specified id', () => {
      const testId = 'testId';
      const driver = createDriver(<ToggleSwitch id={testId}/>);
      expect(driver.getId()).toBe(testId);
    });

    it('should have tabIndex=0 by default', () => {
      const driver = createDriver(<ToggleSwitch />);
      expect(driver.getTabIndex()).toBe(0);
    });

    it('should apply user specified tabIndex', () => {
      const driver = createDriver(<ToggleSwitch tabIndex={7} />);
      expect(driver.getTabIndex()).toBe(7);
    });
  });

  describe('icons', () => {
    it('should not have unchecked icon by default', () => {
      const driver = createDriver(<ToggleSwitch />);
      expect(driver.getKnobIcon().innerHTML).toBe('');
    });

    it('should not have checked icon by default', () => {
      const driver = createDriver(<ToggleSwitch checked />);
      expect(driver.getKnobIcon().innerHTML).toBe('');
    });

    it('should show uncheckedIcon when unchecked', () => {
      const driver = createDriver(<ToggleSwitch checkedIcon="✅" uncheckedIcon="❎" />);
      expect(driver.getKnobIcon().innerHTML).toBe('❎');
    });

    it('should show checkedIcon when checked', () => {
      const driver = createDriver(<ToggleSwitch checked checkedIcon="✅" uncheckedIcon="❎" />);
      expect(driver.getKnobIcon().innerHTML).toBe('✅');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<ToggleSwitch />, toggleSwitchTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<ToggleSwitch />, enzymeToggleSwitchTestkitFactory, mount)).toBe(true);
    });
  });
});
