import * as React from 'react';
import {textDriverFactory} from './Text.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
// import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import Text from './index';
// import {textTestkitFactory} from '../../testkit';
// import {textTestkitFactory as enzymeToggleSwitchTestkitFactory} from '../../testkit/enzyme';

describe('Text', () => {

  const createDriver = createDriverFactory(textDriverFactory);
  // const noop = () => null;

  describe('checked prop', () => {
    it('should render', () => {
      const driver = createDriver(<Text>Hello World</Text>);
      expect(driver.exists()).toBeTruthy();
    });

    it('should have ellipsis', () => {
      const driver = createDriver(<Text ellipsis/>);
      expect(driver.isEllipsis()).toBeTruthy();
    });
  });
  

  describe('onChange prop', () => {
    // it('should be called when the input is clicked', () => {
    //   const onChange = jest.fn();
    //   const driver = createDriver(<ToggleSwitch checked={false} onChange={onChange}/>);

    //   driver.click();
    //   expect(onChange).toBeCalled();
    // });
  });

  describe('disabled prop', () => {
    // it('should not be disabled by default', () => {
    //   const driver = createDriver(<ToggleSwitch onChange={noop}/>);
    //   expect(driver.isDisabled()).toBe(false);
    // });

    // it('should not be clickable when disabled and unchecked', () => {
    //   const onChange = jest.fn();
    //   const driver = createDriver(<ToggleSwitch checked={false} onChange={onChange} disabled/>);
    //   driver.click();
    //   expect(onChange).toHaveBeenCalledTimes(0);
    //   expect(driver.isChecked()).toBe(false);
    // });

    // it('should not be clickable when disabled and checked', () => {
    //   const onChange = jest.fn();
    //   const driver = createDriver(<ToggleSwitch checked onChange={onChange} disabled/>);
    //   driver.click();
    //   expect(onChange).toHaveBeenCalledTimes(0);
    //   expect(driver.isChecked()).toBe(true);
    // });
  });

  describe('testkit', () => {
    // it('should exist', () => {
    //   expect(isTestkitExists(<ToggleSwitch onChange={noop}/>, toggleSwitchTestkitFactory)).toBe(true);
    // });
  });

  describe('enzyme testkit', () => {
    // it('should exist', () => {
    //   expect(isEnzymeTestkitExists(<ToggleSwitch onChange={noop}/>, enzymeToggleSwitchTestkitFactory)).toBe(true);
    // });
  });
});
