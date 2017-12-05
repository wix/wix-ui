import React from 'react';
import {render} from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import toggleSwitchDriverFactory from './ToggleSwitch.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils/dist/src';
import ToggleSwitch from './index';
import {toggleSwitchTestkitFactory} from '../../testkit';
import {toggleSwitchTestkitFactory as enzymeToggleSwitchTestkitFactory} from '../../testkit/enzyme';

describe('ToggleSwitch', () => {

  const createDriver = createDriverFactory(toggleSwitchDriverFactory);

  describe('checked prop', () => {
    it('should pass down to input when checked', () => {
      const driver = createDriver(<ToggleSwitch checked onChange={() => {}}/>);
      expect(driver.isChecked()).toBeTruthy();
    });

    it('should pass down to input when not checked', () => {
      const driver = createDriver(<ToggleSwitch checked={false} onChange={() => {}}/>);
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
      const driver = createDriver(<ToggleSwitch onChange={() => {}}/>);
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

  describe('onLabelClick prop', () => {
    it('should call onLabelClick event handler upon clicking on label', () => {
      const onLabelClick = jest.fn();
      const div = document.createElement('div');
      const wrapper = render(<ToggleSwitch onChange={() => {}} onLabelClick={onLabelClick}/>, div);
      const labels = div.querySelectorAll('label');
      labels.forEach(label => ReactTestUtils.Simulate.click(label));
      expect(onLabelClick).toHaveBeenCalledTimes(3);
    });
  });

  describe.skip('classes prop', () => {
    //TODO: create testkit for the jss mechanism
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<ToggleSwitch onChange={() => {}}/>, toggleSwitchTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<ToggleSwitch onChange={() => {}}/>, enzymeToggleSwitchTestkitFactory)).toBe(true);
    });
  });
});
