import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Popover, PopoverProps} from './';
import {mount} from 'enzyme';
import * as eventually from 'wix-eventually';

describe('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);
  const createPopover = (props: Partial<PopoverProps> = {}) =>
    <Popover placement="top" showArrow={true} shown={false} {...props}>
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
    </Popover>;

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

  it('should append popover to body when appendTo is window', () => {
    const wrapper = mount(createPopover({shown: true, appendTo: 'window'}));
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
    const contentElement = driver.getContentElement();
    const bodyElement = document.body;

    expect(contentElement.parentElement).toBe(bodyElement);
    wrapper.unmount();
  });

  it('should append popover to body when appendTo is viewport', () => {
    const wrapper = mount(createPopover({shown: true, appendTo: 'viewport'}));
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
    const contentElement = driver.getContentElement();
    const bodyElement = document.body;

    expect(contentElement.parentElement).toBe(bodyElement);
    wrapper.unmount();
  });

  it('should append popover to given element when appendTo is an element', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const wrapper = mount(createPopover({shown: true, appendTo: element}));
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
    const contentElement = driver.getContentElement();

    expect(contentElement.parentElement).toBe(element);
    wrapper.unmount();
  });

  it('should append popover to first scrollable parent when appendTo is scrollParent', () => {
    const scrollableParent = document.createElement('div');
    scrollableParent.style.overflow = 'auto';
    const childElement = document.createElement('div');
    scrollableParent.appendChild(childElement);
    document.body.appendChild(scrollableParent);

    const wrapper = mount(
      createPopover({shown: true, appendTo: 'scrollParent'}),
      {attachTo: scrollableParent}
    );
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});

    const contentElement = driver.getContentElement();
    expect(contentElement.parentElement).toBe(scrollableParent);
    wrapper.detach();
  });
});
