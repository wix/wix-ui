import * as React from 'react';
import * as eventually from 'wix-eventually';
import {tooltipDriverFactory} from './Tooltip.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {Tooltip} from './';
import {tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Tooltip', () => {
  const createDriver = createDriverFactory(tooltipDriverFactory);
  const createTooltip = (props = {}) =>
  <Tooltip placement="bottom" {...props}>
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

  it('should display content on hover and hide it on leave', async () => {
    const driver = createDriver(createTooltip());
    driver.mouseEnter();
    expect(driver.isContentExists()).toBeTruthy();
    driver.mouseLeave();
    await eventually(() => expect(driver.isContentExists()).toBeFalsy());
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
