import * as React from 'react';
import {toggleSwitchDriverFactory} from './ToggleSwitch.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import ToggleSwitch from './index';
import {toggleSwitchTestkitFactory} from '../../testkit';
import {toggleSwitchTestkitFactory as enzymeToggleSwitchTestkitFactory} from '../../testkit/enzyme';

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

  describe('toggleIcon', () => {
    it('should be the checked icon when the toggleSwitch is checked', () => {
      const driver = createDriver(<ToggleSwitch checked onChange={noop}/>);
      expect(driver.getToggleIcon().innerHTML).toBe('<div>✓</div>');
    });

    it('should be the unchecked icon when the toggleSwitch is unchecked', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop}/>);
      expect(driver.getToggleIcon().innerHTML).toBe('<div>-</div>');
    });
  });

  describe('iconOn prop', () => {
    it('should apply when toggleSwitch is checked', () => {
      const component = <ToggleSwitch iconOn={<div>Yes</div>} checked onChange={noop}/>;
      const driver = createDriver(component);
      expect(driver.getToggleIcon().innerHTML).toBe('<div>Yes</div>');
    });
  });

  describe('iconOff prop', () => {
    it('should apply when toggleSwitch is unchecked', () => {
      const component = <ToggleSwitch iconOff={<div>No</div>} onChange={noop}/>;
      const driver = createDriver(component);
      expect(driver.getToggleIcon().innerHTML).toBe('<div>No</div>');
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
      expect(isEnzymeTestkitExists(<ToggleSwitch onChange={noop}/>, enzymeToggleSwitchTestkitFactory)).toBe(true);
    });
  });

  describe('styles', () => {
    it('root should be inline-flex', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop}/>);
      expect(driver.styles.getRootDisplay()).toBe('inline-flex');
    });
    it('root label should have border-radius 50px', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop}/>);
      expect(driver.styles.getBorderRadius()).toBe('50px');
    });
    it('should apply inline styles for root element', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop} styles={{root: {color: 'red'}}}/>);
      expect(driver.getRootStyles().color).toBe('red');
    });
    it('should apply inline styles for outerLabel element', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop} styles={{outerLabel: {color: 'green'}}}/>);
      expect(driver.getOuterLabelStyles().color).toBe('green');
    });
    it('should apply inline styles for innerLabel element', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop} styles={{innerLabel: {color: 'blue'}}}/>);
      expect(driver.getInnerLabelStyles().color).toBe('blue');
    });
    it('should apply inline styles for toggleIcon element', () => {
      const driver = createDriver(<ToggleSwitch onChange={noop} styles={{toggleIcon: {color: 'black'}}}/>);
      expect(driver.getToggleIconStyles().color).toBe('black');
    });
  });
});
