import * as React from 'react';
import {buttonLayoutDriverFactory} from './ButtonLayout.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import {core, ButtonLayoutTheme} from './theme';
import {mount} from 'enzyme';

import {buttonLayoutTestkitFactory} from '../../testkit';
import {buttonLayoutTestkitFactory as enzymeButtonLayoutTestkitFactory} from '../../testkit/enzyme';

import ButtonLayout from './index';

describe('ButtonLayout', () => {

  const createDriver = createDriverFactory(buttonLayoutDriverFactory);

  describe('onClick prop', () => {
    it('should be called on click', () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonLayout onClick={onClick}/>);
      driver.click();
      expect(onClick).toBeCalled();
    });
  });

  describe('onMouseEnter prop', () => {
    it('should be called on mouse enter', () => {
      const onMouseEnter = jest.fn();
      const driver = createDriver(<ButtonLayout onMouseEnter={onMouseEnter}/>);
      driver.mouseEnter();
      expect(onMouseEnter).toBeCalled();
    });
  });

  describe('onMouseLeave prop', () => {
    it('should be called on mouse leave', () => {
      const onMouseLeave = jest.fn();
      const driver = createDriver(<ButtonLayout onMouseLeave={onMouseLeave}/>);
      driver.mouseLeave();
      expect(onMouseLeave).toBeCalled();
    });
  });

  describe('disabled prop', () => {
    it('should be falsy by default', () => {
      const driver = createDriver(<ButtonLayout/>);
      expect(driver.isDisabled()).toBe(false);
    });

    it('should not call onClick when truthy', () => {
      const onClick = jest.fn();
      const driver = createDriver(<ButtonLayout onClick={onClick} disabled/>);
      driver.click();
      expect(driver.isDisabled()).toBe(true);
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('children', () => {
    it('should be rendered', () => {
      const content = <a>link</a>;
      const driver = createDriver(<ButtonLayout>{content}</ButtonLayout>);
      expect(driver.getHtmlContent()).toEqual(mount(content).html());
    });
  });

  describe('style', () => {
    it('should have default styles', () => {
      const driver = createDriver(<ButtonLayout/>);
      expect(driver.styles.getHeight()).toBe(core.height);
      expect(driver.styles.getPadding()).toBe(core.padding);
      expect(driver.styles.getBorderRadius()).toBe(core.borderRadius);
    });

    it('should override default styles', () => {
      const theme: ButtonLayoutTheme = {height: '78px'};
      const driver = createDriver(<ButtonLayout theme={theme}/>);
      expect(driver.styles.getHeight()).toBe(theme.height);
      expect(driver.styles.getPadding()).toBe(theme.padding);
      expect(driver.styles.getBorderRadius()).toBe(theme.borderRadius);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<ButtonLayout/>, buttonLayoutTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<ButtonLayout/>, enzymeButtonLayoutTestkitFactory)).toBe(true);
    });
  });
});
