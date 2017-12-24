import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
import Popover from './index';

const Target = <div>Element</div>;
const Content = <div>Content</div>;

describe ('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);
  const createPopover = (props = {}) =>
    <Popover placement="top" Element={Target} Content={Content} {...props}/>;

  it('should not display content by default', () => {
    const driver = createDriver(createPopover());
    expect(driver.isContentExists()).toBeFalsy();
    expect(driver.isElementExists()).toBeTruthy();
  });

  it('should display content when popoverShown is true', () => {
    const driver = createDriver(createPopover({popoverShown: true}));
    expect(driver.isContentExists()).toBeTruthy();
    expect(driver.isElementExists()).toBeTruthy();
  });
});
