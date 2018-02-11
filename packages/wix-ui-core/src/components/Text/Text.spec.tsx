import * as React from 'react';
import {textDriverFactory} from './Text.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {core, TextTheme} from './theme';
import {mount} from 'enzyme';
import {textTestkitFactory} from '../../testkit';
import {textTestkitFactory as enzymeTextTestkitFactory} from '../../testkit/enzyme';
import {Text} from './index';

describe('Text', () => {

  const createDriver = createDriverFactory(textDriverFactory);

  describe('checked prop', () => {
    it('should render', () => {
      const driver = createDriver(<Text>Hello World</Text>);
      expect(driver.exists()).toBeTruthy();
    });

    it('should have ellipsis', () => {
      const driver = createDriver(<Text ellipsis>Hello World</Text>);
      expect(driver.isEllipsis()).toBeTruthy();
    });

    it('should not have title attribute by default', () => {
      const driver = createDriver(<Text ellipsis>Hello World</Text>);
      expect(driver.hasTitleAttribute()).toBeTruthy();
    });

    it('should have title attribute when has ellipsis', () => {
      const driver = createDriver(<Text ellipsis>Hello World</Text>);
      expect(driver.hasTitleAttribute()).toBeTruthy();
    });

    it('should not have title attribute when has ellipsis and children is an element', () => {
      const driver = createDriver(<Text ellipsis><span>Hello World</span></Text>);
      expect(driver.hasTitleAttribute()).toBeFalsy();
    });

    it('should not have title attribute when has ellipsis and forceHideTitle is true', () => {
      const driver = createDriver(<Text ellipsis forceHideTitle>Hello World</Text>);
      expect(driver.hasTitleAttribute()).toBeFalsy();
    });

  });

  describe('style', () => {
    it('should have default font-family', () => {
      const driver = createDriver(<Text>Hello World</Text>);
      expect(driver.getFontFamily()).toBe(core.fontFamily);
    });

    it('should have override default font-family', () => {
      const theme: TextTheme = {fontFamily: 'David'};
      const driver = createDriver(<Text theme={theme}>Hello World</Text>);
      expect(driver.getFontFamily()).toBe('David');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Text>Hello World</Text>, textTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Text>Hello World</Text>, enzymeTextTestkitFactory, mount)).toBe(true);
    });
  });
});
