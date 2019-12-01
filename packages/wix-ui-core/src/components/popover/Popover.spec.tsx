import * as React from 'react';
import { queryHook } from 'wix-ui-test-utils/dom';
import { Popover, PopoverProps } from './';
import { createModifiers } from './modifiers';
import { popoverPrivateDriverFactory } from './Popover.private.driver';
import { testkit } from './Popover.uni.driver';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { Simulate } from 'react-dom/test-utils';
import * as eventually from 'wix-eventually';
import styles from './Popover.st.css';
import { AppendTo } from './Popover';

function delay(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, millis));
}

const popoverWithProps = (props: PopoverProps, content: string = 'Content') => (
  <Popover {...props}>
    <Popover.Element>
      <div>Element</div>
    </Popover.Element>
    <Popover.Content>
      <div>{content}</div>
    </Popover.Content>
  </Popover>
);

describe('Popover', () => {
  const container = new ReactDOMTestContainer().unmountAfterEachTest();

  describe('[sync]', () => {
    const createDriver = container.createLegacyRenderer(
      popoverPrivateDriverFactory,
    );

    runTests(createDriver, container);
  });

  describe('[async]', () => {
    const createDriver = container.createUniRendererAsync((base, body) => {
      const privateDriver = popoverPrivateDriverFactory({
        element: container.componentNode,
        eventTrigger: Simulate,
      });

      return {
        ...privateDriver,
        ...testkit(base, body),
      };
    });

    runTests(createDriver, container);
  });
});

function runTests(createDriver, container) {
  it('should render', async () => {
    const driver = await createDriver(
      popoverWithProps({
        placement: 'bottom',
        shown: false,
      }),
    );

    expect(await driver.exists()).toBe(true);
  });

  describe('Display', () => {
    it(`doesn't display popup when shown={false}`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: false,
        }),
      );

      expect(await driver.isTargetElementExists()).toBe(true);
      expect(await driver.isContentElementExists()).toBe(false);
    });

    it(`displays popup when shown={true}`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
        }),
      );

      expect(await driver.isContentElementExists()).toBe(true);
    });
  });

  describe('Events', () => {
    it(`calls mouseEnter and mouseLeave callbacks`, async () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();

      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: false,
          onMouseEnter,
          onMouseLeave,
        }),
      );

      await driver.mouseEnter();
      expect(onMouseEnter).toHaveBeenCalled();

      await driver.mouseLeave();
      expect(onMouseLeave).toBeCalled();
    });

    describe('onClick', () => {
      it('should execute onClick callback', async () => {
        const onClick = jest.fn();

        const driver = await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: false,
            onClick,
          }),
        );

        await driver.click();
        expect(onClick).toBeCalled();
      });
    });

    describe('onClickOutside', () => {
      it('should be triggered when outside of the popover is called', async () => {
        const onClickOutside = jest.fn();

        const driver = await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: false,
            onClickOutside,
          }),
        );

        await driver.clickOutside();
        expect(onClickOutside).toBeCalled();
      });
    });

    describe('onClickOutside + disableClickOutsideWhenClosed', () => {
      it('should be triggered when outside of the popover is called', async () => {
        const onClickOutside = jest.fn();

        const driver = await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: true,
            onClickOutside,
            disableClickOutsideWhenClosed: true,
          }),
        );

        await driver.clickOutside();
        expect(onClickOutside).toBeCalled();
      });

      it('should *not* be triggered when outside of the popover is called and the popover is *not* shown', async () => {
        const onClickOutside = jest.fn();

        const driver = await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: false,
            onClickOutside,
            disableClickOutsideWhenClosed: true,
          }),
        );

        await driver.clickOutside();
        expect(onClickOutside).not.toBeCalled();
      });

      const appendToValues: AppendTo[] = [
        'parent',
        'window',
        'viewport',
        'scrollParent',
      ];
      appendToValues.map(value => {
        it(`should not be triggered when content is clicked and appended to ${value}`, async () => {
          const onClickOutside = jest.fn();

          const driver = await createDriver(
            popoverWithProps({
              placement: 'bottom',
              shown: true,
              onClickOutside,
              appendTo: value,
            }),
          );

          await driver.clickOnContent();
          expect(onClickOutside).not.toBeCalled();
        });
      });
    });
  });

  describe('Position', () => {
    let updatePositionSpy;

    beforeEach(() => {
      updatePositionSpy = jest.spyOn(Popover.prototype, 'updatePosition');
    });

    afterEach(() => {
      updatePositionSpy.mockRestore();
    });

    it(`offsets the popup arrow by specified amount`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
          showArrow: true,
          moveArrowTo: 10,
        }),
      );

      expect((await driver.getArrowOffset()).left).toBe('10px');
    });

    it(`should update popper's position when props are chaning`, async () => {
      await createDriver(
        popoverWithProps(
          {
            placement: 'bottom',
            shown: true,
          },
          'Old Content!',
        ),
      );

      await createDriver(
        popoverWithProps(
          {
            placement: 'bottom',
            shown: true,
          },
          'New content!',
        ),
      );

      // Should have been called for each update
      expect(updatePositionSpy).toHaveBeenCalledTimes(2);
    });

    it(`should not directly update popper's position when the visibillity hasn't changed`, async () => {
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          showDelay: 10,
          shown: false,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          showDelay: 10,
          shown: true,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          showDelay: 10,
          shown: false,
        }),
      );

      expect(updatePositionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Animation and delay', () => {
    // Since Popover.Content can render outside the component's root, let's query
    // the entire document with the assumption that we don't render more than one
    // popover at a time.
    const queryPopoverContent = () =>
      queryHook<HTMLElement>(document, 'popover-content');

    it(`animates on close given a timeout`, async () => {
      await createDriver(
        popoverWithProps({ placement: 'bottom', shown: true, timeout: 10 }),
      );

      await createDriver(
        popoverWithProps({ placement: 'bottom', shown: false, timeout: 10 }),
      );

      expect(queryPopoverContent()).toBeTruthy();
      await eventually(
        () => {
          expect(queryPopoverContent()).toBeNull();
        },
        { interval: 1 },
      );
    });

    it(`doesn't animate on close when timeout={0}`, async () => {
      await createDriver(
        popoverWithProps({ placement: 'bottom', shown: true, timeout: 0 }),
      );

      await createDriver(
        popoverWithProps({ placement: 'bottom', shown: false, timeout: 0 }),
      );

      expect(queryPopoverContent()).toBeNull();
    });

    it(`doesn't animate on close when timeout is an object with 0 values`, async () => {
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
          timeout: { enter: 0, exit: 0 },
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: false,
          timeout: { enter: 0, exit: 0 },
        }),
      );

      expect(queryPopoverContent()).toBeNull();
    });

    it(`should close after hideDelay`, async () => {
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          shown: true,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          shown: false,
        }),
      );

      expect(queryPopoverContent()).toBeTruthy();
      await eventually(
        () => {
          expect(queryPopoverContent()).toBeNull();
        },
        { interval: 10 },
      );
    });

    it(`should open after showDelay`, async () => {
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          showDelay: 10,
          shown: false,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          showDelay: 10,
          shown: true,
        }),
      );

      expect(queryPopoverContent()).toBeNull();
      await eventually(
        () => {
          expect(queryPopoverContent()).toBeTruthy();
        },
        { interval: 10 },
      );
    });

    it(`should reset timeout when state has changed`, async () => {
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          showDelay: 10,
          shown: false,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          showDelay: 10,
          shown: true,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          showDelay: 10,
          shown: false,
        }),
      );

      expect(queryPopoverContent()).toBeNull();
      await delay(15);
      expect(queryPopoverContent()).toBeNull();
    });

    it(`should not update delay until the popover visibillity has fully changed`, async () => {
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          shown: true,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 10,
          shown: false,
        }),
      );

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 1000,
          shown: false,
        }),
      );

      expect(queryPopoverContent()).toBeTruthy();

      // Making sure the popover is closed after the first `hideDelay` (10ms), and not the second
      // one (1000ms)
      await delay(10);
      expect(queryPopoverContent()).toBeNull();
    });

    it(`should show the popover immediately on first render if needed`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          showDelay: 10,
          shown: true,
        }),
      );

      expect(await driver.isContentElementExists()).toBe(true);
    });

    it(`should show the popover immediately when delays are 0`, async () => {
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 0,
          showDelay: 0,
          shown: false,
        }),
      );

      expect(queryPopoverContent()).toBeNull();

      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 0,
          showDelay: 0,
          shown: true,
        }),
      );

      expect(queryPopoverContent()).toBeTruthy();

      // Close again the popover
      await createDriver(
        popoverWithProps({
          placement: 'bottom',
          hideDelay: 0,
          showDelay: 0,
          shown: false,
        }),
      );

      expect(queryPopoverContent()).toBeNull();
    });
  });

  describe('Portal and containment', () => {
    const portalContainer = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`renders the popup directly into the popover root by default`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
        }),
      );

      expect((await driver.getContentElement()).parentElement).toBe(
        container.componentNode,
      );
    });

    it(`renders the popup into a portal when given appendTo prop`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
          appendTo: portalContainer.node,
        }),
      );

      expect((await driver.getContentElement()).parentElement).toBe(
        await driver.getPortalElement(),
      );
      expect((await driver.getPortalElement()).parentElement).toBe(
        portalContainer.node,
      );
      expect((await driver.getPortalElement()).classList).toContain(
        styles.root,
      );
    });

    it(`renders an empty portal when closed`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: false,
          appendTo: portalContainer.node,
        }),
      );

      expect(await driver.getContentElement()).toBeNull();
      expect((await driver.getPortalElement()).parentElement).toBe(
        portalContainer.node,
      );
      expect((await driver.getPortalElement()).classList).not.toContain(
        styles.root,
      );
    });

    it(`removes the portal on unmount`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
          appendTo: portalContainer.node,
        }),
      );

      expect(await driver.getPortalElement()).toBeTruthy();
      container.unmount();
      expect(await driver.getPortalElement()).toBeNull();
    });

    it(`adds the portal to the body when appendTo="window"`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
          appendTo: 'window',
        }),
      );

      expect((await driver.getPortalElement()).parentElement).toBe(
        document.body,
      );
    });

    it(`adds the portal to the closest scrollable element when appendTo="scrollParent"`, async () => {
      const driver = await createDriver(
        <div style={{ overflow: 'scroll' }}>
          <div style={{ overflow: 'visible' }}>
            {popoverWithProps({
              placement: 'bottom',
              appendTo: 'scrollParent',
              shown: true,
            })}
          </div>
        </div>,
      );

      expect((await driver.getPortalElement()).parentElement).toBe(
        container.node.firstChild,
      );
    });

    it(`adds the portal next to the popover's element when appendTo="parent"`, async () => {
      const driver = await createDriver(
        popoverWithProps({
          placement: 'bottom',
          shown: true,
          appendTo: 'parent',
        }),
      );

      expect(await driver.getContentElement().parentElement).toBe(
        await driver.getTargetElement().parentElement,
      );
    });

    describe('portal styles', () => {
      const queryPopoverPortal = () =>
        queryHook<HTMLElement>(document, 'popover-portal');

      it(`should update the portal's styles when updated`, async () => {
        // First render without passing the `className` prop, the <Popover/>
        // portal should only have the root class applied.
        await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: true,
            appendTo: portalContainer.node,
          }),
        );

        // Second render with a `className` prop. Stylable `style()` function
        // should apply it.
        await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: true,
            appendTo: portalContainer.node,
            className: 'some-class',
          }),
        );

        expect(queryPopoverPortal().classList).toContain('some-class');
      });

      it(`should not remove styles until unmounted with hideDelay`, async () => {
        await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: true,
            hideDelay: 10,
            appendTo: portalContainer.node,
          }),
        );

        await createDriver(
          popoverWithProps({
            placement: 'bottom',
            shown: false,
            hideDelay: 10,
            appendTo: portalContainer.node,
          }),
        );

        expect(queryPopoverPortal()).toBeTruthy();
        expect(queryPopoverPortal().classList).toContain(styles.root);

        await delay(10);
        expect(queryPopoverPortal().classList).not.toContain(styles.root);
      });
    });
  });

  describe('React <16 compatibility', () => {
    it('should wrap children in a <div/> if provided as strings to support React 15', async () => {
      const driver = await createDriver(
        <Popover shown placement="bottom">
          <Popover.Element>Element</Popover.Element>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );

      expect((await driver.getTargetElement()).childNodes[0].nodeName).toEqual(
        'DIV',
      );

      expect((await driver.getContentElement()).childNodes[0].nodeName).toEqual(
        'DIV',
      );
    });
  });

  describe('createModifiers', () => {
    const defaultProps = {
      width: undefined,
      moveBy: undefined,
      minWidth: undefined,
      dynamicWidth: undefined,
      appendTo: undefined,
      shouldAnimate: false,
      flip: true,
      fixed: false,
      placement: 'bottom',
      isTestEnv: false,
    };

    it('should match default modifiers', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
      });

      expect(modifiers).toEqual({
        offset: {
          offset: '0px, 0px',
        },
        computeStyle: {
          gpuAcceleration: true,
        },
        flip: {
          enabled: true,
        },
        preventOverflow: {
          enabled: true,
        },
        hide: {
          enabled: true,
        },
      });
    });

    it('should calculate the offset properly using moveBy for the top placement', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        moveBy: { x: 5, y: 10 },
        placement: 'top',
      });

      expect(modifiers.offset.offset).toEqual('5px, 10px');
    });

    it('should calculate the offset properly using moveBy for the right placement', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        moveBy: { x: 5, y: 10 },
        placement: 'right',
      });

      expect(modifiers.offset.offset).toEqual('10px, 5px');
    });

    it('should disable gpuAcceleration when animation is enabled', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        shouldAnimate: true,
      });

      expect(modifiers.computeStyle.gpuAcceleration).toEqual(false);
    });

    it('should disable the flip modifier if moveBy was provided', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        moveBy: { x: 5, y: 10 },
        flip: undefined,
      });

      expect(modifiers.flip.enabled).toEqual(false);
    });

    it('should enabled the flip modifier is set explicitly regardless of moveBy', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        moveBy: { x: 5, y: 10 },
        flip: true,
      });

      expect(modifiers.flip.enabled).toEqual(true);
    });

    it('should disable the flip modifier when set explicitly', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        flip: false,
      });

      expect(modifiers.flip.enabled).toEqual(false);
    });

    it('should disable `preventOverflow` and `hide` when fixed set to `true`', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        fixed: true,
      });

      expect(modifiers.preventOverflow.enabled).toEqual(false);
      expect(modifiers.hide.enabled).toEqual(false);
    });

    it('should disable computeStyle when isTestEnv is set to `true`', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        isTestEnv: true,
      });

      expect(modifiers.computeStyle.enabled).toEqual(false);
    });

    it('should set boundariesElement when appendTo is provided', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        appendTo: 'viewport',
      });

      expect(modifiers.preventOverflow.boundariesElement).toEqual('viewport');
    });

    it('should enable setPopperWidth [when] given minWidth ', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        minWidth: '500px',
      });

      expect(modifiers.setPopperWidth.enabled).toEqual(true);
    });

    it('should enable setPopperWidth [when] given dynamicWidth ', async () => {
      const modifiers = createModifiers({
        ...defaultProps,
        dynamicWidth: true,
      });

      expect(modifiers.setPopperWidth.enabled).toEqual(true);
    });
  });

  describe('data-hook', () => {
    it('should be found on target element container', async () => {
      const driver = await createDriver(
        <Popover data-hook="random" appendTo="window" shown placement="bottom">
          <Popover.Element>Element</Popover.Element>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      const target = await driver.getTargetElement();
      expect(target.parentNode.getAttribute('data-hook')).toBe('random');
    });

    it('should construct data-content-hook', async () => {
      const driver = await createDriver(
        <Popover data-hook="random" appendTo="window" shown placement="bottom">
          <Popover.Element>Element</Popover.Element>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      const target = await driver.getTargetElement();
      expect(target.parentNode.getAttribute('data-content-hook')).toMatch(
        /popover-content-random-/,
      );
    });

    it('should apply data-content-element on content element', async () => {
      const driver = await createDriver(
        <Popover data-hook="random" appendTo="window" shown placement="bottom">
          <Popover.Element>Element</Popover.Element>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      const content = await driver.getContentElement();
      expect(content.getAttribute('data-content-element')).toMatch(
        /popover-content-random-/,
      );
    });
    it('should not override portal component data-hook', async () => {
      const driver = await createDriver(
        <Popover data-hook="random" appendTo="window" shown placement="bottom">
          <Popover.Element>Element</Popover.Element>
          <Popover.Content>Content</Popover.Content>
        </Popover>,
      );
      const content = await driver.getContentElement();
      expect(content.parentNode.getAttribute('data-hook')).toBe(
        'popover-portal',
      );
    });
  });

  describe('Arrow', () => {
    function customArrow(placement, arrowProps) {
      return <p data-test={`custom-arrow-${placement}`} {...arrowProps} />;
    }

    it('should display a custom arrow element', async () => {
      const driver = await createDriver(
        popoverWithProps({
          shown: true,
          showArrow: true,
          placement: 'top',
          customArrow,
        }),
      );

      const arrowElement = await driver.getArrowElement();
      expect(arrowElement.getAttribute('data-test')).toBe('custom-arrow-top');
    });
  });
}
