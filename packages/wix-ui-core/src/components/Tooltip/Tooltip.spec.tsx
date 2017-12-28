import * as React from 'react';
import {tooltipDriverFactory} from './Tooltip.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import Tooltip from './index';
import {tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';

describe ('Tooltip', () => {
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

  it('should display content on hover', () => {
    const driver = createDriver(createTooltip());
    driver.mouseEnter();
    expect(driver.isContentExists()).toBeTruthy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Tooltip/>, tooltipTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Tooltip/>, enzymeTooltipTestkitFactory)).toBe(true);
    });
  });
});
