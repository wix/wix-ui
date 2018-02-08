import * as React from 'react';
import {textDriverFactory} from './Text.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {Text} from './';
import {stylableTextTestkitFactory as textTestkitFactory} from '../../testkit';
import {stylableTextTestkitFactory as enzymeTextTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Text', () => {

  const createDriver = createDriverFactory(textDriverFactory);

  describe('checked prop', () => {

    it('should exist', () => {
      const driver = createDriver(<Text>Hello World</Text>);
      expect(driver.exists()).toBeTruthy();
    });

    it('should not have title attribute by default', () => {
      const driver = createDriver(<Text>Hello World</Text>);
      expect(driver.hasTitleAttribute()).toBeFalsy();
    });

    it('should not have ellipsis by default', () => {
      const driver = createDriver(<Text>Hello World</Text>);
      expect(driver.isEllipsis()).toBeFalsy();
    });

    it('should have ellipsis', () => {
      const driver = createDriver(<Text ellipsis>Hello World</Text>);
      expect(driver.isEllipsis()).toBeTruthy();
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
