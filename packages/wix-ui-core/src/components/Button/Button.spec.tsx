import * as React from 'react';
import {buttonDriverFactory} from './Button.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import {core, ButtonTheme} from './theme';

import {buttonTestkitFactory} from '../../testkit';
import {buttonTestkitFactory as enzymeButtonTestkitFactory} from '../../testkit/enzyme';

import Button from './index';

describe('Button', () => {

  const createDriver = createDriverFactory(buttonDriverFactory);

  describe('type prop', () => {
    it('should be passed down', () => {
      const type = 'button';
      const driver = createDriver(<Button type={type}/>);
      expect(driver.getType()).toBe(type);
    });
  });

  describe('onClick prop', () => {
    it('should be called on click', () => {
      const onClick = jest.fn();
      const driver = createDriver(<Button onClick={onClick}/>);
      driver.click();
      expect(onClick).toBeCalled();
    });
  });

  describe('onMouseEnter prop', () => {
    it('should be called on mouse enter', () => {
      const onMouseEnter = jest.fn();
      const driver = createDriver(<Button onMouseEnter={onMouseEnter}/>);
      driver.mouseEnter();
      expect(onMouseEnter).toBeCalled();
    });
  });

  describe('onMouseLeave prop', () => {
    it('should be called on mouse leave', () => {
      const onMouseLeave = jest.fn();
      const driver = createDriver(<Button onMouseLeave={onMouseLeave}/>);
      driver.mouseLeave();
      expect(onMouseLeave).toBeCalled();
    });
  });

  describe('disabled prop', () => {
    it('should be falsy by default', () => {
      const driver = createDriver(<Button/>);
      expect(driver.isDisabled()).toBe(false);
    });

    it('should not call onClick when truthy', () => {
      const onClick = jest.fn();
      const driver = createDriver(<Button onClick={onClick} disabled/>);
      driver.click();
      expect(driver.isDisabled()).toBe(true);
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('children', () => {
    it('should be rendered', () => {
      const content = 'Click me';
      const driver = createDriver(<Button>{content}</Button>);
      expect(driver.getTextContent()).toBe(content);
    });
  });

  describe('style', () => {
    it('should have default height', () => {
      const driver = createDriver(<Button/>);
      expect(driver.getHeight()).toBe(core.height);
    });

    it('should override default height', () => {
      const theme: ButtonTheme = {height: 'height'};
      const driver = createDriver(<Button theme={theme}/>);
      expect(driver.getHeight()).toBe(theme.height);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Button/>, buttonTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Button/>, enzymeButtonTestkitFactory)).toBe(true);
    });
  });
});
