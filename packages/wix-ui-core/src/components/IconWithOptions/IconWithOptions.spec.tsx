import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {iconWithOptionsDriverFactory} from './IconWithOptions.driver';
import IconWithOptions from './index';
import Divider from '../Divider';

describe('IconWithOptions', () => {

  const createDriver = createDriverFactory(iconWithOptionsDriverFactory);
  const options = [1, 2, 3, 4, 5].map(x => ({
    id: x,
    isSelectable: x !== 3,
    isDisabled: x === 4,
    render: () => x === 3 ? <Divider /> : <span>{`value${x}`}</span>
  }));

  const createIconWithOptions = (props = {}) => (
    <IconWithOptions {...Object.assign({
      options: [],
      iconUrl: ''
    }, props)}/>
  );

  it('should render default component', () => {
    const driver = createDriver(createIconWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });
});
