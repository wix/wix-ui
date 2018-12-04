import * as React from 'react';
import * as eventually from 'wix-eventually';
import {tooltipDriverFactory} from './Tooltip.driver';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {Tooltip} from './';
import {tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Tooltip', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(tooltipDriverFactory);

  const createTooltip = (props = {}) => (
    <Tooltip placement="top" {...props} content={<span>Hovered Content</span>}>
      <div>
        Element
      </div>
    </Tooltip>
  );

  it('should not display content by default', () => {
    const driver = createDriver(createTooltip());
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  it('should display content on hover and hide it on leave', async () => {
    const driver = createDriver(createTooltip());
    driver.mouseEnter();
    expect(driver.isContentElementExists()).toBeTruthy();
    driver.mouseLeave();
    await eventually(() => expect(driver.isContentElementExists()).toBeFalsy());
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(createTooltip(), tooltipTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(createTooltip(), enzymeTooltipTestkitFactory, mount)).toBe(true);
    });
  });
});
