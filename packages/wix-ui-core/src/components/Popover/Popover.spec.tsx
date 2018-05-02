import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Popover, PopoverProps} from './';
import {mount} from 'enzyme';
import * as eventually from 'wix-eventually';
import {popoverTestkitFactory as enzymePopoverTestkitFactory} from '../../testkit/enzyme';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {popoverTestkitFactory} from '../../testkit';
import styles from './Popover.st.css';

describe('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);
  const createPopover = (props: Partial<PopoverProps> = {}) => (
    <Popover placement="top" showArrow shown={false} {...props}>
      <Popover.Element>
        <div>
          Element
        </div>
      </Popover.Element>
      <Popover.Content>
        <div>
          Content
        </div>
      </Popover.Content>
    </Popover>
  );

  it('should not display content by default', () => {
    const driver = createDriver(createPopover());
    expect(driver.isContentElementExists()).toBeFalsy();
    expect(driver.isTargetElementExists()).toBeTruthy();
  });

  it('should display content when shown is true', () => {
    const driver = createDriver(createPopover({shown: true}));
    expect(driver.isContentElementExists()).toBeTruthy();
    expect(driver.isTargetElementExists()).toBeTruthy();
  });

  it('should call mouse enter callback', () => {
    const onMouseEnter = jest.fn();
    const driver = createDriver(createPopover({onMouseEnter}));
    driver.mouseEnter();
    expect(onMouseEnter).toBeCalled();
  });

  it('should call mouse leave callback', () => {
    const onMouseLeave = jest.fn();
    const driver = createDriver(createPopover({onMouseLeave}));
    driver.mouseLeave();
    expect(onMouseLeave).toBeCalled();
  });

  it('moves arrow according to provided offset', () => {
    const driver = createDriver(createPopover({shown: true, moveArrowTo: 10}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    const arrowLeft = driver.getArrowOffset().left;
    expect(arrowLeft).toEqual('10px');
  });

  it('should animate given timeout', async () => {
    const wrapper = mount(createPopover({shown: true, timeout: 100}));
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
    wrapper.setProps({shown: false});
    expect(driver.isContentElementExists()).toBeTruthy();
    await eventually(() => expect(driver.isContentElementExists()).toBeFalsy());
    wrapper.unmount();
  });

  it('should not animate in case timeout is set to 0', async () => {
    const wrapper = mount(createPopover({shown: true, timeout: 0}));
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
    wrapper.setProps({shown: false});
    expect(driver.isContentElementExists()).toBeFalsy();
    expect(wrapper.text()).toBe('Element');
    wrapper.unmount();
  });

  describe('appendTo', () => {
    let wrapper, driver;

    afterEach(() => {
      driver = null;
      wrapper.unmount();
    });

    describe('window', () => {
      beforeEach(() => {
        wrapper = mount(createPopover({shown: true, appendTo: 'window'}));
        driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
      });

      it('should append popover to body when appendTo is window', () => {
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(document.body);
      });

      it('should attach and detach styles to body when appended to window', () => {
        expect(document.body.className).toBe(styles.root);
        wrapper.setProps({shown: false});
        expect(document.body.className).not.toBe(styles.root);
      });
    });

    describe('viewport', () => {
      beforeEach(() => {
        wrapper = mount(createPopover({shown: true, appendTo: 'viewport'}));
        driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
      });

      it('should append popover to body when appendTo is viewport', () => {
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(document.body);
      });

      it('should attach and detach styles to body when appended to viewport', () => {
        expect(document.body.className).toBe(styles.root);
        wrapper.setProps({shown: false});
        expect(document.body.className).not.toBe(styles.root);
        wrapper.unmount();
      });
    });

    describe('node', () => {
      let appendToNode;
      beforeEach(() => {
        appendToNode = document.createElement('div');
        document.body.appendChild(appendToNode);
        wrapper = mount(createPopover({shown: true, appendTo: appendToNode}));
        driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
      });

      it('should append popover to given element when appendTo is an element', () => {
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(appendToNode);
      });

      it('should attach and detach styles to the element appended to', () => {
        expect(appendToNode.className).toBe(styles.root);
        wrapper.setProps({shown: false});
        expect(appendToNode.className).not.toBe(styles.root);
      });
    });

    describe('scrollParent', () => {
      let scrollableParent;
      beforeEach(() => {
        scrollableParent = document.createElement('div');
        scrollableParent.style.overflow = 'auto';
        const childElement = document.createElement('div');
        scrollableParent.appendChild(childElement);
        document.body.appendChild(scrollableParent);
        wrapper = mount(createPopover({shown: true, appendTo: 'scrollParent'}), {attachTo: scrollableParent});
        driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
      });

      it('should append popover to first scrollable parent when appendTo is scrollParent', () => {
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(scrollableParent);
      });

      it('should attach and detach styles to the scrollable parent container', () => {
        expect(scrollableParent.className).toBe(styles.root);
        wrapper.setProps({shown: false});
        expect(scrollableParent.className).not.toBe(styles.root);
        wrapper.unmount();
      });
    });

  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(createPopover(), popoverTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(createPopover(), enzymePopoverTestkitFactory, mount)).toBe(true);
    });
  });
});
