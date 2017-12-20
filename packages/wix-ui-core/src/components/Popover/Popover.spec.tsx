import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
import Popover from './index';

describe ('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);
  const createPopover = (props = {}) =>
  <Popover placement="top" {...props}>
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

  it.skip('should not display content by default', () => {
    const driver = createDriver(createPopover());
    expect(driver.isContentExists()).toBeFalsy();
  });
});
