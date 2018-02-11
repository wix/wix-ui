import * as React from 'react';
import {buttonDriverFactory} from './Button.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {core, ButtonTheme} from './theme';
import {mount} from 'enzyme';
import {buttonTestkitFactory} from '../../testkit';
import {buttonTestkitFactory as enzymeButtonTestkitFactory} from '../../testkit/enzyme';
import {Button} from './';

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
    it('should have default styles', () => {
      const driver = createDriver(<Button/>);
      expect(driver.styles.getHeight()).toBe(core.height);
      expect(driver.styles.getPadding()).toBe(core.padding);
      expect(driver.styles.getBorderRadius()).toBe(core.borderRadius);
    });

    it('should override default height', () => {
      const theme: ButtonTheme = {
        minWidth: '15px',
        width: '15px',
        height: '78px',
        padding: '15px',
        contentPadding: '16px',
        borderRadius: '3px'
      };
      const driver = createDriver(<Button theme={theme}></Button>);
      expect(driver.styles.getMinWidth()).toBe(theme.minWidth);
      expect(driver.styles.getWidth()).toBe(theme.width);
      expect(driver.styles.getHeight()).toBe(theme.height);
      expect(driver.styles.getPadding()).toBe(theme.padding);
      expect(driver.styles.getBorderRadius()).toBe(theme.borderRadius);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Button/>, buttonTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Button/>, enzymeButtonTestkitFactory, mount)).toBe(true);
    });
  });
});
