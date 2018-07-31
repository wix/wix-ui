import * as React from 'react';
import {badgeDriverFactory} from './Badge.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {stylableBadgeTestkitFactory as badgeTestkitFactory} from '../../testkit';
import {stylableBadgeTestkitFactory as enzymeBadgeTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {Badge} from './';

describe('Stylable Badge', () => {

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

      expect(driver.text()).toMatch('Delete?');
    });

    it('should display full content on hover and hide it on leave in tooltip', async () => {
      const content = (
        <div>
          <span>Delete this super awesome thing</span>
          <i>?</i>
        </div>
      );
      const component = mount(<Badge maxWidth={0}>{content}</Badge>);

      expect(component.find('[data-hook="popover-content"]').length).toBe(0);
      component.setState({isEllipsisActive: true});
      component.simulate('mouseEnter');
      expect(component.find('[data-hook="popover-content"]').at(0).text()).toBe('Delete this super awesome thing?');
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
