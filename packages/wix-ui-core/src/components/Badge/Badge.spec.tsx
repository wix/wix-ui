import * as React from 'react';
import {badgeDriverFactory} from './Badge.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import {badgeTestkitFactory} from '../../testkit';
import {badgeTestkitFactory as enzymeBadgeTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {Badge} from './';

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

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Badge/>, badgeTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Badge/>, enzymeBadgeTestkitFactory, mount)).toBe(true);
    });
  });
});
