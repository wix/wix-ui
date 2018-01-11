import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {iconWithOptionsDriverFactory} from './IconWithOptions.driver';
import IconWithOptions from './';
import {OptionFactory} from '../../baseComponents/DropdownOption';

describe('IconWithOptions', () => {

  const createDriver = createDriverFactory(iconWithOptionsDriverFactory);
  const options =
    Array.from(Array(5))
      .map((x, index) =>
        index === 2 ? OptionFactory.createDivider() : OptionFactory.create(index, index === 3, true, `value${x}`));

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
