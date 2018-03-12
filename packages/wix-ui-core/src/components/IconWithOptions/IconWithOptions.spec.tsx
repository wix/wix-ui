import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {iconWithOptionsDriverFactory} from './IconWithOptions.driver';
import {IconWithOptions} from './';
import {OptionFactory} from '../../baseComponents/DropdownOption';
import {generateOptions} from '../../baseComponents/DropdownOption/OptionsExample';

describe('IconWithOptions', () => {
  const createDriver = createDriverFactory(iconWithOptionsDriverFactory);
  const options = generateOptions();
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
