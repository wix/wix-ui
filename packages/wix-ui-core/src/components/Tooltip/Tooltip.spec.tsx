import * as React from 'react';
import {tooltipDriverFactory} from './Tooltip.driver';
import {createDriverFactory, isTestkitExists, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import Tooltip from './index';
import {tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';
import {core, TooltipTheme} from './theme';

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

  describe('style', () => {
    it('should have default styles', () => {
      const driver = createDriver(createTooltip());
      driver.mouseEnter();

      expect(driver.styles.getBackgroundColor()).toBe(core.backgroundColor);
      expect(driver.styles.getBorderColor()).toBe(core.borderColor);
      expect(driver.styles.getBorderRadius()).toBe(core.borderRadius);
      expect(driver.styles.getBorderWidth()).toBe(core.borderWidth);
      expect(driver.styles.getBorderStyle()).toBe(core.borderStyle);
      expect(driver.styles.getContentPadding()).toBe(core.contentPadding);
    });

    it('should override default theme', () => {
      const theme: TooltipTheme = {
        contentPadding: '10px',
        borderStyle: 'dotted',
        borderWidth: '5px',
        borderColor: 'red',
        borderRadius: '50%',
        backgroundColor: 'yellow'
      };

      const driver = createDriver(createTooltip({theme}));
      driver.mouseEnter();

      expect(driver.styles.getBackgroundColor()).toBe(theme.backgroundColor);
      expect(driver.styles.getBorderColor()).toBe(theme.borderColor);
      expect(driver.styles.getBorderRadius()).toBe(theme.borderRadius);
      expect(driver.styles.getBorderWidth()).toBe(theme.borderWidth);
      expect(driver.styles.getBorderStyle()).toBe(theme.borderStyle);
      expect(driver.styles.getContentPadding()).toBe(theme.contentPadding);
    });
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
