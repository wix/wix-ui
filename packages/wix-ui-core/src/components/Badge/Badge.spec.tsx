import * as React from 'react';
import {mount} from 'enzyme';

import {badgeDriverFactory} from './Badge.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import {core, BadgeTheme} from './theme';

import {badgeTestkitFactory} from '../../testkit';
import {badgeTestkitFactory as enzymeBadgeTestkitFactory} from '../../testkit/enzyme';

import Badge from './index';

describe('Badge', () => {

  const createDriver = createDriverFactory(badgeDriverFactory);

  describe('children', () => {
    it('should be rendered', () => {
      const content = (
        <div>
          <span>Delete</span>
          <i>?</i>
        </div>
      );
      const driver = createDriver(<Badge>{content}</Badge>);
      expect(driver.getContent()).toContain(mount(content).html());
    });
  });

  describe('style', () => {
    it('should have default height', () => {
      const driver = createDriver(<Badge/>);
      expect(driver.getHeight()).toBe(core.height);
    });

    it('should override default theme', () => {
      const theme: BadgeTheme = {
          height: '36px',
          padding: '10px',
          color: '#fdb10c',
          opacity: '0.5',
          borderRadius: '5px',
          fontSize: '16px',
          lineHeight: '16px',
          textDecoration: 'underline',
          cursor: 'none'
        };
      const driver = createDriver(<Badge theme={theme}/>);
      expect(driver.getHeight()).toBe(theme.height);
      expect(driver.getPadding()).toBe(theme.padding);
      expect(driver.getColor()).toBe(theme.color);
      expect(driver.getOpacity()).toBe(theme.opacity);
      expect(driver.getBorderRadius()).toBe(theme.borderRadius);
      expect(driver.getFontSize()).toBe(theme.fontSize);
      expect(driver.getLineHeight()).toBe(theme.lineHeight);
      expect(driver.getTextDecoration()).toBe(theme.textDecoration);
      expect(driver.getCursor()).toBe(theme.cursor);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Badge/>, badgeTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Badge/>, enzymeBadgeTestkitFactory)).toBe(true);
    });
  });
});
