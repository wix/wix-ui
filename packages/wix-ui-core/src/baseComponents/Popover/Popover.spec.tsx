import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Popover} from './';

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
});
