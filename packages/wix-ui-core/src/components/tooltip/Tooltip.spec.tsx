import * as React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';

import { tooltipPrivateDriverFactory } from './Tooltip.private.uni.driver';

import { ButtonNext } from '../button-next';
import { Tooltip } from './';

describe('Tooltip', () => {
  const render = createRendererWithUniDriver(tooltipPrivateDriverFactory);

  const tooltip = (props = {}) => (
    <Tooltip
      placement="top"
      timeout={0}
      content="Hovered Content"
      children={<div>Element</div>}
      {...props}
    />
  );
  afterEach(() => cleanup());

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
      const { driver } = render(
        tooltip({ children: <ButtonNext>Button</ButtonNext> }),
      );
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

  describe('`onShow` & `onHide` props', () => {
    it('should call onShow on mouse enter', async () => {
      const onShow = jest.fn();
      const { driver } = render(tooltip({ onShow }));
      await driver.mouseEnter();
      expect(onShow).toHaveBeenCalled();
    });

    it('should call onHide on mouse leave', async () => {
      const onHide = jest.fn();
      const { driver } = render(tooltip({ onHide }));
      await driver.mouseEnter();
      await driver.mouseLeave();
      expect(onHide).toHaveBeenCalled();
    });
  });

  describe('`content` prop', () => {
    it('should render when given string', async () => {
      const content = 'string';
      const { driver } = render(tooltip({ content }));
      await driver.mouseEnter();
      expect(await driver.getTooltipText()).toBe(content);
    });
    it('should render when given react element', async () => {
      const content = <div>kido</div>;
      const { driver } = render(tooltip({ content }));
      await driver.mouseEnter();
      expect(await driver.getTooltipText()).toBe('kido');
    });
  });

  describe('`children` prop', () => {
    it('should render when given string', async () => {
      const children = 'kido';
      const { driver } = render(tooltip({ children }));
      expect(await driver.getTargetText()).toBe(children);
    });
    it('should render when given react element', async () => {
      const children = <div>kido</div>;
      const { driver } = render(tooltip({ children }));
      expect(await driver.getTargetText()).toBe('kido');
    });
  });

  describe('`onClickOutside` & `shouldCloseOnClickOutside` props', () => {
    it('should call onClickOutside when clicked outside', async () => {
      const onClickOutside = jest.fn();
      const { driver } = render(tooltip({ onClickOutside }));
      await driver.clickOutside();
      expect(onClickOutside).toHaveBeenCalled();
    });

    it('should close tooltip when given shouldCloseOnClickOutside', async () => {
      const onClickOutside = jest.fn();
      const { driver } = render(
        tooltip({ onClickOutside, shouldCloseOnClickOutside: true }),
      );
      await driver.mouseEnter();
      await driver.clickOutside();
      expect(await driver.tooltipExists()).toBe(false);
    });

    it('should not close tooltip on mouse out when given shouldCloseOnClickOutside', async () => {
      const onClickOutside = jest.fn();
      const { driver } = render(
        tooltip({ onClickOutside, shouldCloseOnClickOutside: true }),
      );
      expect(await driver.tooltipExists()).toBe(false);
      await driver.mouseEnter();
      await driver.mouseLeave();
      expect(await driver.tooltipExists()).toBe(true);
    });
  });
});
