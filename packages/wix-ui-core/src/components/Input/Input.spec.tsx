import * as React from 'react';
import {inputDriverFactory} from './Input.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {Input} from './';
import {inputTestkitFactory} from '../../testkit';
import {inputTestkitFactory as enzymeInputTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

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
    it('should get the new value when changed', () => {
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

  describe('autoFocus prop', () => {
    it('should not be focused by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isFocus()).toBeFalsy();
    });

    it('should be focused when autoFoucs is true', () => {
      const driver = createDriver(<Input autoFocus/>);
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('autoComplete prop', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input autoComplete="on"/>);
      expect(driver.getAutocomplete()).toBe('on');
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input is blurred', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<Input onBlur={onBlur}/>);

      driver.blur();
      expect(onBlur).toBeCalled();
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<Input onFocus={onFocus}/>);

      driver.focus();
      expect(onFocus).toBeCalled();
    });
  });

  describe('onClick attribute', () => {
    it('should be called when the input is clicked', () => {
      const onClick = jest.fn();
      const driver = createDriver(<Input onClick={onClick}/>);

      driver.click();
      expect(onClick).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when the input is pressed', () => {
      const onKeyDown = jest.fn();
      const driver = createDriver(<Input onKeyDown={onKeyDown}/>);

      driver.keyDown('a');
      expect(onKeyDown).toBeCalledWith(expect.objectContaining({key: 'a'}));
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called when the input press is released', () => {
      const onKeyUp = jest.fn();
      const driver = createDriver(<Input onKeyUp={onKeyUp}/>);

      driver.keyUp();
      expect(onKeyUp).toBeCalled();
    });
  });

  describe('onDoubleClick attribute', () => {
    it('should be called when the input double clicked', () => {
      const onDoubleClick = jest.fn();
      const driver = createDriver(<Input onDoubleClick={onDoubleClick}/>);

      driver.doubleClick();
      expect(onDoubleClick).toBeCalled();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Input/>, inputTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Input/>, enzymeInputTestkitFactory, mount)).toBe(true);
    });
  });
});
