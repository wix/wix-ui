import * as React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';
import { tooltipPrivateDriverFactory } from './Tooltip.private.uni.driver.ts';
import { ButtonNext } from '../button-next/button-next'
import { Tooltip } from './';

describe('Tooltip', () => {
  const render = createRendererWithUniDriver(tooltipPrivateDriverFactory);

  const tooltip = (props = {}) => (
    <Tooltip placement="top" {...props} timeout={0} content="Hovered Content" children={<div>Element</div>}/>)

  it('should be hidden by default', async () => {
    const { driver } = render(tooltip());
    expect(await driver.tooltipExists()).toBe(false);
  });

  describe('Mouse events', () => {
    it('tooltip should be visible on mouse over', async () => {
      const { driver } = render(tooltip());
      await driver.mouseEnter();
      expect(await driver.tooltipExists()).toBe(true);
    });

    it('tooltip should hidden on mouse leave', async () => {
      const { driver } = render(tooltip());
      await driver.mouseEnter();
      expect(await driver.tooltipExists()).toBe(true);
      await driver.mouseLeave();
      expect(await driver.tooltipExists()).toBe(false);
    });
  });

  describe('Keyboard events', () => {
    it('tooltip should be visible on keyboard focus', async () => {
      const { driver } = render((tooltip({children: <ButtonNext>Button</ButtonNext>}));
      await driver.tabIn();
      expect(await driver.tooltipExists()).toBe(true);
    });

    it('tooltip should be hidden on keyboard blur event', async () => {
      const { driver } = render(tooltip());
      expect(await driver.tooltipExists()).toBe(false);
      await driver.tabIn();
      expect(await driver.tooltipExists()).toBe(true);
      await driver.tabOut();
      expect(await driver.tooltipExists()).toBe(false);
    });
  });
});
