import * as React from 'react';
import {Simulate} from 'react-dom/test-utils';
import {queryHook} from 'wix-ui-test-utils/dom';
import * as eventually from 'wix-eventually';
import {runBaseDriverTests} from '../../common/BaseDriver.tests';
import {Popover, PopoverProps} from './';
import {popoverDriverFactory, PopoverDriver} from './Popover.driver';
import {PopoverDriverPrivate} from './Popover.driver.private';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
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

describe('Popover', () => {
  const container = new ReactDOMTestContainer().destroyAfterEachTest();

  const createDriver = ()=> new PopoverDriverPrivate(
    {
      element: container.componentNode
    }
  );

  describe('Display', () => {
    it(`doesn't display popup when shown={false}`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: false
      }));
      const driver = createDriver();
      expect(driver.isTargetElementExists()).toBeTruthy();
      expect(driver.isContentElementExists()).toBeFalsy();
    });

    it(`displays popup when shown={true}`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true
      }));
      const driver = createDriver();
      expect(driver.isContentElementExists()).toBeTruthy();
    });
  });

  describe('Events', () => {
    it(`calls mouseEnter and mouseLeave callbacks`, async () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: false,
        onMouseEnter,
        onMouseLeave,
      }));
      const driver = createDriver();
      driver.mouseEnter();
      driver.mouseLeave();
      expect(onMouseEnter).toBeCalled();
      expect(onMouseLeave).toBeCalled();
    });
  });

  describe('Position', () => {
    it(`offsets the popup arrow by specified amount`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true,
        showArrow: true,
        moveArrowTo: 10
      }));
      const driver = createDriver();
      expect(driver.getArrowOffset().left).toBe('10px');
    });
  });

  describe('Animation', () => {
    it(`animates on close given a timeout`, async () => {
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: true, timeout: 10}
      ));
  
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: false, timeout: 10}
      ));
      const driver = createDriver();
      expect(driver.isContentElementExists()).toBeTruthy();
      await eventually(() => {
        expect(driver.isContentElementExists()).toBeFalsy();
      }, {interval: 1});
    });
  
    it(`doesn't animate on close when timeout={0}`, async () => {
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: true, timeout: 0}
      ));
  
      await container.render(popoverWithProps(
        {placement: 'bottom', shown: false, timeout: 0}
      ));
  
      const driver = createDriver();
      expect(driver.isContentElementExists()).toBeFalsy();
    });
  });

  describe('Portal and containment', () => {
    const portalContainer = new ReactDOMTestContainer().destroyAfterEachTest();

    it(`renders the popup directly into the popover root by default`, async() => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true
      }));
      const driver = createDriver();
      expect(driver.getContentElement().parentElement).toBe(container.componentNode);
    });

    it(`renders the popup into a portal when given appendTo prop`, async() => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true,
        appendTo: portalContainer.node
      }));

      const driver = createDriver();
      const privateDriver = createDriver();
      expect(driver.getContentElement().parentElement).toBe(privateDriver.getPortalElement());
      expect(privateDriver.getPortalElement().parentElement).toBe(portalContainer.node);
      expect(privateDriver.getPortalElement().classList).toContain(styles.root);
    });

    it(`renders an empty portal when closed`, async() => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: false,
        appendTo: portalContainer.node
      }));

      const driver = createDriver();
      const privateDriver = createDriver();
      expect(driver.isContentElementExists()).toBeFalsy();
      expect(privateDriver.getPortalElement().parentElement).toBe(portalContainer.node);
      expect(privateDriver.getPortalElement().classList).not.toContain(styles.root);
    });

    it(`removes the portal on unmount`, async() => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true,
        appendTo: portalContainer.node
      }));

      const privateDriver = createDriver();
      expect(privateDriver.getPortalElement()).toBeTruthy();
      container.unmount();
      expect(privateDriver.getPortalElement()).toBeNull();
    });

    it(`adds the portal to the body when appendTo="window"`, async () => {
      await container.render(popoverWithProps({
        placement: 'bottom',
        shown: true,
        appendTo: 'window'
      }));

      const privateDriver = createDriver();
      expect(privateDriver.getPortalElement().parentElement).toBe(document.body);
    });

    it(`adds the portal to the closest scrollable element when appendTo="scrollParent"`, async () => {
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
      
      const privateDriver = createDriver();
      expect(privateDriver.getPortalElement().parentElement).toBe(container.node.firstChild);
    });
  });

  describe('public driver', () => {
    const createElement = () => {
        container.render(popoverWithProps({
          placement: 'bottom',
          shown: false
        }));
        return container.componentNode;
    }

    runBaseDriverTests(createElement);

    const createPublicDriver = ()=> popoverDriverFactory(
      {
        element: container.componentNode
      }
    );

    const render = (props?:Partial<PopoverProps>) => container.render(popoverWithProps({
      placement: 'bottom',
      shown: false,
      ...props
    }));

    it('PopoverDriver class sanity', async () => {
      render();  
      const driver = new PopoverDriver({
        element: container.componentNode
      });
      expect(driver.getTargetElement()).toBeDefined();
    });

    it('getTargetElement', async () => {
      render();  
      const driver = createPublicDriver();
      expect(driver.getTargetElement()).toBeDefined();
    });

    it('getContentElement', async () => {
      render();  
      const driver = createPublicDriver();
      expect(driver.getContentElement()).toBeDefined();
    });

    it('isTargetElementExists', async () => {
      render();  
      const driver = createPublicDriver();
      expect(driver.isTargetElementExists()).toBeTruthy();
    });

    it('isContentElementExists', async () => {
      render({shown:true});  
      const driver = createPublicDriver();
      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('isTargetElementExists', async () => {
      render();  
      const driver = createPublicDriver();
      expect(driver.inlineStyles()).toBeTruthy();
    });

    it('inlineStyles', async () => {
      const style = {backgroundColor: 'green'};
      render({style});  
      const driver = createPublicDriver();
      expect(driver.inlineStyles()['background-color']).toBe('green')
    });

    it('mouseEnter', () => {
      const driver = createPublicDriver();
      expect(driver.mouseEnter).toBeDefined();
    });

    it('mouseLeave', () => {
      const driver = createPublicDriver();
      expect(driver.mouseLeave).toBeDefined();
    });

    it('click', () => {
      const driver = createPublicDriver();
      expect(driver.click).toBeDefined();
    });
  });
});
