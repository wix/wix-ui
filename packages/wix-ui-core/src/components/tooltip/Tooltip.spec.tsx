import * as React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
} from '../../../test/utils/react';

import { tooltipPrivateDriverFactory } from './Tooltip.private.uni.driver';

import { ButtonNext } from '../button-next';
import { Tooltip } from './';
import * as Tooltipas from '../tooltip-next';
import * as eventually from 'wix-eventually';

const { TooltipNext } = Tooltipas;

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

  runTests(render, tooltip);
});

describe('TooltipNext', () => {
  const render = createRendererWithUniDriver(tooltipPrivateDriverFactory);

  const tooltip = (props = {}) => (
    <TooltipNext
      placement="top"
      timeout={0}
      content="Hovered Content"
      children={<div>Element</div>}
      {...props}
    />
  );

  runTests(render, tooltip);
});

function runTests(render, tooltip) {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(cleanup);

  it('should be hidden by default', async () => {
    const { driver } = render(tooltip());
    expect(await driver.tooltipExists()).toBe(false);
  });

  describe('controlled mode', () => {
    it('tooltip should be visible when shown={true}', async () => {
      const { driver } = render(tooltip({ shown: true }));
      expect(await driver.tooltipExists()).toBe(true);
    });

    it('tooltip should not be visible when shown={false}', async () => {
      const { driver } = render(tooltip({ shown: false }));
      expect(await driver.tooltipExists()).toBe(false);
    });
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
    describe('tooltip should be visible on keyboard focus', () => {
      it('[when] given core component with focusableHOC', async () => {
        const { driver } = render(
          tooltip({ children: <ButtonNext>Button</ButtonNext> }),
        );
        await driver.tabIn();
        expect(await driver.tooltipExists()).toBe(true);
      });
      it('[when] given focusable html element', async () => {
        const { driver } = render(
          tooltip({ children: <button>Button</button> }),
        );
        await driver.tabIn();
        expect(await driver.tooltipExists()).toBe(true);
      });
    });

    describe('tooltip should be hidden on keyboard blur event', () => {
      it('[when] given core component with focusableHOC', async () => {
        const { driver } = render(
          tooltip({ children: <ButtonNext>Button</ButtonNext> }),
        );
        expect(await driver.tooltipExists()).toBe(false);
        await driver.tabIn();
        expect(await driver.tooltipExists()).toBe(true);
        await driver.tabOut();
        expect(await driver.tooltipExists()).toBe(false);
      });
      it('[when] given focusable html element', async () => {
        const { driver } = render(
          tooltip({ children: <button>Button</button> }),
        );
        await driver.tabIn();
        expect(await driver.tooltipExists()).toBe(true);
        await driver.tabOut();
        expect(await driver.tooltipExists()).toBe(false);
      });
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

    it('should not call onShow when tooltip is disabled', async () => {
      const onShow = jest.fn();
      const { driver } = render(tooltip({ onShow, disabled: true }));
      await driver.mouseEnter();
      expect(onShow).not.toHaveBeenCalled();
    });

    it('should not call onHide when tooltip is disabled', async () => {
      const onHide = jest.fn();
      const { driver } = render(tooltip({ onHide, disabled: true }));
      await driver.mouseEnter();
      await driver.mouseLeave();
      expect(onHide).not.toHaveBeenCalled();
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

  describe('`disabled` prop', () => {
    it('[when] given false should not show tooltip on mouse enter', async () => {
      const children = <div>kido</div>;
      const { driver } = render(tooltip({ children, disabled: true }));
      expect(await driver.tooltipExists()).toBe(false);
      await driver.mouseEnter();
      expect(await driver.tooltipExists()).toBe(false);
    });
    it('[when] given true should not show tooltip on focus', async () => {
      const children = <div>kido</div>;
      const { driver } = render(tooltip({ children, disabled: true }));
      expect(await driver.tooltipExists()).toBe(false);
      await driver.tabIn();
      expect(await driver.tooltipExists()).toBe(false);
    });
    it('[when] given true should not call onShow() prop on focus', async () => {
      const children = <div>kido</div>;
      const onShow = jest.fn();
      const { driver } = render(tooltip({ children, onShow, disabled: true }));
      expect(await driver.tooltipExists()).toBe(false);
      await driver.tabIn();
      expect(onShow).not.toHaveBeenCalled();
    });
  });

  describe('`aria-describedby` prop', () => {
    it('[when] given should apply on target element', async () => {
      const children = <button>button</button>;
      const ariaDescribedBy = 'tooltip1';
      const { driver } = render(
        tooltip({ children, 'aria-describedby': ariaDescribedBy }),
      );
      await driver.mouseEnter();
      const value = await driver.getAriaDescribedBy();
      expect(value).toBe(ariaDescribedBy);
    });
  });

  describe('`onClickOutside` & `shouldCloseOnClickOutside` props', () => {
    it('should call onClickOutside when clicked outside', async () => {
      const onClickOutside = jest.fn();
      const { driver } = render(tooltip({ onClickOutside }));
      await driver.mouseEnter();
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

  describe('onClickOutside + disableClickOutsideWhenClosed', () => {
    it('should be triggered when outside of the Tooltip is called', async () => {
      const onClickOutside = jest.fn();

      const { driver } = render(
        tooltip({
          onClickOutside,
          disableClickOutsideWhenClosed: true,
          shown: true,
        }),
      );

      await eventually(async () => {
        await driver.tooltipExists();
      });

      await driver.clickOutside();

      expect(onClickOutside).toBeCalled();
    });

    it('should *not* be triggered when outside of the Tooltip is called and the Tooltip is *not* shown', async () => {
      const onClickOutside = jest.fn();

      const { driver } = render(
        tooltip({
          onClickOutside,
          disableClickOutsideWhenClosed: true,
          shown: false,
        }),
      );

      await driver.clickOutside();
      expect(onClickOutside).not.toBeCalled();
    });
  });
}
