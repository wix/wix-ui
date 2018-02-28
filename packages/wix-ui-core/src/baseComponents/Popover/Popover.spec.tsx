import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Popover} from './';
import {mount} from 'enzyme';
import * as eventually from 'wix-eventually';

describe('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);
  const createPopover = (props = {}) =>
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
    expect(driver.isContentExists()).toBeFalsy();
    expect(driver.isElementExists()).toBeTruthy();
  });

  it('should display content when shown is true', () => {
    const driver = createDriver(createPopover({shown: true}));
    expect(driver.isContentExists()).toBeTruthy();
    expect(driver.isElementExists()).toBeTruthy();
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
    expect(driver.isElementExists()).toBeTruthy();
    const arrowLeft = driver.getArrowOffset().left;
    expect(arrowLeft).toEqual('10px');
  });

  it('should animate by default', () => {
    const wrapper = mount(createPopover({shown: true}));
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
    wrapper.setProps({shown: false});
    expect(driver.isContentExists()).toBeTruthy();
    return eventually(() => expect(driver.isContentExists()).toBeFalsy());
  });

  it('should not animate in case timeout is set to 0', async () => {
    const wrapper = mount(createPopover({shown: true, timeout: 0}));
    const driver = popoverDriverFactory({element: wrapper.children().at(0).getDOMNode(), eventTrigger: null});
    wrapper.setProps({shown: false});
    expect(driver.isContentExists()).toBeFalsy();
  });
});
