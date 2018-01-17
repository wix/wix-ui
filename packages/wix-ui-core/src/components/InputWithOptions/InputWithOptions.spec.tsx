import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {inputWithOptionsDriverFactory} from './InputWithOptions.driver';
import {InputWithOptions} from './';
import {OptionFactory} from '../../baseComponents/DropdownOption';

describe.skip('InputWithOptions', () => {

  const createDriver = createDriverFactory(inputWithOptionsDriverFactory);
  const options =
    Array.from(Array(5))
      .map((x, index) =>
        index === 2 ? OptionFactory.createDivider() : OptionFactory.create(index, index === 3, true, `value${index}`));

  const createInputWithOptions = (props = {}) => (
    <InputWithOptions {...Object.assign({
      options: []
    }, props)}/>
  );

  it('should render default component', () => {
    const driver = createDriver(createInputWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });
});
