import * as React from 'react';
import {inputDriverFactory} from './Input.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import Input from './index';
import {inputTestkitFactory} from '../../testkit';
import {inputTestkitFactory as enzymeInputTestkitFactory} from '../../testkit/enzyme';

describe('Input', () => {

  const createDriver = createDriverFactory(inputDriverFactory);

  describe('disabled prop', () => {
    it('should not be present by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isDisabled()).toBeFalsy();
    });

    it('should be present when true', () => {
      const driver = createDriver(<Input disabled/>);
      expect(driver.isDisabled()).toBeTruthy();
    });
  });

  describe('readOnly prop', () => {
    it('should not be present by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isReadOnly()).toBeFalsy();
    });

    it('should be present when true', () => {
      const driver = createDriver(<Input readOnly/>);
      expect(driver.isReadOnly()).toBeTruthy();
    });
  });

  describe('required prop', () => {
    it('should not be present by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isRequired()).toBeFalsy();
    });

    it('should be present when true', () => {
      const driver = createDriver(<Input required/>);
      expect(driver.isRequired()).toBeTruthy();
    });
  });

  describe('max length prop', () => {
    it('should have default value', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getMaxLength()).toEqual(524288);
    });

    it('should be present when has value', () => {
      const driver = createDriver(<Input maxLength={200}/>);
      expect(driver.getMaxLength()).toEqual(200);
    });
  });

  describe('value prop', () => {
    it('should not have value by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getValue()).toEqual('');
    });

    it('should have value updated', () => {
      const value = 'value';
      const driver = createDriver(<Input/>);
      driver.setValue(value);
      expect(driver.getValue()).toEqual(value);
    });

    it('should have initial value', () => {
      const value = 'value';
      const driver = createDriver(<Input value={value}/>);
      expect(driver.getValue()).toEqual(value);
    });
  });

  describe('tab index prop', () => {
    it('should be 0 by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getTabIndex()).toEqual(0);
    });

    it('should be present when has value', () => {
      const driver = createDriver(<Input tabIndex={5}/>);
      expect(driver.getTabIndex()).toEqual(5);
    });
  });

  describe('placeholder prop', () => {
    it('should not be present by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getPlaceholder()).toEqual('');
    });

    it('should be present when has value', () => {
      const placeholder = 'value';
      const driver = createDriver(<Input placeholder={placeholder}/>);
      expect(driver.getPlaceholder()).toEqual(placeholder);
    });
  });

  describe('type prop', () => {
    it('should be text by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getType()).toEqual('text');
    });

    it('should be present when has value', () => {
      const driver = createDriver(<Input type="number"/>);
      expect(driver.getType()).toEqual('number');
    });
  });

  describe('onChange callback', () => {
    it.skip('should get the new value when changed', () => {
      const value = 'value';
      const onChange = jest.fn();
      const driver = createDriver(<Input onChange={onChange}/>);
      driver.setValue(value);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(driver.getValue()).toBe(value);
    });

    it('should not call onChange callback when input is disabled', () => {
      const value = 'value';
      const onChange = jest.fn();
      const driver = createDriver(<Input disabled onChange={onChange}/>);
      driver.setValue(value);
      expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should not call onChange callback when input is readonly', () => {
      const value = 'value';
      const onChange = jest.fn();
      const driver = createDriver(<Input readOnly onChange={onChange}/>);
      driver.setValue(value);
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Input/>, inputTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Input/>, enzymeInputTestkitFactory)).toBe(true);
    });
  });
});
