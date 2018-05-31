import * as React from 'react';
import {badgeDriverFactory} from './Badge.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {badgeTestkitFactory} from '../../testkit';
import {badgeTestkitFactory as enzymeBadgeTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {Badge} from './';

describe('Badge', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(badgeDriverFactory);

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

    it('should get the content text', () => {
      const content = (
        <div>
          <span>Delete</span>
          <i>?</i>
        </div>
      );
      const driver = createDriver(<Badge>{content}</Badge>);

      expect(driver.getContentText()).toMatch('Delete?');
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
