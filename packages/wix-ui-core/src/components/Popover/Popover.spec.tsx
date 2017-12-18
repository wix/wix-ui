import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import Popover from './index';
import {popoverTestkitFactory} from '../../testkit';
import {popoverTestkitFactory as enzymePopoverTestkitFactory} from '../../testkit/enzyme';

describe ('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);
  const createPopover = (props = {}) =>
  <Popover placement="top" {...props}>
    <Popover.Element>
      <div className="element">
        Element
      </div>
    </Popover.Element>
    <Popover.Content>
      <div className="content">
        Content
      </div>
    </Popover.Content>
  </Popover>;

  it('should not display content by default', () => {
    const driver = createDriver(createPopover());
    expect(driver.contentExists()).toBeFalsy();
  });

  it('should display content after click', () => {
    const driver = createDriver(createPopover());
    driver.clickElement();
    expect(driver.contentExists()).toBeTruthy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(createPopover(), popoverTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(createPopover(), enzymePopoverTestkitFactory)).toBe(true);
    });
  });
});
