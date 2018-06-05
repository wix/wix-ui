import * as React from 'react';
import {Simulate} from 'react-dom/test-utils';
import {queryHook} from 'wix-ui-test-utils/dom';
import {Popover, PopoverProps} from './';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import * as eventually from 'wix-eventually';
import styles from './Popover.st.css';

const popoverWithProps = (props: PopoverProps) => (
  <Popover {...props}>
    <Popover.Element>
      <div>Element</div>
    </Popover.Element>
    <Popover.Content>
      <div>Content</div>
    </Popover.Content>
  </Popover>
);

// Since Popover.Content can render outside the component's root, let's query
// the entire document with the assumption that we don't render more than one
// popover at a time.
const queryPopoverElement = () => queryHook<HTMLElement>(document, 'popover-element');
const queryPopoverContent = () => queryHook<HTMLElement>(document, 'popover-content');
const queryPopoverArrow   = () => queryHook<HTMLElement>(document, 'popover-arrow');
const queryPopoverPortal  = () => queryHook<HTMLElement>(document, 'popover-portal');

describe('Popover', () => {
  describe('Display', () => {
    const container = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`doesn't display popup by default`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: false
      }));
  
      expect(queryPopoverElement()).toBeTruthy();
      expect(queryPopoverContent()).toBeNull();
    });

    it(`displays popup when shown={true}`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true
      }));
      
      expect(queryPopoverContent()).toBeTruthy();
    });
  });

  describe('Events', () => {
    const container = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`calls mouseEnter and mouseLeave callbacks`, async () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: false,
        onMouseEnter,
        onMouseLeave,
      }));

      Simulate.mouseEnter(container.componentNode);
      Simulate.mouseLeave(container.componentNode);
      expect(onMouseEnter).toBeCalled();
      expect(onMouseLeave).toBeCalled();
    });
  });

  describe('Position', () => {
    const container = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`offsets the arrow by specified amount`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true,
        showArrow: true,
        moveArrowTo: 10
      }));

      expect(queryPopoverArrow().style.left).toBe('10px');
    });
  });

  describe('Animation', () => {
    const container = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`animates on close given a timeout`, async () => {
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: true, timeout: 10}
      ));
  
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: false, timeout: 10}
      ));
  
      expect(queryPopoverContent()).toBeTruthy();
      await eventually(() => {
        expect(queryPopoverContent()).toBeNull();
      }, {interval: 1});
    });
  
    it(`doesn't animate on close when timeout={0}`, async () => {
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: true, timeout: 0}
      ));
  
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: false, timeout: 0}
      ));
  
      expect(queryPopoverContent()).toBeNull();
    });
  });

  describe('Portal', () => {
    const popoverContainer = new ReactDOMTestContainer().destroyAfterEachTest();
    const portalContainer = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`by default renders the popup directly into the Popover root`, async() => {
      await popoverContainer.render(popoverWithProps({
        placement: 'bottom',
        shown: true
      }));
  
      expect(queryPopoverContent().parentElement).toBe(popoverContainer.componentNode);
    });

    it(`if a container is provided, renders the popup into a portal inside of that container`, async() => {
      await popoverContainer.render(popoverWithProps({
        placement: 'bottom',
        shown: true,
        appendTo: portalContainer.node
      }));

      expect(queryPopoverContent().parentElement).toBe(queryPopoverPortal());
      expect(queryPopoverPortal().parentElement).toBe(portalContainer.node);
      expect(queryPopoverPortal().classList).toContain(styles.root);
    });

    it(`if the popup is hidden, renders the portal without a popup`, async() => {
      await popoverContainer.render(popoverWithProps({
        placement: 'bottom',
        shown: false,
        appendTo: portalContainer.node
      }));

      expect(queryPopoverContent()).toBeNull();
      expect(queryPopoverPortal().parentElement).toBe(portalContainer.node);
      expect(queryPopoverPortal().classList).not.toContain(styles.root);
    });

    it(`removes the portal on unmount`, async() => {
      await popoverContainer.render(popoverWithProps({
        placement: 'bottom',
        shown: true,
        appendTo: portalContainer.node
      }));

      expect(queryPopoverPortal()).toBeTruthy();
      expect(portalContainer.node.firstChild).toBe(queryPopoverPortal());
      popoverContainer.unmount();
      expect(portalContainer.node.firstChild).toBeNull();
    });
  });

  describe('Containment Boundaries', () => {
    const container = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`appendTo="window" adds the portal to the body`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        appendTo: 'window',
        shown: true
      }));

      expect(queryPopoverPortal().parentElement).toBe(document.body);
    });

    it(`appendTo="scrollParent" adds the portal to the closest scrollable element`, async () => {
      await container.render(
        <div style={{overflow: 'scroll'}}>
          <div style={{overflow: 'visible'}}>
            {popoverWithProps({
              placement: 'bottom',
              appendTo: 'scrollParent',
              shown: true
            })}
          </div>
        </div>
      );

      expect(queryPopoverPortal().parentElement).toBe(container.componentNode);
    });

    it(`appendTo={element} adds the portal to the specified element`, async () => {
      const portalContainer = new ReactDOMTestContainer().create();

      await container.render(popoverWithProps({
        placement: 'bottom',
        appendTo: portalContainer.node,
        shown: true
      }));

      expect(queryPopoverPortal().parentElement).toBe(portalContainer.node);
      portalContainer.destroy();
    });
  });
});
