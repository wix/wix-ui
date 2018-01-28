import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {multiCheckboxDriverFactory} from './MultiCheckbox.driver';
import {MultiCheckbox} from './';
import {OptionFactory} from '../../baseComponents/DropdownOption';

describe('MultiCheckbox', () => {

  const createDriver = createDriverFactory(multiCheckboxDriverFactory);
  const options =
    Array.from(Array(5))
      .map((x, index) =>
        index === 2 ? OptionFactory.createDivider() : OptionFactory.create(index, index === 3, true, `value${index}`));

  const createMultiCheckbox = (props = {}) => (
    <MultiCheckbox {...Object.assign({
      options: []
    }, props)}/>
  );

  it('should render default component', () => {
    const driver = createDriver(createMultiCheckbox({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });
});
