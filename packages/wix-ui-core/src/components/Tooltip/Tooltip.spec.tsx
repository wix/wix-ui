import * as React from 'react';
import {tooltipDriverFactory} from './Tooltip.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import {Tooltip} from './';
import {tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Tooltip', () => {
  const createDriver = createDriverFactory(tooltipDriverFactory);
  const createTooltip = (props = {}) =>
  <Tooltip placement="top" {...props}>
    <Tooltip.Element>
      <div>
        Element
      </div>
    </Tooltip.Element>
    <Tooltip.Content>
      <div>
        Content
      </div>
    </Tooltip.Content>
  </Tooltip>;

  it('should not display content by default', () => {
    const driver = createDriver(createTooltip());
    expect(driver.isContentExists()).toBeFalsy();
  });

  it('should display content on hover and hide it on leave', () => {
    const driver = createDriver(createTooltip());
    driver.mouseEnter();
    expect(driver.isContentExists()).toBeTruthy();
    driver.mouseLeave();
    expect(driver.isContentExists()).toBeFalsy();
  });

  describe('style', () => {
    it('should have default styles', () => {
      const driver = createDriver(createTooltip());
      driver.mouseEnter();

      expect(driver.styles.getBackgroundColor()).toBe('white');
      expect(driver.styles.getBorderColor()).toBe('black');
      expect(driver.styles.getBorderRadius()).toBe('10px');
      expect(driver.styles.getBorderWidth()).toBe('1px');
      expect(driver.styles.getBorderStyle()).toBe('solid');
      expect(driver.styles.getContentPadding()).toBe('5px');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Tooltip/>, tooltipTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Tooltip/>, enzymeTooltipTestkitFactory, mount)).toBe(true);
    });
  });
});
